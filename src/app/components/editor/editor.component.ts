import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";

declare var window: any;

@Component({
  selector: 'editor-comp',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class NEditorComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() textToAdd: string = '';
  @ViewChild('editorContainer') editorContainer: ElementRef;

  private editor: any = null;
  private model: any = null;

  public options = {
    language: 'sql',
  };
  public text: string = '';

  constructor() {}

  async ngOnInit() {
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

  ngOnChanges(changes: SimpleChanges): void {
    const _textToAdd = changes['textToAdd'];    
    // this.text = `${this.text}${_textToAdd.currentValue}`;
    if (this.editor) {
      const model = this.editor.getModel();
      model.pushEditOperations(
        [],
        [{ range: model.getFullModelRange(), text: _textToAdd.currentValue }],
        () => null,
    );
    }
  }

  ngAfterViewInit() {
    const interval = setInterval(() => {
      if (window.monaco) {        
        this.editor = window.monaco.editor.create(this.editorContainer.nativeElement);
        clearInterval(interval);
      }
    }, 100);
  }
}
