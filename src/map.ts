import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import TileLayer from 'ol/layer/Tile.js';
import { OSM } from 'ol/source';
import View from 'ol/View.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import { getClusters, getSource } from './mapCluster';

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup') as HTMLElement;
const content = document.getElementById('popup-content') as HTMLElement;
const closer = document.getElementById('popup-closer') as HTMLElement;

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

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Create the map.
 */
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    })
  ],
  overlays: [overlay],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (e) {
  const coordinate = e.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});

export function addClusters() {
  map.addLayer(getClusters());
  map.getView().fit(getSource().getExtent());
}
