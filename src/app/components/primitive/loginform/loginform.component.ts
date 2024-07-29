import { Component } from '@angular/core';
import { GoogleAiService } from '../../../google-ai.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.scss'
})
export class LoginformComponent {
  jsonInput: string = '';
  htmlCode: string = '';
  cssCode: string = '';
  tsCode: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  activeTab: string = 'html';
  copyMessage: string | null = null;

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

    this.googleAiService.generateLoginCode(this.jsonInput).subscribe(
      response => {
        this.isLoading = false;
        if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts[0]) {
          const fullCode = response.candidates[0].content.parts[0].text;
          console.log(fullCode);
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

  // copyToClipboard(content: string) {
  //   if (navigator.clipboard) {
  //     navigator.clipboard.writeText(content).then(() => {
  //       alert('Content copied to clipboard!');
  //     }).catch(err => {
  //       alert('Failed to copy content: ' + err);
  //     });
  //   } else {
  //     alert('Clipboard API is not supported on your browser.');
  //   }
  // }
  copyToClipboard(content: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        this.showCopyMessage('Content copied to clipboard!');
      }).catch(err => {
        this.showCopyMessage('Failed to copy content.');
      });
    } else {
      this.showCopyMessage('Clipboard API is not supported on your browser.');
    }
  }

  showCopyMessage(message: string) {
    this.copyMessage = message;
    setTimeout(() => {
      this.copyMessage = null;
    }, 3000); // Hide the message after 3 seconds
  }

  copyActiveTabContent() {
    let content = '';
    if (this.activeTab === 'html') {
      content = this.htmlCode;
    } else if (this.activeTab === 'css') {
      content = this.cssCode;
    } else if (this.activeTab === 'ts') {
      content = this.tsCode;
    }
    this.copyToClipboard(content);
  }
}
