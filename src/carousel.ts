import { Splide } from '@splidejs/splide';
import { Drawing, getDrawings, getVisibleIds } from './data';

const thumbEl = document.getElementById('thumbnail-carousel') as HTMLElement;
const thumbList = thumbEl.querySelector('.splide__list') as HTMLElement;
let splide: Splide;

function getThumbHtml(drawing: Drawing, index: number) {
  return `<li class="splide__slide" data-index="${index}">
      <img src="images/drawings/${drawing.image_file_small}" alt="${drawing.description}" data-index="${index}">
    </li>`;
}

export function setupCarousel() {
  const drawings = getDrawings();

  const thumbHtmlString = drawings.reduce(
    (accumulator, drawing, index) => (accumulator + getThumbHtml(drawing, index)), '');
  thumbList.innerHTML = thumbHtmlString;
  thumbEl.addEventListener('click', (e) => {
    const index = e.target ? (e.target as HTMLElement).dataset.index : 0;
    if (index) {
      splide.go(parseInt(index));
    }
  });

  splide = new Splide( '#thumbnail-carousel', {
    fixedHeight: 100,
		fixedWidth: 100,
		gap: 10,
    lazyLoad: 'nearby',
		pagination: false,
		rewind: true,
  }).mount();
}
  
export function updateThumbs() {
  const ids = getVisibleIds();
  const drawings = getDrawings();
  const htmlString = ids.map((id, index) => {
    const drawing = drawings.find((drawing) => drawing.id === id) as Drawing;
    return getThumbHtml(drawing, index);
  });
  splide.Components.Slides.remove(() => true);
  splide.Components.Slides.add(htmlString);
}

export function goToThumb(id: string) {
  const ids = getVisibleIds();
  const index = ids.findIndex((visibleId) => visibleId === id);
  splide.Components.Controller.go(index);
}

