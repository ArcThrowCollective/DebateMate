import { FunctionComponent } from 'react';



import styles from './ButtonsReact_Container.module.css';



const ButtonsReactContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.buttonsreactContainer} >
					<button className={styles.buttonUnlike}></button>
					<button className={styles.buttonLike}></button>		
					<button className={styles.buttonhandupIcon}><img src="src/assets/room-img/ButtonHandUp.svg" alt="" /></button>
				</div>);
};

export default ButtonsReactContainer;
