import React, { memo } from 'react';

import { classNames } from 'utils';

import PropTypes from 'prop-types';
import styles from './Container.module.scss';

const Container = memo(({
  children,
  classes,
  maxWidth,
  disableGutters,
}) => {
  const maxWidthClass = () => {
    const isKeyInSizes = ['xs', 'sm', 'md', 'lg', 'xl'].includes(
      (sizeKey) => sizeKey === maxWidth,
    );
    return styles[`width-${isKeyInSizes ? maxWidth : 'lg'}`];
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [maxWidthClass()]: true,
        [styles.addGutters]: !disableGutters,
        [classes?.container]: classes?.container,
      })}
    >
      {children}
    </div>
  );
});

export default Container;

Container.propTypes = {
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disableGutters: PropTypes.bool,
  classes: PropTypes.object,
};

Container.defaultProps = {
  maxWidth: 'lg',
  disableGutters: false,
};
