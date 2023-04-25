import { Splide } from '@splidejs/splide';
import { Drawing, getDrawings, getVisibleIds, setActiveSlideIndex, subscribe } from './data';

const thumbEl = document.getElementById('thumbnail-carousel') as HTMLElement;
let splide: Splide;

function getThumbHtml(drawing: Drawing) {
  const { description, id, image_file_small } = drawing;
  return `<li class="splide__slide" data-id="${id}">
      <img src="images/drawings/${image_file_small}" alt="${description}" data-id="${id}">
    </li>`;
}

export function setupCarousel() {
  splide = new Splide('#thumbnail-carousel', {
    fixedHeight: 100,
		fixedWidth: 100,
    focus: 'center',
		gap: 10,
    lazyLoad: 'nearby',
		pagination: false,
		rewind: true,
  }).mount();

  splide.on('click', (slide) => setActiveSlideIndex(slide.index));

  splide.on('active', (slide) => setActiveSlideIndex(slide.index));

  subscribe(goToThumb);
}
  
export function updateThumbs() {
  const ids = getVisibleIds();
  const drawings = getDrawings();
  const htmlString = ids.map((id) => {
    const drawing = drawings.find((drawing) => drawing.id === id) as Drawing;
    return getThumbHtml(drawing);
  });
  splide.Components.Slides.remove(() => true);
  splide.Components.Slides.add(htmlString);
  setActiveSlideIndex(undefined);
}

export function goToThumb(index: number | undefined) {
  if (index !== undefined) {
    splide.Components.Controller.go(index);
  }
}

