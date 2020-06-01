import {CategoryDAO} from "../CategoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../model/Category";
import {TestData} from "../../data/test-data";

export class CategoryImpl implements CategoryDAO {

  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    const tmp = TestData.categories.find(t => t.id == id);
    TestData.tasks.forEach(t => {
      if (t.category && t.category.id === id) {
        t.category = null;
      }
    });
    TestData.categories.splice(TestData.categories.indexOf(tmp), 1);
    return of(tmp);
  }

  get(id): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  update(category: Category): Observable<Category> {
    if (category.id == null) {
      category.id = this.getLastId();
      TestData.categories.push(category);
    } else {
      const tmp = TestData.categories.find(t => t.id === category.id);
      TestData.categories.splice(TestData.categories.indexOf(tmp), 1, category);
    }
    return of(category);
  }

  private getLastId() {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }

}
