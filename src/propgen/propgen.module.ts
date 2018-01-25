import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MenuComponent} from './components/menu/menu.component';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from './components/root/root.component';
import {SortableListComponent} from './components/sortable-list/sortable-list.component';
import {WorkpackageService} from './services/workpackage.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {EmailFormComponent} from './modelcreator/formcomponents/email.form.component';
import {ProjectService} from './services/project.service';
import {SettingService} from './services/setting.service';
import {BooleanFormComponent} from './modelcreator/formcomponents/boolean.form.component';
import {TemplateService} from './services/template.service';
import {AutomaticModelFormVersionListComponent} from './components/automatic-model-form-version-list/automatic-model-form-version-list.component';
import {AutomaticModelFormVersionComponent} from './components/automatic-model-form-version/automatic-model-form-version.component';
import {ReorderService} from './services/reorder.service';
import {DefaultBackendService} from './services/default-backend.service';
import {CatchAllComponent} from './components/catch-all/catch-all.component';

const componentRoutes = [
  {
    path:"deliverable/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Deliverable",
          service:DeliverableService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Deliverable",
          service:DeliverableService
        }
      }
    ],
    data:{
      title:"Deliverable",
      service:DeliverableService,
      parent:"deliverables"
    }
  },
  {
    path:"deliverables",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Deliverables",
      service:DeliverableService,
      path:"deliverable"
    }
  },
  {
    path:"deliverablepartnertaskpm/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"DeliverablePartnerTaskPM",
          service:DeliverablePartnerTaskPMService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"DeliverablePartnerTaskPM",
          service:DeliverablePartnerTaskPMService
        }
      }
    ],
    data:{
      title:"DeliverablePartnerTaskPM",
      service:DeliverablePartnerTaskPMService,
      parent:"deliverablepartnertaskpms"
    }
  },
  {
    path:"deliverablepartnertaskpms",
    component:AutomaticModelFormListComponent,
    data:{
      title:"DeliverablePartnerTaskPMs",
      service:DeliverablePartnerTaskPMService,
      path:"deliverablepartnertaskpm"
    }
  },
  {
    path:"disseminationtype/:id",
    component:AutomaticModelFormComponent,
    data:{
      title:"DisseminationType",
      service:DisseminationtypeService,
      parent:"disseminationtypes"
    }
  },
  {
    path:"disseminationtypes",
    component:AutomaticModelFormListComponent,
    data:{
      title:"DisseminationTypes",
      service:DisseminationtypeService,
      path:"disseminationtype"
    }
  },
  {
    path:"milestone/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Milestone",
          service:MilestoneService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Milestone",
          service:MilestoneService
        }
      }
    ],
    data:{
      title:"Milestone",
      service:MilestoneService,
      parent:"milestones"
    }
  },
  {
    path:"milestones",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Milestones",
      service:MilestoneService,
      path:"milestone"
    }
  },
  {
    path:"milestonepartnertaskpm/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"MilestonePartnerTaskPM",
          service:MilestonePartnerTaskPMService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"MilestonePartnerTaskPM",
          service:MilestonePartnerTaskPMService
        }
      }
    ],
    data:{
      title:"MilestonePartnerTaskPM",
      service:MilestonePartnerTaskPMService,
      parent:"milestonepartnertaskpms"
    }
  },
  {
    path:"milestonepartnertaskpms",
    component:AutomaticModelFormListComponent,
    data:{
      title:"MilestonePartnerTaskPMs",
      service:MilestonePartnerTaskPMService,
      path:"milestonepartnertaskpm"
    }
  },
  {
    path:"partner/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Partner",
          service:PartnerService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Partner",
          service:PartnerService
        }
      }
    ],
    data:{
      title:"Partner",
      service:PartnerService,
      parent:"partners"
    }
  },
  {
    path:"partners",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Partners",
      service:PartnerService,
      path:"partner"
    }
  },
  {
    path:"partnertype/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"PartnerType",
          service:PartnertypeService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"PartnerType",
          service:PartnertypeService
        }
      }
    ],
    data:{
      title:"PartnerType",
      service:PartnertypeService,
      parent:"partnertypes"
    }
  },
  {
    path:"partnertypes",
    component:AutomaticModelFormListComponent,
    data:{
      title:"PartnerTypes",
      service:PartnertypeService,
      path:"partnertype"
    }
  },
  {
    path:"producabletype/:id",
    component:AutomaticModelFormComponent,
    data:{
      title:"ProducableType",
      service:ProducabletypeService,
      parent:"producabletypes"
    }
  },
  {
    path:"producabletypes",
    component:AutomaticModelFormListComponent,
    data:{
      title:"ProducableTypes",
      service:ProducabletypeService,
      path:"producabletype"
    }
  },
  {
    path:"project/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Project",
          service:ProjectService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Project",
          service:ProjectService
        }
      }
    ],
    data:{
      title:"Project",
      service:ProjectService,
      parent:"projects"
    }
  },
  {
    path:"projects",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Projects",
      service:ProjectService,
      path:"project"
    }
  },
  {
    path:"setting/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Setting",
          service:SettingService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Setting",
          service:SettingService
        }
      }
    ],
    data:{
      title:"Setting",
      service:SettingService,
      parent:"settings"
    }
  },
  {
    path:"settings",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Settings",
      service:SettingService,
      path:"setting"
    }
  },
  {
    path:"task/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Task",
          service:TaskService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Task",
          service:TaskService
        }
      }
    ],
    data:{
      title:"Task",
      service:TaskService,
      parent:"tasks"
    }
  },
  {
    path:"tasks",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Tasks",
      service:TaskService,
      path:"task"
    }
  },
  {
    path:"taskpartnerpm/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"TaskPartnerPM",
          service:TaskPartnerPMService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"TaskPartnerPM",
          service:TaskPartnerPMService
        }
      }
    ],
    data:{
      title:"TaskPartnerPM",
      service:TaskPartnerPMService,
      parent:"taskpartnerpms"
    }
  },
  {
    path:"taskpartnerpms",
    component:AutomaticModelFormListComponent,
    data:{
      title:"TaskPartnerPMs",
      service:TaskPartnerPMService,
      path:"taskpartnerpm"
    }
  },
  {
    path:"template/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Template",
          service:TemplateService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Template",
          service:TemplateService
        }
      }
    ],
    data:{
      title:"Template",
      service:TemplateService,
      parent:"templates"
    }
  },
  {
    path:"templates",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Templates",
      service:TemplateService,
      path:"template"
    }
  },
  {
    path:"textblock/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Textblock",
          service:TextblockService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Textblock",
          service:TextblockService
        }
      }
    ],
    data:{
      title:"Textblock",
      service:TextblockService,
      parent:"textblocks"
    }
  },
  {
    path:"textblocks",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Textblocks",
      service:TextblockService,
      path:"textblock"
    }
  },
  {
    path:"workpackage/:id",
    component:AutomaticModelFormComponent,
    children:[
      {
        path:"versions",
        component:AutomaticModelFormVersionListComponent,
        data:{
          title:"Workpackage",
          service:WorkpackageService
        }
      },
      {
        path:"version/:version_id",
        component:AutomaticModelFormVersionComponent,
        data:{
          title:"Workpackage",
          service:WorkpackageService
        }
      }
    ],
    data:{
      title:"Workpackage",
      service:WorkpackageService,
      parent:"workpackages"
    }
  },
  {
    path:"workpackages",
    component:AutomaticModelFormListComponent,
    data:{
      title:"Workpackages",
      service:WorkpackageService,
      path:"workpackage"
    }
  },
  {
    path: '',
    component: MenuComponent
  }
];

const catchAll: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: '**',
    component: CatchAllComponent
  }
];

@NgModule({
  declarations: [
    AutomaticModelFormComponent,
    AutomaticModelFormListComponent,
    AutomaticModelFormVersionComponent,
    AutomaticModelFormVersionListComponent,
    CatchAllComponent,
    DetailEditorComponent,
    MenuComponent,
    RootComponent,
    SortableListComponent,

    BooleanFormComponent,
    EmailFormComponent,
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
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(catchAll),

    SortablejsModule,
    MarkdownModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
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
    ProjectService,
    SettingService,
    TaskService,
    TaskPartnerPMService,
    TemplateService,
    TextblockService,
    WorkpackageService,

    ReorderService,
    DefaultBackendService,
  ],
  bootstrap: [],
  exports: [
    MenuComponent,
    RootComponent,
    RouterModule,
  ]
})
export class PropgenModule {
}
