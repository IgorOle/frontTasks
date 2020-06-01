import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task"
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  @Input()
  selectedCategory: Category;

  @Output()
  selectTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  tasks: Task[];

  displayedColumns: string[] = ['id', 'title', 'category', 'priority', 'date', 'operations', 'select'];
  matTableDataSource: MatTableDataSource<Task>;
  priorities: Priority[];

  //ищет в html MatSort и в sort его присваивает
  //можно @ViewChild('ssss')
  // Но тогда в html  <table mat-table matSort [dataSource]=... пишем!!!!=> #ssss
  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  searchTaskText: string;
  selectedStatusFilter: boolean;
  selectedPriorityFilter: Priority;




  constructor(
    private dataSource: DataHandlerService,
    private dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.initTable();
    this.dataSource.getAllPriorities().subscribe(items => this.priorities = items);
  }

  ngOnInit(): void {
    this.dataSource.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.matTableDataSource = new MatTableDataSource<Task>();
    this.initTable();
  }

  @Input('tasks')
  private set Tasks(tasks: Task[]) {
    this.tasks = tasks;
    this.initTable();
  }

  getPriorityColor(task: Task): string {
    return task.priority ? task.priority.color : '#fff';
  }

  private initTable() {
    if (!this.matTableDataSource) return;
    this.matTableDataSource.data = this.tasks;
    this.addTableObjects();
    this.matTableDataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.title : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? new Date(task.date).getTime() : null;
        }
        case 'title': {
          return task.title;
        }
      }
    }

  }

  addTableObjects(): void {
    this.matTableDataSource.sort = this.sort;
    this.matTableDataSource.paginator = this.paginator;
  }

  openTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.deleteTask.emit(task);
      } else if (result as Task) {
        this.selectTask.emit(result);
      }
    });
  }

  openDeleteDialog(task: Task) {
    const confirmDialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {titleDialog: 'Удаление!', message: `Вы дейсвительно хотите удалить задачу "${task.title}"?`},
        autoFocus: false
      }
    );
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.selectTask.emit(task);
  }

  onSelectCategory(task: Task) {
    this.selectedCategory = task.category;
    this.selectCategory.emit(task.category);
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(status: boolean) {
    this.filterByStatus.emit(status);
  }

  onFilterByPriority(priority: Priority) {
    this.filterByPriority.emit(priority);
  }

  openAddTaskDialog() {
    let task = new Task(null, '', false, null, this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Добавление задачи'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result as Task) {
        this.addTask.emit(result);
      }
    });
  }
}
