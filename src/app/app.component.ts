import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;
  searchTextTask: string;
  filterStatus: boolean;
  selectedPriority: Priority;
  uncompletedCountInCategory: any;
  completedCountInCategory: any;
  totalTasksCountInCategory: any;
  showStat: boolean;

  constructor(private dataSource: DataHandlerService) {
  }

  ngOnInit(): void {
    this.showStat = true;
    this.dataSource.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource.getAllCategories().subscribe(categories => this.categories = categories);
    this.updateTasksAndStat();
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  onSelectTask(task: Task) {
    this.dataSource.updateTask(task).subscribe(() => {
      this.dataSource.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
    this.updateStat();
  }

  onDeleteTask(task: Task) {
    this.dataSource.deleteTask(task.id).subscribe(() => {
      this.dataSource.searchTasks(
        this.selectedCategory ? this.selectedCategory : null,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
    this.updateStat();
  }

  onEditCategory(category: Category) {
    this.dataSource.updateCategory(category).subscribe(() => {
      console.log(this.categories);
      this.onSelectCategory(category);
    })
  }

  onDeleteCategory(category: Category) {
    this.dataSource.deleteCategory(category).subscribe(() => {
      this.onSelectCategory(null);
    })
  }

  onSearchTask(value: string) {
    this.searchTextTask = value;
    this.updateTasksAndStat();
  }

  onFilterByStatus(status: boolean) {
    this.filterStatus = status;
    this.updateTasksAndStat();
  }

  private updateTasks() {
    this.dataSource.searchTasks(this.selectedCategory, this.searchTextTask, this.filterStatus, this.selectedPriority)
      .subscribe((t) => this.tasks = t);
  }

  onFilterByPriority(priority: Priority) {
    this.selectedPriority = priority;
    this.updateTasksAndStat();
  }

  onSearchCategories(value: string) {
    this.dataSource.searchCategories(value).subscribe(c => {
      this.categories = c;
    });
  }

  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  // обновить статистику
  private updateStat() {
    zip(
      this.dataSource.getTotalCountInCategory(this.selectedCategory),
      this.dataSource.getCompletedCountInCategory(this.selectedCategory),
      this.dataSource.getUncompletedCountInCategory(this.selectedCategory),
      // this.dataSource.getUncompletedTotalCount()
    )
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        // this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
  }

  onShowStat(showStat: boolean) {
    console.log(showStat);
    this.showStat = showStat;
  }
}
