import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useStoreActions, useStoreState } from '../../../store';

import styles from './index.module.scss';

const Notification: React.FC = () => {
  const { item: notification } = useStoreState((store) => store.notification);
  const { reset } = useStoreActions((store) => store.notification);

  return (
    <CSSTransition
      in={!!notification}
      out={notification}
      timeout={500}
      classNames={styles}
    >
      {!notification ? (
        <></>
      ) : (
        <div
          className={`${styles.container} ${styles[notification?.type || '']}`}
        >
          <button
            type="button"
            className={styles.closebtn}
            onClick={() => reset()}
          >
            &times;
          </button>
          <strong>{notification.type}!</strong> {notification?.msg}
        </div>
      )}
    </CSSTransition>
  );
};
export default memo(Notification);
