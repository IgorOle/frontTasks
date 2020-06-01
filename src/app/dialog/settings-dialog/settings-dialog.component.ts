import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Priority} from '../../model/Priority';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})

export class SettingsDialogComponent implements OnInit {

  priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataSource: DataHandlerService
  ) {
  }

  ngOnInit() {
    this.dataSource.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onClose() {
    this.dialogRef.close(false);
  }

}
