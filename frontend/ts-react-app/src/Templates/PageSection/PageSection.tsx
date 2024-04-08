import styles from './PageSection.module.css'

export default function PageSection(props: { children?: React.ReactNode }) {
    return (
        <div className={styles.Wrapper}>
            <div className={styles.PageSection}>
                {props.children}
            </div>
        </div>
    )
}