import { useState, useEffect } from "react";
import { Person } from "../../Templates/InterfaceModels/InterfaceModels";
import { Operation } from "../FacilityOperations/FacilityOperations";
import style from "../FacilityOperations/FacilityOpeartions.module.css";
import Button from "../../Templates/Button/Button";
import Modal from "../../Templates/Modal/Modal";

export default function PersonOperations(){

    const [op, setOp] = useState<Operation>(Operation.UNSELECTED);
    const [person, setPerson] = useState<Person>();
    const [typeEmpty, setTypeEmpty] = useState<boolean>(true);

    /* Person Attributes */
    const [type, setType] = useState<number>();
    const [ssn, setSSN] = useState<number>(0);
    const [emailAddress, setEmailAddress] = useState<string>();
    const [lName, setLName] = useState<string>("");
    const [fName, setFName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [medicareNumber, setMedNumber] = useState<number>();
    const [primaryResidenceId, setPrimaryResidenceId] = useState<number>();
    const [roleId, setRoleId] = useState<number>();
    const [citizenship, setCitzenship] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [phone, setPhone] = useState<number>(0);

    useEffect(()=>{

        if(op === Operation.CREATE_SUBMIT){
            const value: Person={
                SSN: ssn,
                emailAddress: emailAddress || "", 
                lastName: lName, 
                firstName: fName, 
                dateOfBirth: dob, /* date data type in db */
                telephoneNumber: phone, 
                citizenship: citizenship, 
                medicareNumber: medicareNumber || 0, 
                primaryResidenceId: primaryResidenceId || 0, 
                roleId: roleId || 0,
            }

            setPerson(value);
            person !== undefined && createPerson(person);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.READ_SUBMIT){
            ssn !== undefined && displayPerson(ssn);
            setOp(Operation.UNSELECTED);
        }else if(op === Operation.UPDATE_SUBMIT){
            const value: Person={
                SSN: ssn,
                emailAddress: emailAddress || "", 
                lastName: lName, 
                firstName: fName, 
                dateOfBirth: dob, /* date data type in db */
                telephoneNumber: phone, 
                citizenship: citizenship, 
                medicareNumber: medicareNumber || 0, 
                primaryResidenceId: primaryResidenceId || 0, 
                roleId: roleId || 0,
            }

            setPerson(value);
            person !== undefined && updatePerson(person);
            setOp(Operation.UNSELECTED);
            
        }else if(op === Operation.DELETE_SUBMIT){
            ssn !== undefined && deletePerson(ssn);
            setOp(Operation.UNSELECTED);
        }

    },[person, op, ssn, emailAddress, lName, fName, dob, phone, citizenship, medicareNumber, primaryResidenceId, roleId]);

    return(
        <div>
            <h1>PersonOperations</h1>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.CREATE)}}>CREATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.READ)}}>READ</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.UPDATE)}}>UPDATE</Button></div>
            <div className={style["btn"]}><Button onClick={()=>{setOp(Operation.DELETE)}}>DELETE</Button></div>
        
            {op===Operation.CREATE && <Modal title="Create a Person" unsetModal={()=>setOp(Operation.UNSELECTED)} children={(
            
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

                    <label htmlFor="">Email Address: </label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setEmailAddress(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">First Name: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setFName(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Last Name: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setLName(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Date Of Birth: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDob(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Phone: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPhone(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Citizenship: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCitzenship(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Medicare: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setMedNumber(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Primary Residence ID: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPrimaryResidenceId(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Role ID: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setRoleId(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.CREATE_SUBMIT);}} children={"Submit"} /> 

                </div>
            
            )}/>}


            {op===Operation.READ && <Modal title="Get a Person" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
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

            {op===Operation.UPDATE && <Modal title="Update a Person" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
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

                    <label htmlFor="">Email Address: </label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setEmailAddress(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">First Name: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setFName(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Last Name: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setLName(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Date Of Birth: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setDob(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Phone: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPhone(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Citizenship: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setCitzenship(e.target.value)}}
                    />
                    <br/>

                    <label htmlFor="">Medicare: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setMedNumber(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Primary Residence ID: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setPrimaryResidenceId(Number(e.target.value))}}
                    />
                    <br/>

                    <label htmlFor="">Role ID: </label>
                    <input
                        type="text"
                        id="date"
                        autoComplete="off"
                        required
                        onChange={(e)=>{setRoleId(Number(e.target.value))}}
                    />
                    <br/>

                    <Button onClick={()=>{setOp(Operation.UPDATE_SUBMIT);}} children={"Update"} /> 

                </div>
            
            )}/>}


            {op===Operation.DELETE && <Modal title="Delete a Vax" unsetModal={()=>setOp(Operation.UNSELECTED)}  children={(
            
            <div>

                <label htmlFor="">SSN: </label>
                <input
                    type="text"
                    id="vaxId"
                    autoComplete="off"
                    required
                    onChange={(e)=>{setSSN(Number(e.target.value))}}
                />
                <br/>

                <Button onClick={()=>{setOp(Operation.DELETE_SUBMIT);}} children={"Delete"} /> 

            </div>
        
        )}/>}
        
        </div>
    );

}


function createPerson(p: Person){

    /* Implement POST request to create new person */
    console.log("Creating person:");
    console.log(p);

}

function displayPerson(ssn: number){

    /* Implement GET request to display given person */
    console.log("Getting person " + ssn);

}

function updatePerson(p: Person){

    /* Implement PUT request to update a person */
    console.log("Update person:");
    console.log(p);

}

function deletePerson(ssn: number){
    /* Implement DELETE request to delete a person */
    console.log("Delete person: " + ssn);
}