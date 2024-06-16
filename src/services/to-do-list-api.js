import axios from 'axios';

const TO_DO_LIST_API = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (path, ...config) => {
  const { data } = await TO_DO_LIST_API.get(path, { config });

  return { data };
};

export const post = async (path, payload, ...config) => {
  const { data } = await TO_DO_LIST_API.post(path, payload, { config });

  return { data };
};

export const put = async (path, payload, ...config) => {
  const { data } = await TO_DO_LIST_API.put(path, payload, { config });

  return { data };
};

export const remove = async (path, ...config) => {
  const { data } = await TO_DO_LIST_API.delete(path, { config });

  return { data };
};
