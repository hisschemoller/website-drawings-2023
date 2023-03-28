import Splide, { Components, SlideComponent } from '@splidejs/splide';
import { Drawing } from './data';

let splide: Splide;

export function setupCarousel(drawings: Drawing[]) {
  const splideEl = document.querySelector('.splide') as HTMLElement;
  const splideList = splideEl.querySelector('.splide__list');
  splide = new Splide(splideEl).mount();
  console.log('splide', splide);
}

export function filterSlides(indexes: number[]) {
  splide.Components.Slides.filter((slide: SlideComponent) => indexes.includes(slide.index));
}
