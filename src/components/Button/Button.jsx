import React from 'react';
import styles from './Button.module.css';

const Button = ({ click }) => {
  return (
    <button className={styles.Button} onClick={click}>
      Load more
    </button>
  );
};

export default Button;
