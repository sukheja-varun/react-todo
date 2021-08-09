import { action, Action } from 'easy-peasy';

interface Notification {
  type: 'success' | 'danger' | 'warning' | 'info';
  msg: string;
}

export interface NotificationModel {
  item: Notification | null;
  set: Action<NotificationModel, Notification>;
  reset: Action<NotificationModel>;
}

const notification: NotificationModel = {
  item: null,
  set: action((state, payload) => {
    state.item = payload;
  }),
  reset: action((state) => {
    state.item = null;
  }),
};

export default notification;
