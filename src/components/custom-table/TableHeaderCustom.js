import React from 'react';
import styles from './CustomTable.module.scss';

function TableHeaderCustom(props) {
  const { Component, isTop } = props;

  return (
    <div
      className={`${styles.TableHeader} _custom_scroll_header`}
      style={{ top: 0 }}
    >
      <Component />
    </div>
  );
}

export default TableHeaderCustom;
