import { setupSlider } from './slider';
import { loadDrawings } from './data';
import './map';
import { addClusterLayer, addPopupOverlay } from './map';
import { createMapClusters } from './mapCluster';
import { setupOverlay } from './overlay';
import { setupCarousel } from './carousel';

(async function setup() {
  await loadDrawings();
  createMapClusters();
  addClusterLayer();
  addPopupOverlay();
  setupSlider();
  setupOverlay();
  setupCarousel();
})();
