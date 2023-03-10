const env = 'dev';
let drawings: {
  id: string;
  image_file_large: string;
  width_large: string;
  height_large: string;
  image_file_small: string;
  width_small: string;
  height_small: string;
  latitude: string;
  longitude: string;
  title: string;
  description: string;
  date: string;
}[];


export async function loadDrawings() {
  try {
    // const response = await fetch('http://localhost:8080/api/index.php');
    const response = await fetch(env === 'dev'
      ? ' json/drawings.json'
      : '/wordpress/wp-content/plugins/drawings-app/dist/json/drawings.json');
    const json = await response.json();
    drawings = json;
  } catch (err) {
    console.log('loadDrawings error:', err);
  }
}