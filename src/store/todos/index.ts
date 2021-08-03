import { Action, action, computed, Computed, thunk, Thunk } from 'easy-peasy';
import { Todo } from '../../types/todo';
import api from './service';

export interface TodosModel {
  items: Todo[];
  incompleteTodos: Computed<TodosModel, Todo[]>;
  completedTodos: Computed<TodosModel, Todo[]>;
  set: Action<TodosModel, Todo[]>;
  add: Action<TodosModel, Todo>;
  update: Action<TodosModel, Todo>;
  delete: Action<TodosModel, Todo>;
  getAll: Thunk<TodosModel, Todo>;
  addTodo: Thunk<TodosModel, Todo>;
  updateTodo: Thunk<TodosModel, Todo>;
  deleteTodo: Thunk<TodosModel, Todo>;
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
  add: action((state, payload) => {
    state.items.push(payload);
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
  getAll: thunk(async (actions) => {
    const result = await api.getAll();
    actions.set(result.data);
  }),
  addTodo: thunk(async (actions, payload) => {
    const result = await api.post(payload);
    actions.add(result.data);
  }),
  updateTodo: thunk(async (actions, payload) => {
    const result = await api.put(payload);
    actions.update(result.data);
  }),
  deleteTodo: thunk(async (actions, payload) => {
    const { id } = payload;
    await api.delete(id);
    actions.delete(payload);
  }),
};

export default todos;
