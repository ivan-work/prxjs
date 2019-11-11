export class Observable<T> implements Subscribable<T> {
  public _isScalar: boolean = false;
  source: Observable<any>;
  operator: Operator<any, T>;

  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  subscribe(sink: Observer) {
    if (this.operator) {
      sink.add(this.operator(this.source));
    } else {
      sink.add(this.source || this._subscribe(sink))
    }
    return sink;
  }

  _subscribe(subscriber: Subscriber): TeardownLogic {
    const {source} = this;
    return source && source.subscribe(subscriber);
  }

  pipe(...operations: OperatorFunction)
}