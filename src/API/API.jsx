export async function fetchImages(searchQuery, page) {
  const API_KEY = '31365930-c15782909a5a0e3024bcedf9d';
  const BASE_URL = 'https://pixabay.com/api/';
  const PER_PAGE = 12;

  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal&safesearch=true~`
  );

  const result = await response.json();

  if (result.total === 0) {
    return Promise.reject();
  }

  return result;
}
