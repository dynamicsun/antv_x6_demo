import { BehaviorSubject, MonoTypeOperatorFunction, defer } from 'rxjs';
import { finalize } from 'rxjs/operators';

export class LoadingSubject extends BehaviorSubject<boolean> {
  private count = 0;
  constructor() {
    super(false);
  }
  wrap<T>(): MonoTypeOperatorFunction<T> {
    return (x) =>
      defer(() => {
        this.increment();
        return x;
      }).pipe(finalize(() => this.decrement()));
  }
  private increment() {
    if (this.count++ === 0) {
      this.next(true);
    }
  }
  private decrement() {
    if (--this.count == 0) {
      this.next(false);
    }
  }
}
