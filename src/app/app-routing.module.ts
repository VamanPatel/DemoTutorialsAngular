import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './component/home/home.component';
import { DateComponent } from './date/date.component';
import { EditorComponent } from './editor/editor.component';
import { FormComponent } from './form/form.component';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: FormComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'date', component: DateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
