const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export async function getMovies(category) {
  const res = await fetch(`${API_URL}/movies?category=${category}`);
  return handleResponse(res);
}

export async function searchMovies(query) {
  const res = await fetch(`${API_URL}/movies/search?query=${encodeURIComponent(query)}`);
  return handleResponse(res);
}

export async function getGenres() {
  const res = await fetch(`${API_URL}/movies/genres`);
  return handleResponse(res);
}

export async function getMovie(id) {
  const res = await fetch(`${API_URL}/movies/${id}`);
  return handleResponse(res);
}

export async function getFavorites(visitorId) {
  const res = await fetch(`${API_URL}/favorites?visitorId=${visitorId}`);
  return handleResponse(res);
}

export async function addFavorite(visitorId, movie) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorId, movie }),
  });
  return handleResponse(res);
}

export async function removeFavorite(visitorId, movieId) {
  const res = await fetch(`${API_URL}/favorites/${movieId}?visitorId=${visitorId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
