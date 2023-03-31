export type Drawing = {
  id: string;
  image_file_large: string;
  index: number;
  width_large: string;
  height_large: string;
  image_file_small: string;
  width_small: string;
  height_small: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  date: string;
  year: string;
};

const ENV = 'dev';

let drawings: Drawing[];

let visibleIds: string[];

let visibleIndices: number[];

export const getDrawings = () => drawings;

export const getVisibleIds = () => visibleIds;

export const getVisibleIndices = () => visibleIndices;

export async function loadDrawings() {
  try {
    // const response = await fetch('http://localhost:8080/api/index.php');
    const response = await fetch(ENV === 'dev'
      ? ' json/drawings.json'
      : '/wordpress/wp-content/plugins/drawings-app/dist/json/drawings.json');
    const json = await response.json() as any[];
    drawings = json.map((item: Drawing, index: number) => ({
      ...item,
      index,
      latitude: parseFloat(item.latitude.toString()),
      longitude: parseFloat(item.longitude.toString()),
      year: item.date.substring(0, 4),
    }));
  } catch (err) {
    console.log('loadDrawings error:', err);
  }
}

export const updateVisibleIds = (ids: string[]) => {
  visibleIds = ids;
};

export const updateVisibleIndices = (indices: number[]) => {
  visibleIndices = indices;
};
