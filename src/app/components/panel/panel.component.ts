import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'panel-comp',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Output() onBtnClick = new EventEmitter<string>();

  text1() {
    this.onBtnClick.emit('First Text');
  }

  text2() {
    this.onBtnClick.emit('Second Text');
  }
}
