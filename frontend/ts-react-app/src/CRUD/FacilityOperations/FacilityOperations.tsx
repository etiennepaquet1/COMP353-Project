import { useEffect, useState } from "react";
import Button from "../../Templates/Button/Button";
import style from "./FacilityOpeartions.module.css";
import Modal from "../../Templates/Modal/Modal";
import { Facility, FacilityType } from "../../Templates/InterfaceModels/InterfaceModels";

export enum Operation { 
    CREATE,
    READ,
    UPDATE,
    DELETE,
    CREATE_SUBMIT,
    UPDATE_SUBMIT,
    READ_SUBMIT,
    UNSELECTED,
    DELETE_SUBMIT
}


export default function FacilityOperations(){

    const [op, setOp] = useState<Operation>(Operation.UNSELECTED);
    const [facility, setFacility] = useState<Facility>();
    const [typeEmpty, setTypeEmpty] = useState<boolean>(true);


    /* Facility Attributes */
    const [type, setType] = useState<FacilityType>();
    const [facilityID, setFacilityID] = useState<number>();
    const [name, setName] = useState<string>();
    const [manager, setManager] = useState<number>();
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [phone, setPhone] = useState<number>(0);
    const [webAddress, setWebAddress] = useState<string>("");

    const testArray: Array<number>=[1,2,3,4];

    useEffect(()=>{

        if(op === Operation.CREATE_SUBMIT){
            const value: Facility={
                id: undefined,
                typeId: type?.id || 0,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                phoneNumber: phone,
                webAddress: webAddress
            }

            setFacility(value);
            facility !== undefined && createFacility(facility);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.READ_SUBMIT){
            facilityID !== undefined && displayFacility(facilityID);
        }else if(op === Operation.UPDATE_SUBMIT){
            const value: Facility={
                id: undefined,
                typeId: type?.id || 0,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                phoneNumber: phone,
                webAddress: webAddress
            }

            setFacility(value);
            facility !== undefined && updateFacility(facility);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.DELETE_SUBMIT){
            facilityID !== undefined && deleteFacility(facilityID)
        }

    },[facility, facilityID, op,address, city, province, postalCode, phone, webAddress]);

    return(
        <div>
            <h1>FacilityOperations</h1>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.CREATE)}}>CREATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.READ)}}>READ</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.UPDATE)}}>UPDATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.DELETE)}}>DELETE</Button></div>
        
            {op===Operation.CREATE && <Modal title="Create a Facility" unsetModal={()=>setOp(Operation.UNSELECTED)} children={(
            
                <div className={style["createBox"]}>

                    <div className={style['dropdown']}>
                        <div className={style['dropDiv']} onClick={()=>{setTypeEmpty(true)}}>Facility Type</div>
                        {typeEmpty && <div className={style['dropContent']}>
                            <div onClick={()=>{setType({id:1,name:"hospital"}); setTypeEmpty(false)}}>Hospital</div>
                            <div onClick={()=>{setType({id:2,name:"CLSC"}); setTypeEmpty(false)}}>CLSC</div>
                            <div onClick={()=>{setType({id:3,name:"Pharmacy"}); setTypeEmpty(false)}}>Pharmacy</div>
                            <div onClick={()=>{setType({id:4,name:"Special Installment"}); setTypeEmpty(false)}}>Special Installment</div>
                        </div>}
                    </div>

                    <label htmlFor="">Name: </label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <br/>

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

                    <label htmlFor="">webAddress: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setWebAddress(e.target.value)}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.CREATE_SUBMIT);}} children={"Submit"} /> 

                </div>
            
            )}/>}


            {op===Operation.READ && <Modal title="Get a Facility" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
                <div>

                    <label htmlFor="">Facility ID: </label>
                    <input
                        type="text"
                        id="facilityID"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setFacilityID(Number(e.target.value))}}
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
                        onChange={(e)=>{setFacilityID(Number(e.target.value))}}
                    />
                    <br/>
                    <br/>

                    <div className={style['dropdown']}>
                        <div className={style['dropDiv']} onClick={()=>{setTypeEmpty(true)}}>Facility Type</div>
                        {typeEmpty && <div className={style['dropContent']}>
                            <div onClick={()=>{setType({id:1,name:"hospital"}); setTypeEmpty(false)}}>Hospital</div>
                            <div onClick={()=>{setType({id:2,name:"CLSC"}); setTypeEmpty(false)}}>CLSC</div>
                            <div onClick={()=>{setType({id:3,name:"Pharmacy"}); setTypeEmpty(false)}}>Pharmacy</div>
                            <div onClick={()=>{setType({id:4,name:"Special Installment"}); setTypeEmpty(false)}}>Special Installment</div>
                        </div>}
                    </div>

                    <label htmlFor="">Name: </label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <br/>

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

                    <label htmlFor="">webAddress: </label>
                    <input
                        type="text"
                        id="address"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setWebAddress(e.target.value)}}
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
                        onChange={(e)=>{setFacilityID(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.DELETE_SUBMIT);}} children={"Delete"} /> 

                </div>
            
            )}/>}
        
        </div>
    );

}


function createFacility(facility: Facility){

    /* Implement POST request to create new facility */
    console.log("Creating facility:");
    console.log(facility);

}

function displayFacility(facilityID: number){

    /* Implement GET request to display given facility */
    console.log("Getting facility " + facilityID);

}

function updateFacility(facility: Facility){

    /* Implement PUT request to update a facility */
    console.log("Update facility:");
    console.log(facility);

}

function deleteFacility(facilityID: number){
    /* Implement DELETE request to delete a facility */
    console.log("Delete facility: " + facilityID);
}