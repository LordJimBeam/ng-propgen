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


@NgModule({
  declarations: [
    MarkdownPreviewComponent,
    MenuComponent,
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
    WorkpackageService
  ],
  bootstrap: [],
  exports: [
    MenuComponent,
    RootComponent,
    WorkpackageComponent,
    WorkpackageListComponent,
  ]
})
export class PropgenModule {
  static routes: Routes = [
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
