import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TaskDatePipe} from './pipe/task-date.pipe';
import {MatCheckboxModule} from "@angular/material/checkbox";

import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import {EditCategoryDialogComponent} from './dialog/edit-category-dialog/edit-category-dialog.component';
import {StatCardComponent} from "./views/stat/stat-card/stat-card.component";
import {StatComponent} from "./views/stat/stat.component";
import {HeaderComponent} from './views/header/header.component';
import {SettingsDialogComponent} from "./dialog/settings-dialog/settings-dialog.component";
import {PrioritiesComponent} from "./views/priorities/priorities.component";
import {ColorPickerModule} from "ngx-color-picker";
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    StatCardComponent,
    StatComponent,
    HeaderComponent,
    PrioritiesComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule
  ],
  providers: [],
  // entryComponents:[EditTaskDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
