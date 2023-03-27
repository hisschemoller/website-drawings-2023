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
  year: string;
};

const PAGE_SIZE = 30;

const ENV = 'dev';

let drawings: Drawing[];

let pageIndex = 0;

let visibleIds: string[];

export const getDrawings = () => drawings;

export const getNumPages = () => Math.ceil(visibleIds.length / PAGE_SIZE);

export const getPage = () => {
  const pageOfIDs = visibleIds.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE);
  return pageOfIDs.map((id: string) => drawings.find((drawing: Drawing) => drawing.id === id))
};

export async function loadDrawings() {
  try {
    // const response = await fetch('http://localhost:8080/api/index.php');
    const response = await fetch(ENV === 'dev'
      ? ' json/drawings.json'
      : '/wordpress/wp-content/plugins/drawings-app/dist/json/drawings.json');
    const json = await response.json();
    drawings = json.map((item: Drawing) => ({
      ...item,
      latitude: parseFloat(item.latitude.toString()),
      longitude: parseFloat(item.longitude.toString()),
      year: item.date.substring(0, 4),
    }));
    setPageIndex(0);
  } catch (err) {
    console.log('loadDrawings error:', err);
  }
}

export const setPageIndex = (index: number) => pageIndex = index;

export const updateVisibleIds = (ids: string[]) => {
  visibleIds = ids;
  console.log(visibleIds.length);
  setPageIndex(0);
};
