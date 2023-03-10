import { Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup') as HTMLElement;
const content = document.getElementById('popup-content') as HTMLElement;
const closer = document.getElementById('popup-closer') as HTMLElement;

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.addEventListener('click', () => {
  closePopup();
  closer.blur();
  return false;
});

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

export const getOverlay = () => overlay;

export function closePopup() {
  overlay.setPosition(undefined);
}

export function showPopup(
  coordinate: Coordinate,
  description: string,
  id: string,
  srcSmall: string,
) {
  content.innerHTML = `<p>${description}<br />${id}<br />${srcSmall}</p>`;
  overlay.setPosition(coordinate);
}
