import Button from '../Button/Button';
import styles from './Modal.module.css'

export default function Modal(props: { title?: string, unsetModal: Function, children?: any }) {
    return (
        <div className={styles["backgroundCover"]}>
            <div className={styles['modalBox']}>
                <div className={styles.firstRow}>
                    <div className={styles['closeModal']}>
                        <Button onClick={() => props.unsetModal()}>X</Button>
                    </div>
                    {props.title && <div className={styles.title}>{props.title}</div>}
                </div>
                <div className={styles.children}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}