import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { NEditorComponent } from './components/editor/editor.component';
import { PanelComponent } from './components/panel/panel.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NEditorComponent,
    PanelComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
