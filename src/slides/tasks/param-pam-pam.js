import * as Rx from 'rxjs';
import * as op from 'rxjs/operators';

const createFadingElement = (host, text) => {
  const span = document.createElement('span');
  span.innerText = text;
  span.style.transition = '2s opacity';
  host.appendChild(span);
  setTimeout(() => {
    span.style.opacity = 0;
  });
  setTimeout(() => {
    host.removeChild(span);
  }, 2000);
};

document.addEventListener('DOMContentLoaded', (event) => {
  const pam = document.getElementById('pam');
  const pampam = document.getElementById('pampam');
  const input$ = Rx.fromEvent(document, 'keydown', true)
    .pipe(
      op.filter(() => Reveal.getCurrentSlide().getAttribute('data-capture'))
      , op.filter(({keyCode}) => 65 <= keyCode && keyCode <= 90)
      , op.tap(e => e.stopImmediatePropagation())
      , op.pluck('key')
      , op.share()
    );

  input$.subscribe(key => {
    createFadingElement(pam, key);
  });

  input$.pipe(
    op.bufferCount(5, 1)
    , op.filter(buffered => buffered.join('') === 'param')
  )
    .subscribe(e => {
      createFadingElement(pampam, 'PAM-PAM!');
    })
});

// document.addEventListener('DOMContentLoaded', (event) => {
//   const pam = document.getElementById('pam');
//   const input$ = Rx.fromEvent(document, 'keydown').pipe(
//     op.filter(() => Reveal.getCurrentSlide().getAttribute('data-capture'))
//     , op.pluck('key')
//     , op.filter(key => ['p', 'a', 'm'].includes(key))
//     , op.share()
//   );
//
//   input$.subscribe(key => {
//     console.log('key', key)
//     pam.innerText = key;
//   })
// });