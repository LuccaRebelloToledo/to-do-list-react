import { get, patch, post, put, remove } from '../../services/to-do-list-api';

const TASKS_PATH = '/tasks';

export const requestHandleGetTasks = async () => {
  return await get(TASKS_PATH);
};

export const requestHandleCreateTasks = async (payload) => {
  return await post(TASKS_PATH, payload);
};

export const requestHandleUpdateTasks = async (id, payload) => {
  return await put(`${TASKS_PATH}/${id}`, payload);
};

export const requestHandleUpdateStatus = async (id, payload) => {
  return await patch(`${TASKS_PATH}/${id}`, payload);
};

export const requestHandleDeleteTask = async (id) => {
  return await remove(`${TASKS_PATH}/${id}`);
};
