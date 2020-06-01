import {CommonDAO} from "./CommonDAO";
import {Priority} from "../model/Priority";
import {Category} from "../model/Category";
import {Observable} from "rxjs";
import {Task} from "../model/Task";

export interface TaskDAO extends CommonDAO<Task> {
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: Category): Observable<number>;

  getUncompletedCountInCategory(category: Category): Observable<number>;

  getTotalCountInCategory(category: Category): Observable<number>;

  getTotalCount(): Observable<number>;
}
