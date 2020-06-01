import {Observable} from "rxjs";

export interface CommonDAO<T> {
  add(T): Observable<T>;

  get(id): Observable<T>;

  update(T): Observable<T>;

  getAll(): Observable<T[]>;

  delete(id: number): Observable<T>;

}
