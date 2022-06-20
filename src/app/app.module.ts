import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameContentComponent } from './game-content/game-content.component';
import { NgxEchartsModule } from 'ngx-echarts';
// import "bootstrap";
// import "jquery";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
