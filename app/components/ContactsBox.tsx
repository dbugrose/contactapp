
"use client"

import { Contacts } from "@/interfaces/interface";
import { AddContact, DeleteContact, GetContacts } from "@/lib/services";
import { Button, Checkbox, Label, TextInput, Table, TableHead, TableBody, TableCell, TableHeadCell, TableRow } from "flowbite-react";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContactsBox() {
  const [contacts, setContacts] = useState<Contacts[] | null>(null);
  let contact : any;
  useEffect(()=> {
  async function onload(){
  const contacts : any = await GetContacts();
  setContacts(contacts);
  }onload();
  }, [])
  console.log("contacts:", contacts);

  async function handleDelete(contact: Contacts) {
    const deleted = await DeleteContact(contact?.id);
    const newContacts = await GetContacts();
    setContacts(newContacts);
  }

  return (
    <div className="shadow-md shadow-gray-300 flex flex-col gap-4 p-0">
        <div className="border-b-gray-400 border-b pt-10 pb-5 px-5">
        <h1 className="text-2xl font-bold text-black!">Add New Contact</h1>
        <h2 className="text-[#828282]"></h2>
        </div>
<div className="">
      <Table>
        <TableHead >
          <TableRow className="text-center">
            <TableHeadCell className="bg-transparent!">Name</TableHeadCell>
            <TableHeadCell className="bg-transparent!">Email</TableHeadCell>
            <TableHeadCell className="bg-transparent!">Phone</TableHeadCell>
            <TableHeadCell className="bg-transparent!">Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
        {Array.isArray(contacts) && 
        (contacts.map((contact, index) => (
            <TableRow key = { index }  className="bg-transparent! text-center">
              <TableCell className="whitespace-nowrap font-medium text-black">
                {contact.name}
              </TableCell>
              <TableCell className="text-center text-black">
                {contact.email}
              </TableCell>
              <TableCell className="text-black">{contact.phone}</TableCell>
              <TableCell className="text-black"><span></span><span><div className="bg-red-600 max-w-7 min-h-7 rounded-md" onClick={() => handleDelete(contact)}></div></span></TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    
    </div>
    </div>
  );
}
