import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import { OSM } from 'ol/source';
import View from 'ol/View.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import { getClusters, getSource } from './mapCluster';
import { getOverlay, showPopup } from './mapPopup';

/**
 * Create the map.
 */
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    })
  ],
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
  showPopup(coordinate, hdms);
});

export function addClusterLayer() {
  map.addLayer(getClusters());
  map.getView().fit(getSource().getExtent());
}

export function addPopupOverlay() {
  map.addOverlay(getOverlay());
}
