import { FunctionComponent } from 'react';
<<<<<<< HEAD
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
=======



import styles from './ButtonsReact_Container.module.css';



const ButtonsReactContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.buttonsreactContainer} >
					<button className={styles.buttonUnlike}></button>
					<button className={styles.buttonLike}></button>		
					<button className={styles.buttonhandupIcon}><img src="src/assets/room-img/ButtonHandUp.svg" alt="" /></button>
				</div>);
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
};

export default ButtonsReactContainer;
