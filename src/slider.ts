import Splide, { Components, SlideComponent } from '@splidejs/splide';
import { Drawing, getDrawings, getVisibleIds, getVisibleIndices } from './data';

const splideEl = document.querySelector('.splide') as HTMLElement;
const splideList = splideEl.querySelector('.splide__list') as HTMLElement;
let splide: Splide;

export function setupSlider() {
  const drawings = getDrawings();
  const htmlString = drawings.reduce((accumulator, drawing) => (accumulator + `<div class="splide__slide">
    Slide ${drawing.index} ${drawing.description} (${drawing.year})
  </div>`), '');
  splideList.innerHTML = htmlString;
  splide = new Splide(splideEl).mount();
}

// export function filterSlides() {
//   const indices = getVisibleIndices();
//   splide.Components.Slides.filter((slide: SlideComponent) => !indices.includes(slide.index));
//   console.log('indices', indices);
//   console.log('Slides.getLength', splide.Components.Slides.getLength());
// }

export function updateSlides() {
  const ids = getVisibleIds();
  const drawings = getDrawings();
  const htmlString = ids.map((id) => {
    const drawing = drawings.find((drawing) => drawing.id === id) as Drawing;
    return `<div class="splide__slide">
        Slide ${drawing.index} ${drawing.description} (${drawing.year})
      </div>`;
  });
  splide.Components.Slides.remove(() => true);
  splide.Components.Slides.add(htmlString);
}

export function goToSlide(id: string) {
  const ids = getVisibleIds();
  const index = ids.findIndex((visibleId) => visibleId === id);
  splide.Components.Controller.go(index);
}
