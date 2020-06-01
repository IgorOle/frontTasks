import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {
  tmpTitle: string;
  tmpPriority: Priority;

  constructor(private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [Priority]) {
  }

  ngOnInit(): void {
    if(this.data[0] == null){
      this.tmpPriority = new Priority(null,'', '');
      this.tmpTitle = '';
    }else {
      this.tmpPriority = this.data[0];
      this.tmpTitle = this.data[0].title;
    }
  }

  mbOk() {
    this.tmpPriority.title = this.tmpTitle;
    this.dialogRef.close(this.tmpPriority);
  }

  mbCancel() {
    this.dialogRef.close(null);
  }
}
