import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  categoryName: string;

  @Output()
  doShowStat = new EventEmitter<boolean>();

  isShowStat : boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isShowStat = true;
  }

  showStat() {
    this.isShowStat = !this.isShowStat;
    this.doShowStat.emit(this.isShowStat);
  }

  showSettings() {
    this.dialog.open(SettingsDialogComponent, {
      data: [],
      autoFocus: false
    });
  }
}
