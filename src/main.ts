import { setupCarousel } from './carousel';
import { loadDrawings } from './data';
import './map';
import { addClusterLayer, addPopupOverlay } from './map';
import { createMapClusters } from './mapCluster';
import { setupOverlay } from './overlay';

console.log('Hello world!');

(async function setup() {
  await loadDrawings();
  createMapClusters();
  addClusterLayer();
  addPopupOverlay();
  setupCarousel();
  setupOverlay();
})();
