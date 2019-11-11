import './css/main.scss';

import './boostrap-reveal';

import 'reveal_external/external/external.js'
import 'reveal.js-menu/menu.js'
import './reveal-plugins/reveal-notes.js'
import './reveal-plugins/print-css.js'
import './reveal-plugins/reveal-highlight.js'

import hljs from 'highlight.js/lib/highlight.js';

hljs.registerLanguage('javascript', require(`highlight.js/lib/languages/javascript`));
hljs.initHighlightingOnLoad();

import mermaid from 'mermaid'

window.mermaid = mermaid;
console.log(window.mermaid);

mermaid.initialize({
  startOnLoad: false
  // , diagramMarginX: 1000
  // , diagramMarginY: 1000
  // , height: 20
  // , width: 500
  // , noteMargin: 100
  // , useMaxWidth: true
  // , sequence: {
  //   boxMargin: 500
  //   , diagramMarginX: 1000
  //   , diagramMarginY: 1000
  //   , width: 500
  // }
  // , gantt: {}
});

const htmlUnescape = e => new DOMParser().parseFromString(e.innerHTML, 'text/html').documentElement.textContent;

document.addEventListener('DOMContentLoaded', (event) => {
  // Reveal.addEventListener('slidechanged', function (event) {
    document.querySelectorAll('.mermaid')
      .forEach(element => {
        const input = element.querySelector('.mermaid-in');
        const output = element.querySelector('.mermaid-out');
        const insertSvg = (svg, bindFunctions) => {
          output.innerHTML = svg;
          bindFunctions && bindFunctions(output);
      };

        mermaid.render('test', htmlUnescape(input), insertSvg, output);
        const svg = output.querySelector('svg');
        // svg.setAttribute('width', 2 * +svg.getAttribute('width'));
        // svg.setAttribute('height', 2 * +svg.getAttribute('height'));
      });
  // });
});