import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MenuComponent} from './components/menu/menu.component';
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule, MatSelectModule,
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
import {MarkdownModule} from 'ngx-md';
import {PartnertypeListComponent} from './components/partnertype/partnertype-list.component';
import {PartnertypeService} from './services/partnertype.service';
import {PartnertypeComponent} from './components/partnertype/partnertype.component';
import {DetailEditorComponent} from './components/detail-editor/detail-editor.component';
import {MarkdownPreviewComponent} from './modelcreator/formcomponents/markdown-preview/markdown-preview.component';
import {StringFormComponent} from './modelcreator/formcomponents/string.form.component';
import {NumberFormComponent} from './modelcreator/formcomponents/number.form.component';
import {PartnerComponent} from './components/partner/partner.component';
import {PartnerListComponent} from './components/partner/partner-list.component';
import {ForeignKeyModelProperty} from './modelcreator/foreign.model.property';
import {ForeignKeyFormComponent} from './modelcreator/formcomponents/foreign.form.component';
import {PartnerService} from './services/partner.service';


@NgModule({
  declarations: [
    DetailEditorComponent,
    MenuComponent,
    PartnerComponent,
    PartnerListComponent,
    PartnertypeComponent,
    PartnertypeListComponent,
    RootComponent,
    SortableListComponent,
    WorkpackageComponent,
    WorkpackageListComponent,

    ForeignKeyFormComponent,
    NumberFormComponent,
    MarkdownPreviewComponent,
    StringFormComponent,
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
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    PartnerService,
    PartnertypeService,
    WorkpackageService
  ],
  bootstrap: [],
  exports: [
    MenuComponent,
    PartnerComponent,
    PartnerListComponent,
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
      path: 'partner/:id',
      component: PartnerComponent
    },
    {
      path: 'partners',
      component: PartnerListComponent
    },
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
