import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../model/Category";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  tmpTitle: string;
  tmpCategory: Category;
  isNew: boolean;


  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.data[0] != null) {
      this.isNew = false;
      this.tmpCategory = this.data[0];
      this.tmpTitle = this.tmpCategory.title;
    } else {
      this.tmpCategory = new Category(null, '');
      this.tmpTitle = 'Новая категория';
      this.isNew = true;
    }
  }

  mbOk() {
    this.tmpCategory.title = this.tmpTitle;
    this.dialogRef.close(this.tmpCategory);
  }

  mbCancel() {
    this.dialogRef.close(null);
  }

  mbDelete() {
    const confirmDialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          titleDialog: 'Удаление!',
          message: `Вы дейсвительно хотите удалить категорию "${this.tmpCategory.title}"?`
        },
        autoFocus: false
      }
    );
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
