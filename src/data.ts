type Drawing = {
  id: string;
  image_file_large: string;
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
};

const env = 'dev';

let drawings: Drawing[];

let visibleIds: string[];

export const getDrawings = () => drawings;

export async function loadDrawings() {
  try {
    // const response = await fetch('http://localhost:8080/api/index.php');
    const response = await fetch(env === 'dev'
      ? ' json/drawings.json'
      : '/wordpress/wp-content/plugins/drawings-app/dist/json/drawings.json');
    const json = await response.json();
    drawings = json.map((item: Drawing) => ({
      ...item,
      latitude: parseFloat(item.latitude.toString()),
      longitude: parseFloat(item.longitude.toString()),
    }));
  } catch (err) {
    console.log('loadDrawings error:', err);
  }
}

export const updateVisibleIds = (ids: string[]) => {
  visibleIds = ids;
  console.log(visibleIds.length);
};
