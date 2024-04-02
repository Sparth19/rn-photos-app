import { ApiResponse } from "./interface";

export const fetchPhotos = async (page = 1): Promise<ApiResponse> => {
  const API_KEY = process.env.PEXEL_API;
  if (!API_KEY) {
    throw new Error('PEXEL_API environment variable is not set');
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=15`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }

    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
