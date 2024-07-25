import { Component } from '@angular/core';
import { GoogleAiService } from './google-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  jsonInput: string = '';
  htmlCode: string = '';
  cssCode: string = '';
  tsCode: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  activeTab: string = 'html';

  constructor(private googleAiService: GoogleAiService) {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  generateLayout() {
    this.isLoading = true;
    this.error = null;
    this.htmlCode = '';
    this.cssCode = '';
    this.tsCode = '';

    this.googleAiService.generateLayoutCode(this.jsonInput).subscribe(
      response => {
        this.isLoading = false;
        if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts[0]) {
          const fullCode = response.candidates[0].content.parts[0].text;
          const htmlMatch = fullCode.match(/---HTML---([\s\S]*?)---CSS---/);
          const cssMatch = fullCode.match(/---CSS---([\s\S]*?)---TS---/);
          const tsMatch = fullCode.match(/---TS---([\s\S]*)/);
          
          this.htmlCode = htmlMatch ? htmlMatch[1].trim() : 'No HTML code generated';
          this.cssCode = cssMatch ? cssMatch[1].trim() : 'No CSS code generated';
          this.tsCode = tsMatch ? tsMatch[1].trim() : 'No TypeScript code generated';
        } else {
          this.error = 'Unexpected response structure';
        }
      },
      error => {
        this.isLoading = false;
        this.error = 'An error occurred while generating the layout code.';
      }
    );
  }
}
