import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import { OSM } from 'ol/source';
import View from 'ol/View.js';
import { getClusters, getSource } from './mapCluster';
import { closePopup, getOverlay, showPopup } from './mapPopup';
import { Pixel } from 'ol/pixel';
import { containsXY, createEmpty, extend } from 'ol/extent';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { updateVisibleIds } from './data';
import { updateThumbs } from './carousel';
import { updateSlides } from './slider';

const PADDING = { padding: [50, 50, 50, 50] };

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

map.on('moveend', () => {
  updateVisibleMarkers();
  updateSlides();
  updateThumbs();
});

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (e) {
  const { coordinate, pixel } = e;
  const clusterFeatures = map.getFeaturesAtPixel(pixel);
  if (clusterFeatures.length) {
    const markerFeatures = clusterFeatures[0].get('features');

    // a cluster with one marker is a regular marker
    if (markerFeatures.length === 1) {
      showPopup(
        coordinate,
        markerFeatures[0].get('description'),
        markerFeatures[0].get('id'),
        markerFeatures[0].get('srcSmall'),
        markerFeatures[0].get('year'),
      );
    } else if (markerFeatures.length > 1) {
      zoomToCluster(pixel);
    } else {
      closePopup();
    }
  } else {
    closePopup();
  }
});

export function addClusterLayer() {
  map.addLayer(getClusters());
  map.getView().fit(getSource().getExtent(), PADDING);
}

export function addPopupOverlay() {
  map.addOverlay(getOverlay());
}

function updateVisibleMarkers() {
  const cluster = getClusters().getSource();
  if (cluster) {
    const mapExtent = map.getView().calculateExtent(map.getSize());
    const clusterFeatures = cluster.getFeatures();
    const visibleIndices: number[] = [];
    const visibleIds: string[] = [];
    clusterFeatures.forEach((clusterFeature) => {
      const coordinates = clusterFeature.get('geometry').getCoordinates();
      const isOnMap = containsXY(mapExtent, coordinates[0], coordinates[1]);
      if (isOnMap) {
        const markerFeatures = clusterFeature.get('features');
        markerFeatures.forEach((markerFeature: Feature) => {
          visibleIds.push(markerFeature.get('id'));
          visibleIndices.push(markerFeature.get('index'));
        });
      }
    });
    updateVisibleIds(visibleIds);
    // updateVisibleIndices(visibleIndices);
  }
}

function zoomToCluster(pixel: Pixel) {
  const feature = map.forEachFeatureAtPixel(pixel, (feat) => feat);
  if (feature) {
    const features = feature.get('features');
    if (features.length > 1) {
      const extent = createEmpty();
      features.forEach((feat: Feature) => {
        const geometry: (Geometry | undefined) = feat.getGeometry();
        if (geometry) {
          extend(extent, geometry.getExtent());
          map.getView().fit(extent, PADDING);
        }
      });
    }
  }
};
