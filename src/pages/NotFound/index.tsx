import React, { memo } from 'react';

// import styles from'./index.module.scss';

interface NotFoundProps {}
const NotFound: React.FC<NotFoundProps> = () => {
  // const {} = props;
  return <div>404 Page</div>;
};
export default memo(NotFound);
