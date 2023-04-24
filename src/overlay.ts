import { setActiveSlideIndex, subscribe } from "./data";

let overlayEl: HTMLElement;

export function setupOverlay() {
  overlayEl = document.querySelector('.overlay') as HTMLElement;
  const closeEl = overlayEl.querySelector('.overlay-close') as HTMLElement;
  closeEl.addEventListener('click', () => setActiveSlideIndex(undefined));

  subscribe(showOverlay);
}

export function showOverlay(index: number | undefined) {
  if (index === undefined) {
    overlayEl.classList.remove('show');
  } else {
    overlayEl.classList.add('show');
  }
}
