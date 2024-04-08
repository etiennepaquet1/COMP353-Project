import style from "../CRUD/FacilityOperations/FacilityOpeartions.module.css";
import { useState, useEffect} from 'react';
import Button from "../Templates/Button/Button";
import Modal from "../Templates/Modal/Modal";
import axios from 'axios';

enum Query{
    Query8,
    Query9,
    Query10,
    Query11,
    Query12,
    Query13,
    Query14,
    Query15,
    Query16,
    Query17,
    Query18,
    Query19,
    UNDEFINED,
}

export default function Queries(){

    const [query, setQuery] = useState<Query>(Query.UNDEFINED);


    return(
        <div>
            <h1>Queries</h1>
            <h1>FacilityOperations</h1>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query8)}}>Query #8</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query9)}}>Query #9</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query10)}}>Query #10</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query11)}}>Query #11</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query12)}}>Query #12</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query13)}}>Query #13</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query14)}}>Query #14</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query15)}}>Query #15</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query16)}}>Query #16</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query17)}}>Query #17</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query18)}}>Query #18</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setQuery(Query.Query19)}}>Query #19</Button></div>
            
            {query===Query.Query8 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query8()}</Modal>}
            {query===Query.Query9 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query9()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query11()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query12()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query13()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query14()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query15()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query16()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query17()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query18()}</Modal>}
            {query===Query.Query10 && <Modal unsetModal={()=>{setQuery(Query.UNDEFINED)}}>{query19()}</Modal>}
            
        </div>
    );

}

function query8(){

    /* implement axios to get query */
    return "Hello";

}
function query9(){

    /* implement axios to get query */

}
function query10(){

    /* implement axios to get query */

}
function query11(){

    /* implement axios to get query */

}
function query12(){

    /* implement axios to get query */

}
function query13(){

    /* implement axios to get query */

}
function query14(){

    /* implement axios to get query */

}
function query15(){

    /* implement axios to get query */

}
function query16(){

    /* implement axios to get query */

}
function query17(){

    /* implement axios to get query */

}
function query18(){

    /* implement axios to get query */

}
function query19(){

    /* implement axios to get query */

}