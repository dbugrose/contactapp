"use client"

import Image from "next/image";
import { Contacts } from "@/interfaces/interface"
import { GetContactsByUserId } from "@/lib/services"
import { useState, useEffect } from "react";
import Navlinks from "@/app/components/Navlinks";
import { LoginBox } from "@/app/components/LoginBox";
import { loggedInData, getToken } from "@/lib/user-services";
import { redirect } from "next/navigation";

export default function Home() {
  const [contacts, setContacts] = useState<Contacts[]>([])
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState<number>(0)

  return (
    <>
    <Navlinks userId={userId} token={token} setContacts={setContacts} />
      <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans light:bg-white">
        <LoginBox />
      </div>
    </>
  );
}
