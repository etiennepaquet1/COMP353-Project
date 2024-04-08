import style from "./Table.module.css";

export function Row(props: {children?:any}){
    return(<div className={style["row"]}>{props.children}</div>);
}

export function Cell(props: { align?: string, children?: any }) {
    return (
        <div className={style["Cell"]}>{props.children}</div>
    )
}

export default function Table<T>(props: { data: Array<T>, printRow: Function, children?: any }) {

    return (
        <div className={style["Table"]}>
            {props.data.length ? ( <div>{props.children}{props.data.map((row: T) => props.printRow(row))}</div> ): <Row> <Cell>No results found</Cell> </Row>}
        </div>
    );
}