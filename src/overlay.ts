export function setupOverlay() {
  const overlayEl = document.querySelector('.overlay') as HTMLElement;
  const closeEl = overlayEl.querySelector('.overlay-close') as HTMLElement;
  console.log('closeEl', closeEl);
  closeEl.addEventListener('click', () => {
    console.log('click');
    overlayEl.classList.add('hidden');
  });
}