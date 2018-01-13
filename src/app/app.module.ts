import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PropgenModule } from '../propgen/propgen.module';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {SortablejsModule} from 'angular-sortablejs';
import {MarkdownModule} from 'ngx-md';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    PropgenModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          children: PropgenModule.routes
        },

      ]
    ),
    SortablejsModule.forRoot({}),
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
