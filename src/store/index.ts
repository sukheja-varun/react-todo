import { createStore, createTypedHooks } from 'easy-peasy';
import notification, { NotificationModel } from './notification';
import todos, { TodosModel } from './todos';

interface StoreModel {
  todos: TodosModel;
  notification: NotificationModel;
}

const model: StoreModel = {
  todos,
  notification,
};

const store = createStore(model);
const typedHooks = createTypedHooks<StoreModel>();

const { useStoreActions, useStoreDispatch, useStoreState } = typedHooks;
export { useStoreActions, useStoreDispatch, useStoreState };

export default store;
