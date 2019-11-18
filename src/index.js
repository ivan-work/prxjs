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
  document.querySelectorAll('.pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

import './plugins/mermaid';

import * as Rx from 'rxjs';
import * as op from 'rxjs/operators';

const observer = (name) => ({
  next: (value) => console.log(`observer[${name}].next(${value})`),
  complete: () => console.log(`observer[${name}].complete()`)
});

let ob$id = 0;
const ob$ = Rx.Observable.create((subscriber) => {
  const id = ob$id++;
  subscriber.next(1);
  subscriber.complete();
  return () => {
    console.log(`ott${id} unsubscribed`);
  }
});

ob$.subscribe(observer('a'));

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

















