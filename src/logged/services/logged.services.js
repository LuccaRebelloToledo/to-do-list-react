import { get, patch, post } from '../../services/to-do-list-api';

const TASKS_PATH = '/tasks';

export const requestHandleGetTasks = async () => {
  return await get(TASKS_PATH);
};

export const requestHandleCreateTasks = async (payload) => {
  return await post(TASKS_PATH, payload);
};

export const requestHandleUpdateStatus = async (id, payload) => {
  return await patch(`${TASKS_PATH}/${id}`, payload);
};
