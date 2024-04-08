import { useState, useEffect } from "react";
import { Infection } from "../../Templates/InterfaceModels/InterfaceModels";
import { Operation } from "../FacilityOperations/FacilityOperations";
import style from "../FacilityOperations/FacilityOpeartions.module.css";
import Button from "../../Templates/Button/Button";
import Modal from "../../Templates/Modal/Modal";
import axios from "axios";

export default function InfectionOperations(){
    /*
    
    id: number,
    typeId: number,
    date: string,
    SSN: number,

    */
    const [op, setOp] = useState<Operation>(Operation.UNSELECTED);
    const [infection, setInfection] = useState<Infection>();
    const [typeEmpty, setTypeEmpty] = useState<boolean>(true);
    const [qResponse, setQResponse] = useState<Array<any>>();

    /* Person Attributes */
    const [type, setType] = useState<number>();
    const [ssn, setSSN] = useState<number>(0);
    const [id, setId] = useState<number>(0);
    const [date, setDate] = useState<string>("");

    useEffect(()=>{

        if(op === Operation.CREATE_SUBMIT){
            const value: Infection={
                id: id,
                SSN: ssn,
                typeId: type || 0,
                date: date,
            }

            const url = 'http://127.0.0.1:8000/infection/create'
            const config = {
                SSN: ssn,
                typeId: type || 1,
                date: date,
            }

            axios.post(url,config).then((res)=>{
                const data = res.data.tuples;
                setQResponse(data);
            })

            setInfection(value);
            infection !== undefined && createInfection(infection);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.READ_SUBMIT){
            id !== undefined && displayInfection(id);
            setOp(Operation.UNSELECTED);
        }else if(op === Operation.UPDATE_SUBMIT){
            const value: Infection={
                id: id,
                SSN: ssn,
                typeId: type || 0,
                date: date,
            }

            setInfection(value);
            infection !== undefined && updateInfection(infection);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.DELETE_SUBMIT){
            id !== undefined && deleteInfection(id);
            setOp(Operation.UNSELECTED);
        }



    },[infection, op, id, type, date, ssn]);

    return(
        <div>
            <h1>InfectionOperations</h1>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.CREATE)}}>CREATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.READ)}}>READ</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.UPDATE)}}>UPDATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.DELETE)}}>DELETE</Button></div>
        
            {op===Operation.CREATE && <Modal title="Create an Infection" unsetModal={()=>setOp(Operation.UNSELECTED)} children={(
            
                <div className={style["createBox"]}>

                    <div className={style['dropdown']}>
                        <div className={style['dropDiv']} onClick={()=>{setTypeEmpty(true)}}>Facility Type</div>
                        {typeEmpty && <div className={style['dropContent']}>
                            <div onClick={()=>{setType(1); setTypeEmpty(false)}}>apartment</div>
                            <div onClick={()=>{setType(2); setTypeEmpty(false)}}>condominium</div>
                            <div onClick={()=>{setType(3); setTypeEmpty(false)}}>semi-detached house</div>
                            <div onClick={()=>{setType(4); setTypeEmpty(false)}}>detached house</div>
                        </div>}
                    </div>

                    <label htmlFor="">SSN: </label>
                    <input
                        type="text"
                        id="ssn"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setSSN(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">ID: </label>
                    <input
                        type="text"
                        id="infectionId"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setId(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">date: </label>
                    <input
                        type="text"
                        id="infectionDate"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDate(e.target.value)}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.CREATE_SUBMIT);}} children={"Submit"} /> 

                </div>
            
            )}/>}


            {op===Operation.READ && <Modal title="Get a Facility" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div>

                    <label htmlFor="">Person ID: </label>
                    <input
                        type="text"
                        id="vaxId"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setSSN(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.READ_SUBMIT);}} children={"Read"} /> 

                </div>

                
            
            )}/>}

            {/*
                "typeId": 1,
                "numberOfBedroom": 2,
                "address": "487 Bird Street",
                "city": "Montreal",
                "province": "Quebec",
                "postalCode": "J6U9K8",
                "phoneNumber": 4385552222
            */}

            {op===Operation.UPDATE && <Modal title="Update a Facility" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div className={style["updateBox"]}>

                    <label htmlFor="">Person ID: </label>
                    <input
                        type="text"
                        id="vaxId"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setSSN(Number(e.target.value))}}
                    />
                    <br/>
                    <br/>

                    <div className={style['dropdown']}>
                        <div className={style['dropDiv']} onClick={()=>{setTypeEmpty(true)}}>Facility Type</div>
                        {typeEmpty && <div className={style['dropContent']}>
                            <div onClick={()=>{setType(1); setTypeEmpty(false)}}>apartment</div>
                            <div onClick={()=>{setType(2); setTypeEmpty(false)}}>condominium</div>
                            <div onClick={()=>{setType(3); setTypeEmpty(false)}}>semi-detached house</div>
                            <div onClick={()=>{setType(4); setTypeEmpty(false)}}>detached house</div>
                        </div>}
                    </div>

                    <label htmlFor="">SSN: </label>
                    <input
                        type="text"
                        id="ssn"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setSSN(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">ID: </label>
                    <input
                        type="text"
                        id="infectionId"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setId(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">date: </label>
                    <input
                        type="text"
                        id="infectionDate"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDate(e.target.value)}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.UPDATE_SUBMIT);}} children={"Update"} /> 

                </div>
            
            )}/>}

            {op===Operation.DELETE && <Modal title="Delete a Vax" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                    <div>

                        <label htmlFor="">ID: </label>
                        <input
                            type="text"
                            id="infectionId"
                            autoComplete="off"
                            required
                            onChange={(e)=>{setId(Number(e.target.value))}}
                        />
                        <br/>

                        <Button onClick={()=>{setOp(Operation.DELETE_SUBMIT);}} children={"Delete"} /> 

                    </div>
                
            )}/>}
        
        </div>
    );

}


function createInfection(p: Infection){

    /* Implement POST request to create an infection */
    console.log("Creating infection:");
    console.log(p);

}

function displayInfection(ssn: number){

    /* Implement GET request to display an infection */
    console.log("Getting person " + ssn);

}

function updateInfection(p: Infection){

    /* Implement PUT request to update an infection */
    console.log("Update person:");
    console.log(p);

}

function deleteInfection(id: number){
    /* Implement DELETE request to delete an infection */
    console.log("Delete infection: " + id);
}