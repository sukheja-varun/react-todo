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
  hasMoreData: boolean;
  set: Action<TodosModel, Todo[]>;
  reset: Action<TodosModel>;
  setHasMoreData: Action<TodosModel, boolean>;
  add: Action<TodosModel, Todo | Todo[]>;
  update: Action<TodosModel, Todo>;
  delete: Action<TodosModel, Todo>;
  getTodos: Thunk<TodosModel, { params: Params }>;
  headTodos: Thunk<TodosModel, { params: Params }>;
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
  hasMoreData: true,
  set: action((state, payload) => {
    state.items = payload;
  }),
  reset: action((state) => {
    state.items = [];
  }),
  setHasMoreData: action((state, payload) => {
    state.hasMoreData = payload;
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
    actions.setHasMoreData(!!result.data.length);
  }),
  headTodos: thunk(async (actions, { params }) => {
    await api.head(params);
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
