import { Contact, Contacts } from "@/interfaces/interface";

let url = "https://contactmanagerdor-a2bfb6cehkdxg2bp.westus3-01.azurewebsites.net/"

url = "http://localhost:5218/"

export async function AddContact(contact:Contact) : Promise<Contact> {

    const res = await fetch(url + "Contact/AddContact", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
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

export async function GetContacts () : Promise<Contacts[]> {
    const res = await fetch(url + "Contact/GetContacts");
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts[] = await res.json();
    console.log(data)
    return data;
}

export async function EditContacts (contact: Contact) {
    const res = await fetch(url + "Contact/UpdateContact", {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
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

export async function DeleteContact (id: number) {
    const res = await fetch(url + `Contact/DeleteContact/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        return data;
    }
    const data : Contacts = await res.json();
    return data;
}