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
import {ProducabletypeService} from './services/producabletype.service';
import {TextFormComponent} from './modelcreator/formcomponents/text.form.component';
import {DisseminationtypeService} from './services/disseminationtype.service';
import {DeliverableService} from './services/deliverable.service';
import {ForeignManyFormComponent} from './modelcreator/formcomponents/foreign-many.form.component';
import {MilestoneService} from './services/milestone.service';
import {DeliverablePartnerTaskPMService} from './services/deliverablepartnertaskpm.service';
import {TaskPartnerPMService} from './services/taskpartnerpm.service';
import {MilestonePartnerTaskPMService} from './services/milestonepartnertaskpm.service';



function automaticModelRoute(path: string, title: string, service: any) : Routes {
  return [
    {
      path: path + '/:id',
      component: AutomaticModelFormComponent,
      data: {
        title: title,
        service: service,
        parent: path + 's'
      }
    },
    {
      path: path + 's',
      component: AutomaticModelFormListComponent,
      data: {
        title: title + 's',
        service: service,
        path: path
      }
    }
  ]
}



@NgModule({
  declarations: [
    AutomaticModelFormComponent,
    AutomaticModelFormListComponent,
    DetailEditorComponent,
    MenuComponent,
    RootComponent,
    SortableListComponent,

    ForeignKeyFormComponent,
    ForeignManyFormComponent,
    NumberFormComponent,
    MarkdownPreviewComponent,
    StringFormComponent,
    TextFormComponent
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
    DeliverableService,
    DeliverablePartnerTaskPMService,
    DisseminationtypeService,
    MilestoneService,
    MilestonePartnerTaskPMService,
    PartnerService,
    PartnertypeService,
    ProducabletypeService,
    TaskService,
    TaskPartnerPMService,
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
  static routes: Routes = [].concat.apply([], [
    automaticModelRoute('deliverable', 'Deliverable', DeliverableService),
    automaticModelRoute('deliverablepartnertaskpm', 'DeliverablePartnerTaskPM', DeliverablePartnerTaskPMService),
    automaticModelRoute('disseminationtype', 'Dissemination type', DisseminationtypeService),
    automaticModelRoute('milestone', 'Milestone', MilestoneService),
    automaticModelRoute('milestonepartnertaskpm', 'MilestonePartnerTaskPM', MilestonePartnerTaskPMService),
    automaticModelRoute('partner', 'Partner', PartnerService),
    automaticModelRoute('partnertype', 'Partnertype', PartnertypeService),
    automaticModelRoute('producabletype', 'Producable type', ProducabletypeService),
    automaticModelRoute('task', 'Task', TaskService),
    automaticModelRoute('taskpartnerpm', 'TaskPartnerPM', TaskPartnerPMService),
    automaticModelRoute('textblock', 'Textblock', TextblockService),
    automaticModelRoute('workpackage', 'Workpackage', WorkpackageService),
    [{
      path: '',
      component: MenuComponent
    }]
  ])
}
