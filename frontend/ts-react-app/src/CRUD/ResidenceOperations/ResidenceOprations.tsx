import { useState, useEffect } from "react";
import { Residence } from "../../Templates/InterfaceModels/InterfaceModels";
import { Operation } from "../FacilityOperations/FacilityOperations";
import style from "../FacilityOperations/FacilityOpeartions.module.css";
import Button from "../../Templates/Button/Button";
import Modal from "../../Templates/Modal/Modal";

export default function ResidenceOperations(){

    const [op, setOp] = useState<Operation>(Operation.UNSELECTED);
    const [residence, setResidence] = useState<Residence>();
    const [typeEmpty, setTypeEmpty] = useState<boolean>(true);

    /* Residence Attributes */
    const [type, setType] = useState<number>();
    const [nbOfBedroom, setNbBedroom] = useState<number>(0);
    const [residenceID, setResidenceID] = useState<number>();
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [phone, setPhone] = useState<number>(0);

    useEffect(()=>{

        if(op === Operation.CREATE_SUBMIT){
            const value: Residence={
                id: undefined,
                typeId: type || 0,
                numberOfBedroom: nbOfBedroom,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                phoneNumber: phone,
                
            }

            setResidence(value);
            residence !== undefined && createResidence(residence);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.READ_SUBMIT){
            residenceID !== undefined && displayResidence(residenceID);
            setOp(Operation.UNSELECTED);
        }else if(op === Operation.UPDATE_SUBMIT){
            const value: Residence={
                id: undefined,
                typeId: type || 0,
                numberOfBedroom: nbOfBedroom,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                phoneNumber: phone,
                
            }

            setResidence(value);
            residence !== undefined && updateResidence(residence);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.DELETE_SUBMIT){
            residenceID !== undefined && deleteResidence(residenceID)
        }

    },[residence, nbOfBedroom, op,address, city, province, postalCode, phone]);


    return(
        <div>
            <h1>ResidenceOperations</h1>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.CREATE)}}>CREATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.READ)}}>READ</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.UPDATE)}}>UPDATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.DELETE)}}>DELETE</Button></div>
        
            {op===Operation.CREATE && <Modal title="Create a Residence" unsetModal={()=>setOp(Operation.UNSELECTED)} children={(
            
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

                    <label htmlFor="">Address: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setAddress(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">city: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCity(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">province: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setProvince(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">postalCode: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPostalCode(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">phoneNumber: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPhone(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Number of bedroom: </label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setNbBedroom(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.CREATE_SUBMIT);}} children={"Submit"} /> 

                </div>
            
            )}/>}


            {op===Operation.READ && <Modal title="Get a Residence" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div>

                    <label htmlFor="">Residence ID: </label>
                    <input
                        type="text"
                        id="facilityID"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setResidenceID(Number(e.target.value))}}
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

            {op===Operation.UPDATE && <Modal title="Update a Facility" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div className={style["updateBox"]}>

                    <label htmlFor="">ID of facility to change: </label>
                    <input
                        type="text"
                        id="facilityID"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setResidenceID(Number(e.target.value))}}
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

                    <label htmlFor="">Address: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setAddress(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">city: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCity(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">province: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setProvince(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">postalCode: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPostalCode(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">phoneNumber: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPhone(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Number of bedroom: </label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setNbBedroom(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.UPDATE_SUBMIT);}} children={"Update"} /> 

                </div>
            
            )}/>}

            {op===Operation.DELETE && <Modal title="Delete a Facility" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div>

                    <label htmlFor="">Facility ID: </label>
                    <input
                        type="text"
                        id="facilityID"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setResidenceID(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.DELETE_SUBMIT);}} children={"Delete"} /> 

                </div>
            
            )}/>}
        
        </div>
    );

}

function createResidence(residence: Residence){

    /* Implement POST request */
    console.log("Creating residence:");
    console.log(residence);

}

function displayResidence(residenceID: number){

    /* Implement GET request */
    console.log("Getting residence " + residenceID);

}

function updateResidence(residence: Residence){

    /* Implement PUT request */
    console.log("Update residence:");
    console.log(residence);

}

function deleteResidence(residenceID: number){
    /* Implement DELETE request */
    console.log("Delete residence: " + residenceID);
}