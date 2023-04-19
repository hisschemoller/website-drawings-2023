import Splide from '@splidejs/splide';
import { Drawing, getDrawings, getVisibleIds, getVisibleIndices } from './data';

const sliderEl = document.getElementById('image-slider') as HTMLElement;
const sliderList = sliderEl.querySelector('.splide__list') as HTMLElement;
// const thumbEl = document.getElementById('thumbs') as HTMLElement;
let splide: Splide;

function getSlideHtml(drawing: Drawing) {
  return `<div class="splide__slide">
      <img data-splide-lazy="images/drawings/${drawing.image_file_large}" alt="${drawing.description}">
      <div>Slide ${drawing.index} ${drawing.description} (${drawing.year})</div>
    </div>`;
}

// function getThumbHtml(drawing: Drawing, index: number) {
//   return `<li class="thumb__slide" data-index="${index}">
//       <img data-splide-lazy="images/drawings/${drawing.image_file_small}" alt="${drawing.description}" data-index="${index}">
//     </li>`;
// }

export function setupSlider() {
  const drawings = getDrawings();

  const htmlString = drawings.reduce((accumulator, drawing) => (accumulator + getSlideHtml(drawing)), '');
  sliderList.innerHTML = htmlString;
  splide = new Splide(sliderEl, {
    lazyLoad: 'nearby',
    pagination: false,
  }).mount();

  // const thumbHtmlString = drawings.reduce(
  //   (accumulator, drawing, index) => (accumulator + getThumbHtml(drawing, index)), '');
  // thumbEl.innerHTML = thumbHtmlString;
  // thumbEl.addEventListener('click', (e) => {
  //   const index = e.target ? (e.target as HTMLElement).dataset.index : 0;
  //   if (index) {
  //     splide.go(parseInt(index));
  //   }
  // });
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
