import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";

@Component({
  selector: 'editor-comp',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class NEditorComponent implements OnChanges, AfterViewInit {
  @Input() textToAdd: string = '';

  public options = {
    language: 'sql',
  };
  public text: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    const _textToAdd = changes['textToAdd'];    
    this.text = `${this.text}${_textToAdd.currentValue}`;
  }

  ngAfterViewInit(): void {
    const loaderScript: HTMLScriptElement = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = '/assets/monaco-editor/vs/loader.js';

    const editorNlsScript: HTMLScriptElement = document.createElement('script');
    editorNlsScript.type = 'text/javascript';
    editorNlsScript.src = '/assets/monaco-editor/vs/editor/editor.main.nls.js'

    const editorScript: HTMLScriptElement = document.createElement('script');
    editorScript.type = 'text/javascript';
    editorScript.src = '/assets/monaco-editor/vs/editor/editor.main.js'
    
    document.body.appendChild(loaderScript);
    document.body.appendChild(editorNlsScript);
    document.body.appendChild(editorScript);
  }

  onGotAmdLoader($event: any) {
    console.log('$event', $event);
  }
}
