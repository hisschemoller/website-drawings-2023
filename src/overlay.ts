let overlayEl: HTMLElement;

export function setupOverlay() {
  overlayEl = document.querySelector('.overlay') as HTMLElement;
  const closeEl = overlayEl.querySelector('.overlay-close') as HTMLElement;
  closeEl.addEventListener('click', () => {
    overlayEl.classList.remove('show');
  });
}

export function showOverlay() {
  overlayEl.classList.add('show');
}
