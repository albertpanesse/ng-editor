import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import * as monaco from 'monaco-editor';
import * as _ from 'lodash';

declare var window: any;

@Component({
  selector: 'pql-editor',
  template: '<div class="pql-editor-container" #pqlEditorContainer></div>',
})
export class NEditorComponent implements OnChanges, AfterViewInit {
  @Input('value') textToAdd: string = '';
  @Input('options') options: any = { language: 'sql' };

  @ViewChild('pqlEditorContainer') pqlEditorContainer: ElementRef;

  private editor: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const textToAddObj = changes['textToAdd']; 
    const textToAdd = textToAddObj.currentValue;

    let textToAddArr = textToAdd.split(';');
    textToAddArr = _.flatten(textToAddArr.map((txt: string) => {
      return txt.split('|');
    }));
    
    if (this.editor) {
      const model: monaco.editor.ITextModel = this.editor.getModel();
      let existingLine = '';
      textToAddArr.forEach((line: string) => {
        model.pushEditOperations(
          [],
          [{ range: model.getFullModelRange(), text: `${existingLine ? existingLine.trim() + '\n' : ''}${line.trim()};\n` }],
          () => null,
        );
        model.pushStackElement();
        existingLine = model.getValue();  
      });
    }
  }

  ngAfterViewInit() {
    const interval = setInterval(() => {
      if (window.monaco) {        
        this.editor = window.monaco.editor.create(this.pqlEditorContainer.nativeElement, this.options);
        clearInterval(interval);
      }
    }, 100);
  }
}
