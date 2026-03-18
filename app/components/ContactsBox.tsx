
"use client"

import { Contact, Contacts } from "@/interfaces/interface";
import { AddContact, DeleteContact, EditContacts, GetContacts } from "@/lib/services";
import { Button, Checkbox, Label, TextInput, Table, TableHead, TableBody, TableCell, TableHeadCell, TableRow, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContactsBox() {
  const [contacts, setContacts] = useState<Contacts[] | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editId, setEditId] = useState<number>(0);


  let contact: any;

  useEffect(() => {
    async function onload() {
      const contacts: any = await GetContacts();
      setContacts(contacts);


    } onload();
  }, [])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditName(e.target.value)
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditEmail(e.target.value)
  }
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditPhone(e.target.value)
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const update: Contacts = {
    id: editId,
    name: editName,
    email: editEmail,
    phone: editPhone,
  };

  await EditContacts(update);

  const refreshed = await GetContacts();
  setContacts(refreshed);

  setOpenModal(false);
}


  async function handleDelete(contact: Contacts) {
    const deleted = await DeleteContact(contact?.id);
    const newContacts = await GetContacts();
    await setContacts(newContacts);
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
              (contacts.map((contact) => (
                <TableRow key={contact.id} className="bg-transparent! text-center">
                  <TableCell className="whitespace-nowrap font-medium text-black">
                    {contact.name}
                  </TableCell>
                  <TableCell className="text-center text-black">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-black">{contact.phone}</TableCell>
                  <TableCell className="text-black flex justify-around">
                    <img
                      src="/assets/editicon.png"
                      alt="edit icon"
                      className="w-7 h-7"
                      onClick={() => {
                        setOpenModal(true);
                        setEditId(contact.id);
                        setEditName(contact.name);
                        setEditEmail(contact.email);
                        setEditPhone(contact.phone);
                      }} />
                    <div
                      className="bg-red-600 w-7 h-7 rounded-md"
                      onClick={() => handleDelete(contact)}>
                    </div>
                  </TableCell>

                </TableRow>
              )))}
          </TableBody>
        </Table>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <form className="text-black" onSubmit={handleSubmit}>
            <ModalHeader>Edit Contact</ModalHeader>
            <ModalBody>
              <div className="mb-2 block ">
                <Label htmlFor="name" className="text-black!">Name</Label>
              </div>
              <TextInput placeholder="John Doe"  value={editName} id="name" name="name" onChange={handleNameChange} required className="text-black!" shadow />
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" className="text-black!">Email</Label>
                </div>
                <TextInput name="email" id="email"  value={editEmail} placeholder="john.doe@example.com" onChange={handleEmailChange} required className="text-black!" shadow />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone"  className="text-black!">Phone</Label>
                </div>
                <TextInput id="phone" value={editPhone} placeholder="+1 (555) 123-4567" onChange={handlePhoneChange} required shadow className="text-black!" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Edit</Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </Modal>


      </div>
    </div>
  );
}
