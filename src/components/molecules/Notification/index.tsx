import React, { memo, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useStoreActions, useStoreState } from '../../../store';

import styles from './index.module.scss';

const Notification: React.FC = () => {
  // store
  const { item: notification } = useStoreState((store) => store.notification);
  const { reset } = useStoreActions((store) => store.notification);

  // ref
  const $timerId = useRef<number | null>(null);

  const onReset = () => {
    if ($timerId.current) {
      clearTimeout($timerId.current);
      $timerId.current = null;
    }
    reset();
  };

  useEffect(() => {
    $timerId.current && clearTimeout($timerId.current);
    $timerId.current = window.setTimeout(onReset, 1500);
  }, [notification]);

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
          className={`${styles.container} ${styles[notification?.type] || ''}`}
        >
          <button
            type="button"
            className={styles.closebtn}
            onClick={() => onReset()}
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
