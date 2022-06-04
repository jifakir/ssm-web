

const data = {
  method: 'flickr.photos.search',
  api_key: process.env.NEXT_PUBLIC_FLICKR_API_KEY,
  user_id: '',
  text: 'cat', // Search Text
  album_id: '',
  per_page: 12,
  extras: 'owner_name,license',
  format: 'json',
  nojsoncallback: 1,
};

const parameters = new URLSearchParams(data);

export const url = `https://www.flickr.com/services/rest/?${parameters}`;
// export const url = `https://api.flickr.com/services/rest/?${parameters}`;
console.log(url);