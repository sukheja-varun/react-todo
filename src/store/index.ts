import { createStore, createTypedHooks } from 'easy-peasy';
import todos, { TodosModel } from './todos';

interface StoreModel {
  todos: TodosModel;
}

const model: StoreModel = {
  todos,
};

const store = createStore(model);
const typedHooks = createTypedHooks<StoreModel>();

const { useStoreActions, useStoreDispatch, useStoreState } = typedHooks;
export { useStoreActions, useStoreDispatch, useStoreState };

export default store;
