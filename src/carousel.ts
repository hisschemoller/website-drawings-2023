import Splide, { Components, SlideComponent } from '@splidejs/splide';
import { Drawing, getDrawings } from './data';

let splide: Splide;

export function setupCarousel() {
  const splideEl = document.querySelector('.splide') as HTMLElement;
  const splideList = splideEl.querySelector('.splide__list') as HTMLElement;
  const drawings = getDrawings();
  const htmlString = drawings.reduce((accumulator, drawing) => (accumulator + `<div class="splide__slide">
    Slide ${drawing.index} ${drawing.description} (${drawing.year})
  </div>`), '');
  // console.log('htmlString', htmlString);
  splideList.innerHTML = htmlString;

  splide = new Splide(splideEl).mount();
  console.log('splide', splide);
}

export function filterSlides(indexes: number[]) {
  splide.Components.Slides.filter((slide: SlideComponent) => indexes.includes(slide.index));
}

export function goToSlide(index: number) {
  splide.Components.Controller.go(index);
}
