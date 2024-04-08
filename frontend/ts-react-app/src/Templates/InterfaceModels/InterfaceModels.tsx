

export interface Facility{
    id: number | undefined,
    typeId: number,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    phoneNumber: number,
    webAddress: string

}

export interface FacilityType{

    id: number,
    name: string;

}

export interface Residence{
    id: number | undefined,
    typeId: number,
    numberOfBedroom: number,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    phoneNumber: number,
}

export interface Vax{
    SSN: number,
    doseIteration: number,
    date: string, /* datetime datatype in db */
    typeId: number,
}

export interface Person{
    SSN: number,
    emailAddress: string, 
    lastName: string, 
    firstName: string, 
    dateOfBirth: string, /* date datatype in db */
    telephoneNumber: number, 
    citizenship: string, 
    medicareNumber: number, 
    primaryResidenceId: number, 
    roleId: number,
}

export interface Infection{
    id: number,
    typeId: number,
    date: string, /* date datatype in db */
    SSN: number,
}