import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPageComponent } from './job-page/job-page.component';

const routes: Routes = [
  {path: '',component: JobPageComponent},
  { path: 'job-page', component: JobPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
