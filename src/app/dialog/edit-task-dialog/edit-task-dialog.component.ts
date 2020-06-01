import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task"
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDatepickerInput} from "@angular/material/datepicker";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  task: Task;
  title: string;
  tmpTitle: string;
  tmpCategory: Category;
  categories: Category[];
  tmpPriority: Priority;
  priorities: Priority[];
  completedMsg: string;
  tmpDate: Date;
  // picker: MatDatepickerInput<Date>;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно из taskComponent.openTaskDialog
    private dataSource: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.task = this.data[0];
    this.title = this.data[1];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.dataSource.getAllCategories().subscribe(c => this.categories = c);
    this.tmpPriority = this.task.priority;
    this.dataSource.getAllPriorities().subscribe(props => this.priorities = props);
    this.completedMsg = this.task.completed ? 'Активировать' : 'Завершить задачу';
    this.tmpDate = this.task.date;
  }

  mbOk(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  mbCancel(): void {
    this.dialogRef.close(null);
  }

  mbDelete() {
    const confirmDialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {titleDialog: 'Удаление!', message: `Вы дейсвительно хотите удалить задачу "${this.task.title}"?`},
        autoFocus: false
      }
    );
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  mbCompleted() {
    this.task.completed = !this.task.completed;
    this.dialogRef.close(this.task);
  }
}
