import { FunctionComponent } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { MdFrontHand } from 'react-icons/md';

import styles from './ButtonsReact_Container.module.css';

const ButtonsReactContainer: FunctionComponent = () => {
  return (
    <div className={styles.buttonsreactContainer}>
      <button>
        <AiFillLike className={styles.buttonLike} />
      </button>
      <button>
        <AiFillDislike className={styles.buttonUnlike} />
      </button>
      <button>
        <MdFrontHand className={styles.buttonhandupIcon} />
      </button>
    </div>
  );
};

export default ButtonsReactContainer;
