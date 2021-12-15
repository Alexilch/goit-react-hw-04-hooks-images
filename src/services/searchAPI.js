const imagesAPI = ({ searchQuery = '', page = 1 }) => {
  const BASE_URL =
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';
  const API_KEY = '23976074-1864ef446645d9fee251ba638';
  return fetch(`${BASE_URL}&q=${searchQuery}&page=${page}&key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`API error!`));
    },
  );
};
const API = { imagesAPI };

export default API;
