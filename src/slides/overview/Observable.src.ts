export class Observable<T> implements Subscribable<T> {
  /** Internal implementation detail, do not use directly. */
  public _isScalar: boolean = false;
  source: Observable<any>;
  operator: Operator<any, T>;

  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  static create: Function = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
    return new Observable<T>(subscribe);
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void),
            error?: (error: any) => void,
            complete?: () => void): Subscription {

    const {operator} = this;
    const sink = toSubscriber(observerOrNext, error, complete);

    if (operator) {
      sink.add(operator.call(sink, this.source));
    } else {
      sink.add(this.source || this._subscribe(sink))
    }

    return sink;
  }

  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    const {source} = this;
    return source && source.subscribe(subscriber);
  }

  pipe(...operations: OperatorFunction<any, any>[])
}