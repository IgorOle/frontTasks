import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {MatDialog} from "@angular/material/dialog";
import {EditPriorityDialogComponent} from "../../dialog/edit-priority-dialog/edit-priority-dialog.component";
import {DataHandlerService} from "../../service/data-handler.service";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {
  static defaultColor = '#fff';

  @Input()
  priorities: Priority[];

  @Output()
  deletePriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  addPriority = new EventEmitter<Priority>();

  constructor(private dialog: MatDialog,
              private dataSource: DataHandlerService) {
  }

  ngOnInit() {
  }

  onDeletePriority(priority: Priority) {
    const confirmDialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {titleDialog: 'Удаление!', message: `Вы дейсвительно хотите удалить приоритет "${priority.title}"?`},
        autoFocus: false
      }
    );
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.deletePriority(priority);
      }
    });
  }

  onEditPriority(priority: Priority) {
    const editDialog = this.dialog.open(EditPriorityDialogComponent, {data:[priority]});
    editDialog.afterClosed().subscribe(
      p => this.dataSource.updatePriority(p));
  }
}
