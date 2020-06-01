import {PriorityDAO} from "../PriorityDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../model/Priority";
import {TestData} from "../../data/test-data";
import {Category} from "../../model/Category";

export class PriorityImpl implements PriorityDAO {
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    const tmp = TestData.priorities.find(t => t.id == id);
    TestData.tasks.forEach(t => {
      if (t.priority && t.priority.id === id) {
        t.priority = null;
      }
    });
    TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1);
    return of(tmp);
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  private getLastId() {
    return Math.max.apply(Math, TestData.priorities.map(p => p.id)) + 1;
  }

  update(priority: Priority): Observable<Priority> {
    if (priority.id == null) {
      priority.id = this.getLastId();
      TestData.priorities.push(priority);
    } else {
      const tmp = TestData.priorities.find(t => t.id === priority.id);
      TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, priority);
    }
    return of(priority);
  }
}
