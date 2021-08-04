import { Action, action, computed, Computed, thunk, Thunk } from 'easy-peasy';
import { Todo } from '../../types/todo';
import api from './service';

export interface Params {
  _limit: number;
  _page: number;
}
export interface TodosModel {
  items: Todo[];
  incompleteTodos: Computed<TodosModel, Todo[]>;
  completedTodos: Computed<TodosModel, Todo[]>;
  set: Action<TodosModel, Todo[]>;
  reset: Action<TodosModel>;
  add: Action<TodosModel, Todo | Todo[]>;
  update: Action<TodosModel, Todo>;
  delete: Action<TodosModel, Todo>;
  getTodos: Thunk<TodosModel, { params: Params }>;
  addTodo: Thunk<TodosModel, { data: Todo }>;
  updateTodo: Thunk<TodosModel, { data: Todo }>;
  deleteTodo: Thunk<TodosModel, { data: Todo }>;
}

const todos: TodosModel = {
  items: [],
  incompleteTodos: computed((state) =>
    state.items.filter((item) => !item.completed)
  ),
  completedTodos: computed((state) =>
    state.items.filter((item) => item.completed)
  ),
  set: action((state, payload) => {
    state.items = payload;
  }),
  reset: action((state) => {
    state.items = [];
  }),
  add: action((state, payload) => {
    if (Array.isArray(payload)) {
      state.items.push(...payload);
    } else {
      state.items.push(payload);
    }
  }),
  update: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex((item) => item.id === payload.id);
    items[index] = payload;
    state.items = items;
  }),
  delete: action((state, payload) => {
    const items = state.items.filter((item) => item.id !== payload.id);
    state.items = items;
  }),
  getTodos: thunk(async (actions, { params }) => {
    const result = await api.getAll(params);
    actions.add(result.data);
  }),
  addTodo: thunk(async (actions, payload) => {
    const { data } = payload;
    const result = await api.post(data);
    actions.add(result.data);
  }),
  updateTodo: thunk(async (actions, payload) => {
    const { data } = payload;
    const result = await api.put(data);
    actions.update(result.data);
  }),
  deleteTodo: thunk(async (actions, payload) => {
    const { data } = payload;
    const { id } = data;
    await api.delete(id);
    actions.delete(data);
  }),
};

export default todos;
