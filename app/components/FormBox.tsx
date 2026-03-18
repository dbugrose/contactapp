"use client"

import { AddContact, GetContacts } from "@/lib/services";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { Contact, Contacts } from "@/interfaces/interface";
import { FormEvent, ReactEventHandler, useEffect, useState } from "react";

export default function FormBox() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [contacts, setContacts] = useState<Contacts[]>([])
  const [openModal, setOpenModal] = useState(false);



  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value)
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    const contact: Contact = {
      name: name,
      email: email,
      phone: phone,
    };
    const updatedContacts : any = await AddContact(contact);
     await setContacts(updatedContacts);
     GetContacts();
  }

    useEffect(()=> {
  async function submission(){
  const contacts : any = await GetContacts();
  await setContacts(contacts);
  }submission();
  }, [])

  return (
    <div className="shadow-md shadow-gray-300 p-10">
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 text-black!">
        <div className="text-black">
          <h1 className="text-2xl font-bold">Add New Contact</h1>
          <h2 className="text-[#6a6a6a]! mb-5">Fill in the details below to add a new contact to your list.</h2>
          <div className="mb-2 block ">
            <Label htmlFor="name" className="text-black!">Name</Label>
          </div>
          <TextInput placeholder="John Doe" id="name" name="name" onChange={handleNameChange} required className="text-black!" shadow  />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" className="text-black!">Email</Label>
          </div>
          <TextInput name="email" id="email" placeholder="john.doe@example.com" onChange={handleEmailChange} required className="text-black!" shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" className="text-black!">Phone</Label>
          </div>
          <TextInput id="phone" placeholder="+1 (555) 123-4567" onChange={handlePhoneChange} required shadow className="text-black!" />
        </div>
        <Button type="submit" className="bg-[#6d6ae7]!"><span className="text-2xl p-3">+</span> Add Contact</Button>
      </form>
    </div>
  );
}

