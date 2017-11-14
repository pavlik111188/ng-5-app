import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  // otherwise redirect to home
  // { path: '**', redirectTo: '' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
