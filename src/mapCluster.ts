import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { getDrawings } from './data';

interface StyleCache {
  [name: string]: Style;
}

const styleCache: StyleCache = {};

let clusters: VectorLayer<Cluster>;

let source: VectorSource;

export const getClusters = () => clusters;

export const getSource = () => source;

export function createMapClusters() {
  const drawings = getDrawings();

  const features = drawings.map((d) => new Feature({
    description: d.description,
    geometry: new Point(fromLonLat([d.longitude, d.latitude])),
    id: d.id,
    srcSmall: d.image_file_small,
    year: d.year,
  }));
  
  source = new VectorSource({
    features: features,
  });
  
  const clusterSource = new Cluster({
    distance: 20,
    source,
  });

  clusters = new VectorLayer({
    source: clusterSource,
    style: (feature) => {
      const size = feature.get('features').length;
      let style: Style = styleCache[size];
      if (!style) {
        style = new Style({
          image: new CircleStyle({
            radius: 14,
            stroke: new Stroke({
              color: '#fff',
            }),
            fill: new Fill({
              color: size === 1 ? '#006600' : '#666699',
            }),
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: '#fff',
            }),
            scale: 1.2,
          }),
        });
        styleCache[size] = style;
      }
      return style;
    },
  });
}