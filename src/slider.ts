import Splide from '@splidejs/splide';
import { Drawing, getDrawings, getVisibleIds, getVisibleIndices } from './data';

const splideEl = document.querySelector('.splide') as HTMLElement;
const splideList = splideEl.querySelector('.splide__list') as HTMLElement;
let splide: Splide;

function getSlideHtml(drawing: Drawing) {
  return `<div class="splide__slide">
      <img data-splide-lazy="images/drawings/${drawing.image_file_large}" alt="${drawing.description}">
      <div>Slide ${drawing.index} ${drawing.description} (${drawing.year})</div>
    </div>`;
}

export function setupSlider() {
  const drawings = getDrawings();
  const htmlString = drawings.reduce((accumulator, drawing) => (accumulator + getSlideHtml(drawing)), '');
  splideList.innerHTML = htmlString;
  splide = new Splide(splideEl, { lazyLoad: 'nearby' }).mount();
}

export function updateSlides() {
  const ids = getVisibleIds();
  const drawings = getDrawings();
  const htmlString = ids.map((id) => {
    const drawing = drawings.find((drawing) => drawing.id === id) as Drawing;
    return getSlideHtml(drawing);
  });
  splide.Components.Slides.remove(() => true);
  splide.Components.Slides.add(htmlString);
}

export function goToSlide(id: string) {
  const ids = getVisibleIds();
  const index = ids.findIndex((visibleId) => visibleId === id);
  splide.Components.Controller.go(index);
}
