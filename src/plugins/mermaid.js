import mermaid from 'mermaid'

window.mermaid = mermaid;

mermaid.initialize({
  startOnLoad: false
});

const htmlUnescape = e => new DOMParser().parseFromString(e.innerHTML, 'text/html').documentElement.textContent;

const mermaidRender = container => container.querySelectorAll('.mermaid')
  .forEach((element, idx) => {
    const input = element.querySelector('.mermaid-in');
    const output = element.querySelector('.mermaid-out');
    const insertSvg = (svg, bindFunctions) => {
      output.innerHTML = svg;
      bindFunctions && bindFunctions(output);
    };

    mermaid.render(`mermaid${idx}`, htmlUnescape(input), insertSvg, output);
    const svg = output.querySelector('svg');

    element.getAttribute('data-width') && svg.setAttribute('width', +element.getAttribute('data-width'));
    element.getAttribute('data-height') && svg.setAttribute('height', +element.getAttribute('data-height'));

    if (element.getAttribute('data-scale')) {
      const scale = +element.getAttribute('data-scale');
      svg.setAttribute('width', scale * +svg.getAttribute('width'));
      svg.setAttribute('height', scale * +svg.getAttribute('height'));
    }
  });

document.addEventListener('DOMContentLoaded', (e) => {
  mermaidRender(document);
  Reveal.addEventListener('slidechanged', function (event) {
    mermaidRender(event.currentSlide);
  });
});