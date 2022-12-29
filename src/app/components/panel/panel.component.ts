import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'panel-comp',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Output() onBtnClick = new EventEmitter<string>();

  text1() {
    this.onBtnClick.emit(`SELECT * FROM 'Test.csv' INTO dataset_${new Date().getTime()}; EXTRACT bla_bla_bla FROM dataset_${new Date().getTime()} INTO extract_result_${new Date().getTime()}`);
  }

  text2() {
    this.onBtnClick.emit(`Second Text - ${new Date().getTime()}`);
  }
}
