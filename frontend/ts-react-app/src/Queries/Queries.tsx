import style from "../CRUD/FacilityOperations/FacilityOpeartions.module.css";
import { useState, useEffect } from 'react';
import Button from "../Templates/Button/Button";
import Modal from "../Templates/Modal/Modal";
import axios, { AxiosError } from 'axios';
import Table, { Row, Cell } from "../Templates/Table/Table";
import { config } from "process";

enum Query {
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

enum State {
    UNDEFINED,
    SUBMIT
}

export default function Queries() {

    const [query, setQuery] = useState<Query>(Query.UNDEFINED);
    const [qResponse, setQResponse] = useState<Array<any>>();
    const [state, setState] = useState<State>();

    /* Query params */
    const [facilityName, setFacilityName] = useState<string>();
    const [ssn, setSSN] = useState<string>();
    const [startAt, setStartAt] = useState<string>();
    const [endAt, setEndAt] = useState<string>();

    useEffect(() => {

        if (query === Query.Query8 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query8"

            axios.get(url).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });
            setState(State.UNDEFINED);

        } else if (query === Query.Query9 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query9"
            const config = {
                params: {
                    facility_name: facilityName,
                }
            }

            axios.get(url, config).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            }).catch((err) => {
                console.error(err);
            })
            setState(State.UNDEFINED);

        } else if (query === Query.Query10 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query10"
            const config = {
                params: {
                    /*
                    SSN: 123456789,
                    startAt: "2024-03-10",
                    endAt: "2024-05-01",
                    */
                    SSN: ssn,
                    startAt,
                    endAt,
                }
            };

            axios.get(url, config).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });

        } else if (query === Query.Query11 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query11";
            const config = {
                params: {
                    /*
                    SSN: 123456789,
                    startAt: "2024-03-10",
                    endAt: "2024-05-01",
                    */
                    SSN: ssn,
                    startAt,
                    endAt,
                }
            };

            axios.get(url, config).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });

        } else if (query === Query.Query12 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query12"

            axios.get(url).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });
            setState(State.UNDEFINED);

        } else if (query === Query.Query13 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query13";
            const config = {
                params: {

                    name: "City Hospital",
                    startAt: "2021-01-02",
                    endAt: "2021-01-02",

                }
            };

            axios.get(url, config).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });

        } else if (query === Query.Query14 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query14"
            const config = {
                params: {
                    //City Hospital
                    facility_name: facilityName,
                }
            }

            axios.get(url, config).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            }).catch((err) => {
                console.error(err);
            })
            setState(State.UNDEFINED);

        } else if (query === Query.Query15 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query15"

            axios.get(url).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });
            setState(State.UNDEFINED);

        }else if (query === Query.Query16 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query16"

            axios.get(url).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            });
            setState(State.UNDEFINED);

        }else if (query === Query.Query18 && state === State.SUBMIT) {

            setQResponse(["LOADING"]);

            const url = "http://127.0.0.1:8000/queries/Query18"
            const config = {
                params: {
                    /*
                    startAt: "2024-03-10",
                    endAt: "2024-05-01",
                    */
                    startAt,
                    endAt,
                }
            }

            axios.get(url, config).then((response) => {
                console.log(response);
                console.log(response.data.tuples);
                const data = response.data.tuples;
                setQResponse(data);
            }).catch((err) => {
                console.error(err);
            })
            setState(State.UNDEFINED);

        }

    }, [state]);

    return (
        <div>
            <h1>Queries</h1>
            <div className={style["btn"]}><Button onClick={() => { setState(State.UNDEFINED); setQuery(Query.Query8) }}>Query #8</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setState(State.UNDEFINED); setQuery(Query.Query9) }}>Query #9</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query10) }}>Query #10</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query11) }}>Query #11</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query12) }}>Query #12</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query13) }}>Query #13</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query14) }}>Query #14</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query15) }}>Query #15</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query16) }}>Query #16</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query17) }}>Query #17</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query18) }}>Query #18</Button></div>
            <div className={style["btn"]}><Button onClick={() => { setQuery(Query.Query19) }}>Query #19</Button></div>

            {query === Query.Query8 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query9 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <label htmlFor="">Facility Name:</label>
                <input type="text" onChange={(e) => { setFacilityName(e.target.value) }} />
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query10 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <label htmlFor="">SSN:</label>
                <input type="text" onChange={(e) => { setSSN(e.target.value) }} />
                <br />
                <label htmlFor="">startAt:</label>
                <input type="text" onChange={(e) => { setStartAt(e.target.value) }} />
                <br />
                <label htmlFor="">endAt:</label>
                <input type="text" onChange={(e) => { setEndAt(e.target.value) }} />
                <br />
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query11 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <label htmlFor="">SSN:</label>
                <input type="text" onChange={(e) => { setSSN(e.target.value) }} />
                <br />
                <label htmlFor="">startAt:</label>
                <input type="text" onChange={(e) => { setStartAt(e.target.value) }} />
                <br />
                <label htmlFor="">endAt:</label>
                <input type="text" onChange={(e) => { setEndAt(e.target.value) }} />
                <br />
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query12 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}
            {query === Query.Query13 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <label htmlFor="">FacilityName:</label>
                <input type="text" onChange={(e) => { setFacilityName(e.target.value) }} />
                <br />
                <label htmlFor="">startAt:</label>
                <input type="text" onChange={(e) => { setStartAt(e.target.value) }} />
                <br />
                <label htmlFor="">endAt:</label>
                <input type="text" onChange={(e) => { setEndAt(e.target.value) }} />
                <br />
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query14 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <label htmlFor="">Facility Name:</label>
                <input type="text" onChange={(e) => { setFacilityName(e.target.value) }} />
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query15 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>

                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}

            </Modal>}

            {query === Query.Query16 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

            {query === Query.Query18 && <Modal unsetModal={() => { setQuery(Query.UNDEFINED) }}>
            <label htmlFor="">startAt:</label>
                <input type="text" onChange={(e) => { setStartAt(e.target.value) }} />
                <br />
                <label htmlFor="">endAt:</label>
                <input type="text" onChange={(e) => { setEndAt(e.target.value) }} />
                <br />
                <Button onClick={() => { setState(State.SUBMIT) }}>Submit</Button>
                {qResponse?.map((row) => <p>{row[0] + ":" + row}</p>)}
            </Modal>}

        </div>
    );

}

function query8() {

    /* implement axios to get query */
    console.log("Query #8")

    //return request();

}
function query9() {

    /* implement axios to get query */

}
function query10() {

    /* implement axios to get query */

}
function query11() {

    /* implement axios to get query */

}
function query12() {

    /* implement axios to get query */

}
function query13() {

    /* implement axios to get query */

}
function query14() {

    /* implement axios to get query */

}
function query15() {

    /* implement axios to get query */

}
function query16() {

    /* implement axios to get query */

}
function query17() {

    /* implement axios to get query */

}
function query18() {

    /* implement axios to get query */

}
function query19() {

    /* implement axios to get query */

}