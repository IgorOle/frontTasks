import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/test-data";
import {Observable} from "rxjs";
import {TaskImpl} from "../dao/impl/TaskImpl";
import {CategoryImpl} from "../dao/impl/CategoryImpl";
import {Priority} from "../model/Priority";
import {PriorityImpl} from "../dao/impl/PriorityImpl";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskRepo = new TaskImpl();
  private categoryRepo = new CategoryImpl();
  private priorityRepo = new PriorityImpl();

  constructor() {
  }

  getCategories(): Category[] {
    return TestData.categories;
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityRepo.getAll();
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskRepo.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryRepo.getAll();
  }


  updateTask(task: Task): Observable<Task> {
    return this.taskRepo.update(task);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskRepo.search(category, searchText, status, priority);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskRepo.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryRepo.update(category)
  }

  deleteCategory(category: Category) {
    return this.categoryRepo.delete(category.id);
  }

  searchCategories(value: string): Observable<Category[]> {
    return this.categoryRepo.search(value);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskRepo.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    console.log("sssssssssssss");
    return this.taskRepo.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskRepo.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskRepo.getTotalCountInCategory(category);
  }

  deletePriority(priority: Priority): Observable<Priority> {
    return this.priorityRepo.delete(priority.id);
  }

  updatePriority(priority: Priority):Observable<Priority> {
    return this.priorityRepo.update(priority);
  }
}
