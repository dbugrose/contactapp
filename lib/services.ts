import { Contact, Contacts } from "@/interfaces/interface";

let url = "https://contactmanagerdor-a2bfb6cehkdxg2bp.westus3-01.azurewebsites.net/"

// const url = "http://localhost:5218/"

export async function AddContact(contact:Contact, token: string) : Promise<Contact> {

    const res = await fetch(url + "Contact/AddContact", {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token

        },    body: JSON.stringify(contact),
    });
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts = await res.json();
    return data;
}

export async function GetContactsByUserId (id: number, token: string) : Promise<Contacts[]> {
    console.log("this is the id :" + id)
    const res = await fetch(url + `Contact/GetContactsByUserId/${id}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },})
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts[] = await res.json();
    console.log(data)
    return data;
}

export async function GetContactsBySearch (search: string, token: string) : Promise<Contacts[]> {
    const res = await fetch(url + `Contact/GetContactBySearch/${search}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },})
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts[] = await res.json();
    console.log(data)
    return data;
}

export async function EditContacts (contact: Contact, token: string) {
    const res = await fetch(url + "Contact/UpdateContact", {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },    body: JSON.stringify(contact),
    });
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts = await res.json();
    return data;
}

export async function DeleteContact (id: number, token: string) {
    const res = await fetch(url + `Contact/DeleteContact/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },       
    });
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts = await res.json();
    return data;
}