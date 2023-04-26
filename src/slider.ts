import Splide from '@splidejs/splide';
import { Drawing, getDrawings, getVisibleIds, setActiveSlideIndex, subscribe } from './data';

const sliderEl = document.getElementById('image-slider') as HTMLElement;
let splide: Splide;

function getSlideHtml(drawing: Drawing) {
  return `<div class="splide__slide">
      <img data-splide-lazy="images/drawings/${drawing.image_file_large}" alt="${drawing.description}">
      <div>${drawing.description} (${drawing.year})</div>
    </div>`;
}

export function setupSlider() {
  splide = new Splide(sliderEl, {
    keyboard: 'global',
    lazyLoad: 'nearby',
    pagination: false,
  }).mount();

  splide.on('active', (slide) => setActiveSlideIndex(slide.index));

  subscribe(goToSlideByIndex);
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

export function goToSlideByIndex(index: number | undefined) {
  if (index !== undefined) {
    splide.Components.Controller.go(index);
  }
}
