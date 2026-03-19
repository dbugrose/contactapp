"use client"

import { Contact, Contacts } from "@/interfaces/interface";
import { AddContact, DeleteContact, EditContacts, GetContactsByUserId } from "@/lib/services";
import { getToken } from "@/lib/user-services";
import { Button, Label, TextInput, Table, TableHead, TableBody, TableCell, TableHeadCell, TableRow, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ContactsBox({
  contacts,
  setContacts
}: {
  contacts: Contacts[],
  setContacts: (c: Contacts[]) => void
}) {
  const [openModal, setOpenModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editId, setEditId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const id = user.id ?? user.userId;
        setUserId(id);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }

    const storedToken = getToken();
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (userId && token) {
      async function fetchContacts() {
        const fetchedContacts: any = await GetContactsByUserId(userId, token);
        setContacts(fetchedContacts);
      }
      fetchContacts();
    }
  }, [userId, token, setContacts]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditName(e.target.value);
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditEmail(e.target.value);
  }
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditPhone(e.target.value);
  }

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!userId || !token) return; // Wait for both to be set

  const update: Contacts = {
    id: editId,
    userId,
    name: editName,
    email: editEmail,
    phone: editPhone,
  };

  await EditContacts(update, token);

  const refreshed = await GetContactsByUserId(userId, token);
  setContacts([...refreshed]);
  await GetContactsByUserId(userId, token);
  setOpenModal(false);
}

  async function handleDelete(contact: Contacts) {
    if (!token || !userId) return;

    await DeleteContact(contact?.id, token);
    const newContacts = await GetContactsByUserId(userId, token);
    setContacts(newContacts);
  }

  return (
    <div className="shadow-md shadow-gray-300 flex flex-col gap-4 p-0">
      <div className="border-b-gray-400 border-b pt-10 pb-5 px-5 flex justify-between">
        <h1 className="text-2xl font-bold text-black!">All Contacts</h1>
        <h3 className="text-[#828282]">{contacts.length} Contacts</h3>
      </div>
      <div className="">
        <Table>
          <TableHead>
            <TableRow className="text-center">
              <TableHeadCell className="bg-transparent!">Name</TableHeadCell>
              <TableHeadCell className="bg-transparent!">Email</TableHeadCell>
              <TableHeadCell className="bg-transparent!">Phone</TableHeadCell>
              <TableHeadCell className="bg-transparent!">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {Array.isArray(contacts) &&
              contacts.map((contact) => (
                <TableRow key={contact.id} className="bg-transparent! text-center">
                  <TableCell className="whitespace-nowrap font-medium text-black">
                    {contact.name}
                  </TableCell>
                  <TableCell className="text-center text-black">{contact.email}</TableCell>
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
                      }}
                    />
                    <div
                      className="bg-red-600 w-7 h-7 rounded-md"
                      onClick={() => handleDelete(contact)}
                    ></div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <form className="text-black" onSubmit={handleSubmit}>
            <ModalHeader>Edit Contact</ModalHeader>
            <ModalBody>
              <div className="mb-2 block">
                <Label htmlFor="name" className="text-black!">Name</Label>
              </div>
              <TextInput
                placeholder="John Doe"
                value={editName}
                id="name"
                name="name"
                onChange={handleNameChange}
                required
                className="text-black!"
                shadow
              />
              <div className="mb-2 block">
                <Label htmlFor="email" className="text-black!">Email</Label>
              </div>
              <TextInput
                name="email"
                id="email"
                value={editEmail}
                placeholder="john.doe@example.com"
                onChange={handleEmailChange}
                required
                className="text-black!"
                shadow
              />
              <div className="mb-2 block">
                <Label htmlFor="phone" className="text-black!">Phone</Label>
              </div>
              <TextInput
                id="phone"
                value={editPhone}
                placeholder="+1 (555) 123-4567"
                onChange={handlePhoneChange}
                required
                shadow
                className="text-black!"
              />
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