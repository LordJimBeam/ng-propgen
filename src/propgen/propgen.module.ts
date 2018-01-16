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
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SortablejsModule} from 'angular-sortablejs';
import {MarkdownModule} from 'ngx-md';
import {PartnertypeService} from './services/partnertype.service';
import {DetailEditorComponent} from './components/detail-editor/detail-editor.component';
import {MarkdownPreviewComponent} from './modelcreator/formcomponents/markdown-preview/markdown-preview.component';
import {StringFormComponent} from './modelcreator/formcomponents/string.form.component';
import {NumberFormComponent} from './modelcreator/formcomponents/number.form.component';
import {ForeignKeyFormComponent} from './modelcreator/formcomponents/foreign.form.component';
import {PartnerService} from './services/partner.service';
import {AutomaticModelFormComponent} from './components/automatic-model-form/automatic-model-form.component';
import {AutomaticModelFormListComponent} from './components/automatic-model-form-list/automatic-model-form-list.component';
import {TextblockService} from './services/textblock.service';
import {TaskService} from './services/task.service';


@NgModule({
  declarations: [
    AutomaticModelFormComponent,
    AutomaticModelFormListComponent,
    DetailEditorComponent,
    MenuComponent,
    RootComponent,
    SortableListComponent,

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
    TaskService,
    TextblockService,
    WorkpackageService
  ],
  bootstrap: [],
  exports: [
    MenuComponent,
    RootComponent,
  ]
})
export class PropgenModule {
  static routes: Routes = [
    {
      path: 'partner/:id',
      component: AutomaticModelFormComponent,
      data: {
        title: 'Partner',
        service: PartnerService,
        parent: '/partners'
      }
    },
    {
      path: 'partners',
      component: AutomaticModelFormListComponent,
      data: {
        title: 'Partners',
        service: PartnerService,
        path: '/partner'
      }
    },
    {
      path: 'partnertype/:id',
      component: AutomaticModelFormComponent,
      data: {
        title: 'Partnertype',
        service: PartnertypeService,
        parent: '/partnertypes'
      }
    },
    {
      path: 'partnertypes',
      component: AutomaticModelFormListComponent,
      data: {
        title: 'Partnertypes',
        service: PartnertypeService,
        path: '/partnertype'
      }
    },
    {
      path: 'task/:id',
      component: AutomaticModelFormComponent,
      data: {
        title: 'Task',
        service: TaskService,
        parent: '/tasks'
      }
    },
    {
      path: 'tasks',
      component: AutomaticModelFormListComponent,
      data: {
        title: 'Tasks',
        service: TaskService,
        path: '/task'
      }
    },
    {
      path: 'textblock/:id',
      component: AutomaticModelFormComponent,
      data: {
        title: 'Textblock',
        service: TextblockService,
        parent: '/textblocks'
      }
    },
    {
      path: 'textblocks',
      component: AutomaticModelFormListComponent,
      data: {
        title: 'Textblocks',
        service: TextblockService,
        path: '/textblock'
      }
    },
    {
      path: 'workpackage/:id',
      component: AutomaticModelFormComponent,
      data: {
        title: 'Workpackage',
        service: WorkpackageService,
        parent: '/workpackages'
      }
    },
    {
      path: 'workpackages',
      component: AutomaticModelFormListComponent,
      data: {
        title: 'Workpackages',
        service: WorkpackageService,
        path: '/workpackage'
      }
    },
    {
      path: '',
      component: MenuComponent
    }
  ]
}
