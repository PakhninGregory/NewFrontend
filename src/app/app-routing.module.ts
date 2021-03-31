import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummitComponent} from './views/summit/summit.component';
import {SummitNamesComponent} from './views/summit-names/summit-names.component';
import {SummitAlpsComponent} from './views/summit-alps/summit-alps.component';
import {CartesianComponent} from './views/cartesian/cartesian.component';
import {ResponsibilityComponent} from './views/responsibility/responsibility.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'summits', component: SummitComponent },
  { path: 'names', component: SummitNamesComponent },
  { path: 'alps', component: SummitAlpsComponent },
  { path: 'cartesian', component: CartesianComponent },
  { path: 'responsibility', component: ResponsibilityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
