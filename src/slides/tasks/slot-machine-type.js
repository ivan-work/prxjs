import * as Rx from 'rxjs';

const op = Rx.operators;

export const id = 'slot-machine-type';

export default function () {
  const root = document.getElementById(id);

  const input = root.querySelector('input');

  // Rx.fromEvent()
}
