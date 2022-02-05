import { Meal } from './health/shared/services/meals/meals.service';
import { User } from './auth/shared/services/auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

export interface State {
  user: User | undefined,
  meals: Meal[] | undefined,
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
