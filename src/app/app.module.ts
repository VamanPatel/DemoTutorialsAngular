import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './component/home/home.component';
import { FormComponent } from './form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TSDatePickerModule } from './custom-component/ts-datepicker/ts-datepicker.module';
import { FormsModule } from '@angular/forms';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HomeComponent,
    FormComponent,
    PaginationComponent,
    ConfirmDialogComponent,
    DateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    MatInputModule,
    NgbModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    TSDatePickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
