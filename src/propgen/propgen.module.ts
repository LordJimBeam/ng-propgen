import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MenuComponent} from './components/menu/menu.component';
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from './components/root/root.component';
import {SortableListComponent} from './components/sortable-list/sortable-list.component';
import {WorkpackageService} from './services/workpackage.service';
import {WorkpackageListComponent} from './components/workpackage/workpackage-list.component';
import {WorkpackageComponent} from './components/workpackage/workpackage.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SortablejsModule} from 'angular-sortablejs';
import {MarkdownPreviewComponent} from './components/markdown-preview/markdown-preview.component';
import {MarkdownModule} from 'ngx-md';
import {PartnertypeListComponent} from './components/partnertype/partnertype-list.component';
import {PartnertypeService} from './services/partnertype.service';
import {PartnertypeComponent} from './components/partnertype/partnertype.component';
import {DetailEditorComponent} from './components/detail-editor/detail-editor.component';


@NgModule({
  declarations: [
    DetailEditorComponent,
    MarkdownPreviewComponent,
    MenuComponent,
    PartnertypeComponent,
    PartnertypeListComponent,
    RootComponent,
    SortableListComponent,
    WorkpackageComponent,
    WorkpackageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    SortablejsModule,
    MarkdownModule,

    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [
    PartnertypeService,
    WorkpackageService
  ],
  bootstrap: [],
  exports: [
    MenuComponent,
    PartnertypeComponent,
    PartnertypeListComponent,
    RootComponent,
    WorkpackageComponent,
    WorkpackageListComponent,
  ]
})
export class PropgenModule {
  static routes: Routes = [
    {
      path: 'partnertype/:id',
      component: PartnertypeComponent
    },
    {
      path: 'partnertypes',
      component: PartnertypeListComponent
    },
    {
      path: 'workpackage/:id',
      component: WorkpackageComponent
    },
    {
      path: 'workpackages',
      component: WorkpackageListComponent
    },
    {
      path: '',
      component: MenuComponent
    }
  ]
}
