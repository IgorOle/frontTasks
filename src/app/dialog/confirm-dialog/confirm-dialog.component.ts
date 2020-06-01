import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  dialogTitle: string;
  message: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { titleDialog: string, message: string }) {
  }

  ngOnInit(): void {
    this.dialogTitle = this.data.titleDialog;
    this.message = this.data.message;
  }

  mbOk() {
    this.dialogRef.close(true);
  }

  mbCancel() {
    this.dialogRef.close(false);
  }
}
