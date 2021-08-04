import api from '../../api';
import { Todo } from '../../types/todo';

export default {
  head: (params: { _limit: number; _page: number }) => {
    return api.head<''>(`todos`, { params });
  },
  getAll: (params: { _limit: number; _page: number }) => {
    return api.get<Todo[]>(`todos`, { params });
  },
  getById: (id: number) => {
    return api.get<Todo>(`todos/${id}`);
  },
  post: (todo: Todo) => {
    return api.post<Todo>('todos', todo);
  },
  put: (todo: Todo) => {
    return api.put<Todo>(`todos/${todo.id}`, todo);
  },
  delete: (id: number) => {
    return api.delete<Todo>(`todos/${id}`);
  },
};
