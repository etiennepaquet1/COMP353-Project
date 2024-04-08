import { useState, useEffect } from "react";
import { Vax } from "../../Templates/InterfaceModels/InterfaceModels";
import { Operation } from "../FacilityOperations/FacilityOperations";
import style from "../FacilityOperations/FacilityOpeartions.module.css";
import Button from "../../Templates/Button/Button";
import Modal from "../../Templates/Modal/Modal";

export default function VaxOperations(){

    const [op, setOp] = useState<Operation>(Operation.UNSELECTED);
    const [vax, setVax] = useState<Vax>();
    const [typeEmpty, setTypeEmpty] = useState<boolean>(true);

    /* Vax Attributes */
    const [type, setType] = useState<number>();
    const [ssn, setSSN] = useState<number>();
    const [doseIteration, setDoseIteration] = useState<number>();
    const [date, setDate] = useState<string>();
    const [customId, setCustomId] = useState<string>();

    useEffect(()=>{

        if(op === Operation.CREATE_SUBMIT){
            const value: Vax={
                SSN: ssn || 0,
                doseIteration: doseIteration || 0,
                date: date || "", /* datetime data-type in db */
                typeId: type || 0,
                            
            }

            setVax(value);
            vax !== undefined && createVax(vax);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.READ_SUBMIT){
            customId !== undefined && displayVax(customId);
            setOp(Operation.UNSELECTED);
        }else if(op === Operation.UPDATE_SUBMIT){
            const value: Vax={
                SSN: ssn || 0,
                doseIteration: doseIteration || 0,
                date: date || "", /* datetime data-type in db */
                typeId: type || 0,
                            
            }

            setVax(value);
            vax !== undefined && updateVax(vax);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.DELETE_SUBMIT){
            customId !== undefined && deleteVax(customId)
        }

    },[vax, op, ssn, doseIteration, date, customId]);

    return(
        <div>
            <h1>VaxOperations</h1>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.CREATE)}}>CREATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.READ)}}>READ</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.UPDATE)}}>UPDATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.DELETE)}}>DELETE</Button></div>
        
            {op===Operation.CREATE && <Modal title="Create a Vax" unsetModal={()=>setOp(Operation.UNSELECTED)} children={(
            
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

                    <label htmlFor="">Dose Iteration: </label>
                    <input
                        type="text"
                        id="doseIteration"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDoseIteration(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Date: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDate(e.target.value)}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.CREATE_SUBMIT);}} children={"Submit"} /> 

                </div>
            
            )}/>}


            {op===Operation.READ && <Modal title="Get a Vax" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div>

                    <label htmlFor="">Vax ID(SSN+doseIteration): </label>
                    <input
                        type="text"
                        id="vaxId"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCustomId(e.target.value)}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.READ_SUBMIT);}} children={"Submit"} /> 

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

            {op===Operation.UPDATE && <Modal title="Update a Vax" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div className={style["updateBox"]}>

                    <label htmlFor="">ID of facility to change: </label>
                    <input
                        type="text"
                        id="facilityID"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCustomId(e.target.value)}}
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

                    <label htmlFor="">Dose Iteration: </label>
                    <input
                        type="text"
                        id="doseIteration"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDoseIteration(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Date: </label>
                    <input
                        type="text"
                        id="date"
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

                    <label htmlFor="">Vax ID(SSN+doseIteration): </label>
                    <input
                        type="text"
                        id="vaxId"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCustomId(e.target.value)}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.DELETE_SUBMIT);}} children={"Delete"} /> 

                </div>
            
            )}/>}
        
        </div>
    );

}

function createVax(vax: Vax){

    /* Implement POST request */
    console.log("Creating vax:");
    console.log(vax);

}

function displayVax(vaxID: string){

    /* Implement GET request */
    console.log("Getting residence " + vaxID);

}

function updateVax(vax: Vax){

    /* Implement PUT request */
    console.log("Update residence:");
    console.log(vax);

}

function deleteVax(vaxID: string){
    /* Implement DELETE request */
    console.log("Delete residence: " + vaxID);
}