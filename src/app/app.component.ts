import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'editor';

  public textToAdd: string = '';

  async ngOnInit(): Promise<void> {
    await Promise.all([
      new Promise<void>((resolve) => {
        const loaderScript: HTMLScriptElement = document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = '/assets/monaco-editor/vs/loader.js';
        document.body.appendChild(loaderScript);
        loaderScript.addEventListener('load', () => resolve());
      }),
      new Promise<void>((resolve) => {
        const editorNlsScript: HTMLScriptElement = document.createElement('script');
        editorNlsScript.type = 'text/javascript';
        editorNlsScript.src = '/assets/monaco-editor/vs/editor/editor.main.nls.js'
        document.body.appendChild(editorNlsScript);
        editorNlsScript.addEventListener('load', () => resolve());
      }),
      new Promise<void>((resolve) => {
        const editorScript: HTMLScriptElement = document.createElement('script');
        editorScript.type = 'text/javascript';
        editorScript.src = '/assets/monaco-editor/vs/editor/editor.main.js'
        document.body.appendChild(editorScript);
        editorScript.addEventListener('load', () => resolve());
      }),
    ]);
  }

  onBtnClick(txt: string) {
    this.textToAdd = txt;
  }
}
