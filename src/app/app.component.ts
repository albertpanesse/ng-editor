import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'editor';

  public textToAdd: string = '';

  onBtnClick(txt: string) {
    this.textToAdd = txt;
  }
}
