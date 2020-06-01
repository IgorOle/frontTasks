import {Observable, of} from "rxjs";
import {TaskDAO} from "../TaskDAO";
import {Category} from "../../model/Category";
import {Task} from "../../model/Task";
import {Priority} from "../../model/Priority";
import {TestData} from "../../data/test-data";


export class TaskImpl implements TaskDAO {

  update(task: Task): Observable<Task> {
    if (task.id == null) {
      task.id = this.getLastId();
      TestData.tasks.push(task);
    }
    else {
      const taskTmp = TestData.tasks.find(t => t.id === task.id);
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    }
    return of(task);
  }

  add(task: Task): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
    return of(taskTmp);
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, true, null).length);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, false, null).length);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, null, null).length);
  }

  getTotalCount(): Observable<number> {
    return of(TestData.tasks.length);
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }
    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.title.toUpperCase().includes(searchText.toUpperCase())
      );
    }
    return allTasks;
  }

  private getLastId() {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }
}
