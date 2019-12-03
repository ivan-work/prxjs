import './css/main.scss';

import './boostrap-reveal';

import 'reveal_external/external/external.js'
import 'reveal.js-menu/menu.js'
import './reveal-plugins/reveal-notes.js'
// import './reveal-plugins/print-css.js'
import './reveal-plugins/reveal-highlight.js'

import hljs from 'highlight.js/lib/highlight.js';
import './slides/tasks/param-pam-pam';

hljs.registerLanguage('javascript', require(`highlight.js/lib/languages/javascript`));
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.pre.javascript code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

import './plugins/mermaid';

import * as Rx from 'rxjs';
import * as op from 'rxjs/operators';
import {multicast} from "rxjs/operators";

const observer = (name) => ({
  next: (value) => console.log(`observer[${name}].next(${value})`),
  complete: () => console.log(`observer[${name}].complete()`)
});

let ob$id = 0;
const ob$ = Rx.Observable.create((subscriber) => {
  const id = ob$id++;
  console.log(`ott${id} subscribed`);
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => subscriber.next(3), 1000)
  // subscriber.complete();
  return () => {
    console.log(`ott${id} unsubscribed`);
  }
}).pipe(op.share());

const ob2$ = Rx.Observable.create((subscriber) => {
  const id = ob$id++;
  console.log(`ott${id} subscribed`);
  subscriber.next(1);
  subscriber.complete();
  return () => {
    console.log(`ott${id} unsubscribed`);
  }
});

const crazyObservable = Rx.Observable.create((subscriber) => {
  const id = ob$id++;
  console.log(`ott${id} subscribed`);
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => subscriber.next(3), 1000);
  subscriber.complete();
  return () => {
    console.log(`ott${id} unsubscribed`);
  }
}).pipe(function (source) {
  return Rx.interval(1000);
}).subscribe(observer('crazy'));

setTimeout(() => {
  console.log('unsub');
  crazyObservable.unsubscribe();
}, 10e3)

// ob$.source = ob2$;
//
// console.log(ob$, ob$._subscribe);
// console.log(ob2$, ob2$._subscribe);
//
// ob$.subscribe(observer('a'));

const ob3$ = Rx.Observable.create((subscriber) => {
  const id = ob$id++;
  console.log(`ott${id} subscribed`);
  const handler = () => {
    console.log(`handler of ${id} is clicked`);
    subscriber.next(`ott${id} clicked`)
  };
  document.addEventListener('click', handler);
  return () => {
    console.log(`ott${id} unsubscribed`);
    document.removeEventListener('click', handler);
  }
});
// const subscription = ob3$.subscribe(observer('clicker'));
// const subscription2 = ob3$.subscribe(observer('double clicker'));
//
//
// let i = 0;
// document.addEventListener('click', () => {
//   console.log(i);
//   if (++i > 4) {
//     subscription.unsubscribe();
//   }
// });

// let ott$id = 0;
// let sub$;
// const ott$ = Rx.Observable.create((subscriber) => {
//   sub$ = subscriber;
//   const id = ott$id++;
//   console.log(`ott$${id} subscribed`);
//   subscriber.next(1);
//   subscriber.next(2);
//   // subscriber.next(3);
//   // subscriber.complete();
//   return () => {
//     console.log(`ott${id} unsubscribed`);
//   }
// }).pipe(op.publish());
//
// const ffs$ = Rx.Observable.create((subscriber) => {
//   console.log('ffs$ subscribed');
//   subscriber.next(4);
//   subscriber.next(5);
//   subscriber.next(6);
//   subscriber.complete();
//   return () => {
//     console.log('ffs$ unsubscribed');
//   }
// });
//
// ott$.subscribe(observer('a'));
//
// ott$.subscribe(observer('b'));
//
// ott$.connect();
//
// ott$.subscribe(observer('c'));
//
// setTimeout(() => {
//   sub$.complete();
// }, 2000);

















