import { Action, action, computed, Computed, thunk, Thunk } from 'easy-peasy';
import { Todo } from '../../types/todo';
import api from './service';
import { StoreModel } from '../index';

export interface Params {
  _limit: number;
  _page: number;
}
export interface TodosModel {
  items: Todo[];
  incompleteTodos: Computed<TodosModel, Todo[]>;
  completedTodos: Computed<TodosModel, Todo[]>;
  hasMoreData: boolean;
  toEdit: Todo | null;
  set: Action<TodosModel, Todo[]>;
  reset: Action<TodosModel>;
  setHasMoreData: Action<TodosModel, boolean>;
  setToEdit: Action<TodosModel, Todo>;
  resetToEdit: Action<TodosModel>;
  add: Action<TodosModel, Todo | Todo[]>;
  update: Action<TodosModel, Todo>;
  delete: Action<TodosModel, Todo>;
  getTodos: Thunk<TodosModel, { params: Params }, any, StoreModel>;
  headTodos: Thunk<TodosModel, { params: Params }, any, StoreModel>;
  addTodo: Thunk<TodosModel, { data: Todo }, any, StoreModel>;
  updateTodo: Thunk<TodosModel, { data: Todo }, any, StoreModel>;
  toggleTodo: Thunk<TodosModel, { data: Todo }, any, StoreModel>;
  deleteTodo: Thunk<TodosModel, { data: Todo }, any, StoreModel>;
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
  toEdit: null,
  set: action((state, payload) => {
    state.items = payload;
  }),
  reset: action((state) => {
    state.items = [];
  }),
  setHasMoreData: action((state, payload) => {
    state.hasMoreData = payload;
  }),
  setToEdit: action((state, payload) => {
    state.toEdit = payload;
  }),
  resetToEdit: action((state) => {
    state.toEdit = null;
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
  getTodos: thunk(async (actions, { params }, { getStoreActions }) => {
    const setNotification = getStoreActions().notification.set;
    try {
      const result = await api.getAll(params);
      actions.add(result.data);
      actions.setHasMoreData(!!result.data.length);
    } catch (err) {
      setNotification({ type: 'danger', msg: '' });
    }
  }),
  headTodos: thunk(async (actions, { params }) => {
    await api.head(params);
  }),
  addTodo: thunk(async (actions, payload, { getStoreActions }) => {
    const setNotification = getStoreActions().notification.set;
    const { data } = payload;
    try {
      const result = await api.post(data);
      actions.add(result.data);
      setNotification({
        type: 'success',
        msg: `Added "${data.title}" to todos`,
      });
    } catch (err) {
      setNotification({
        type: 'danger',
        msg: `Failed to add todo`,
      });
    }
  }),
  updateTodo: thunk(async (actions, payload, { getStoreActions }) => {
    const setNotification = getStoreActions().notification.set;
    const { data } = payload;
    try {
      const result = await api.put(data);
      actions.update(result.data);
      setNotification({ type: 'success', msg: `Todo updated successfully` });
    } catch (error) {
      setNotification({ type: 'danger', msg: `Failed to update todo` });
    }
  }),
  toggleTodo: thunk(async (actions, payload, { getStoreActions }) => {
    const setNotification = getStoreActions().notification.set;
    const { data: oldTodo } = payload;
    const { id, completed } = oldTodo;
    actions.delete(oldTodo);
    try {
      await api.patch(id, { completed: !completed });
      actions.add({ ...oldTodo, completed: !completed });
    } catch (error) {
      actions.add(oldTodo);
      setNotification({ type: 'danger', msg: `Failed to update todo` });
    }
  }),
  deleteTodo: thunk(async (actions, payload, { getStoreActions }) => {
    const setNotification = getStoreActions().notification.set;
    const { data } = payload;
    const { id } = data;
    try {
      await api.delete(id);
      actions.delete(data);
    } catch (error) {
      setNotification({ type: 'danger', msg: `Failed to delete todo` });
    }
  }),
};

export default todos;
