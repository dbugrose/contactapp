"use client"

import FormBox from "./FormBox";
import ContactsBox from "./ContactsBox";
import { useState, useEffect } from "react";
import { Contacts } from "@/interfaces/interface";
import { GetContactsByUserId } from "@/lib/services";
import { getToken } from "@/lib/user-services";
import Navlinks from "./Navlinks";
import { redirect } from "next/dist/server/api-utils";
import router, { useRouter } from "next/navigation";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id ?? user.userId);
    }
    const storedToken = getToken();
    if (storedToken) setToken(storedToken);
    if(!storedToken)
    { router.push("/login")}
  }
  , []);

  useEffect(() => {
    if (userId && token) {
      async function fetchContacts() {
        const fetchedContacts = await GetContactsByUserId(userId, token);
        setContacts(fetchedContacts);
      }
      fetchContacts();
    }
  }, [userId, token]);

  return (
    <><Navlinks userId={userId} token={token} setContacts={setContacts} />

    <div className="gap-5 grid grid-cols-[400px_1fr]">
      <FormBox userId={userId} token={token} contacts={contacts} setContacts={setContacts} />
      <ContactsBox contacts={contacts} setContacts={setContacts} />
    </div>
    </>
  );
}