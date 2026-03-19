"use client"

import { Contact, Contacts } from "@/interfaces/interface";
import { AddContact, GetContactsByUserId } from "@/lib/services";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

type FormBoxProps = {
  userId: number;
  token: string;
  contacts: Contacts[];
  setContacts: (c: Contacts[]) => void;
};

export default function FormBox({ userId, token, contacts, setContacts }: FormBoxProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId || !token) return;

    const contact: Contact = { userId, name, email, phone };
    await AddContact(contact, token);

    const refreshedContacts = await GetContactsByUserId(userId, token);
    setContacts(refreshedContacts);

    setName("");
    setEmail("");
    setPhone("");
  }
  return (
    <div className="shadow-md shadow-gray-300 p-10">
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 text-black!">
        <h1 className="text-2xl font-bold">Add New Contact</h1>
        <h2 className="text-[#6a6a6a]! mb-5">
          Fill in the details below to add a new contact to your list.
        </h2>

        <div className="mb-2 block">
          <Label htmlFor="name" className="text-black!">Name</Label>
          <TextInput
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-black!"
            shadow
          />
        </div>

        <div className="mb-2 block">
          <Label htmlFor="email" className="text-black!">Email</Label>
          <TextInput
            id="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black!"
            shadow
          />
        </div>

        <div className="mb-2 block">
          <Label htmlFor="phone" className="text-black!">Phone</Label>
          <TextInput
            id="phone"
            placeholder="1-111-123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="text-black!"
            shadow
          />
        </div>

        <Button type="submit" className="bg-[#6d6ae7]!">
          <span className="text-2xl p-3">+</span> Add Contact
        </Button>
      </form>
    </div>
  );
}