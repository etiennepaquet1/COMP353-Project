import styles from './Table.module.css'

export function Cell(props: { onClick?: Function, align?: string, children?: any }) {
    if (props.onClick) {
        return (
            <div className={`${styles.Cell} ${styles.Clickable}`} onClick={() => props.onClick!()}>{props.children}</div>
        )
    } else {
        return (
            <div className={styles.Cell}>{props.children}</div>
        )
    }
}

export function Row(props: { children?: any }) {


    return (
        <div className={styles.Row}>{props.children}</div>
    )
}

export default function Table<T>(props: { data: Array<T>, printRow: Function, children?: any }) {

    return (
        <div className={styles.Table}>
            {props.data.length ?
                (
                    <>
                        {props.children}
                        {props.data.map((row: T) => props.printRow(row))}
                    </>
                )
                : <Row>
                    <Cell>No results found</Cell>
                </Row>}
        </div>
    );
}