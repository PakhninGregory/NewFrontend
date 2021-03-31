import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SummitComponent } from './views/summit/summit.component';
import { SummitNamesComponent } from './views/summit-names/summit-names.component';
import { SummitAlpsComponent } from './views/summit-alps/summit-alps.component';
import { ShowSummitComponent } from './views/summit/show-summit/show-summit.component';
import { AddEditSummitComponent } from './views/summit/add-edit-summit/add-edit-summit.component';
import { ShowNamesComponent } from './views/summit-names/show-names/show-names.component';
import { AddEditNameComponent } from './views/summit-names/add-edit-name/add-edit-name.component';
import { ShowAlpsComponent } from './views/summit-alps/show-alps/show-alps.component';
import { AddEditAlpsComponent } from './views/summit-alps/add-edit-alps/add-edit-alps.component';
import { CartesianComponent } from './views/cartesian/cartesian.component';
import { ShowSystemComponent } from './views/cartesian/show-system/show-system.component';
import { SummitService } from './core/services/Summit.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResponsibilityComponent } from './views/responsibility/responsibility.component';
import {AddSystemComponent} from './views/cartesian/add-system/add-system.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SummitComponent,
    SummitNamesComponent,
    SummitAlpsComponent,
    ShowSummitComponent,
    AddEditSummitComponent,
    ShowNamesComponent,
    AddEditNameComponent,
    ShowAlpsComponent,
    AddEditAlpsComponent,
    CartesianComponent,
    ShowSystemComponent,
    AddSystemComponent,
    ResponsibilityComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SummitService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
