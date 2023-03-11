import { loadDrawings } from './data';
import './map';
import { addClusters } from './map';
import { createMapClusters } from './mapCluster';

console.log('Hello world!');

(async function setup() {
  await loadDrawings();
  createMapClusters();
  addClusters();
})();
