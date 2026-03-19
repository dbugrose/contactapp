"use client"

import Image from "next/image";
import FormBox from "./components/FormBox";
import ContactsBox from "./components/ContactsBox";
import Navlinks from "./components/Navlinks";
import { Contacts } from "@/interfaces/interface"
import { GetContactsByUserId } from "@/lib/services"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ParentComponent from "./components/ParentComponent";


export default function Home() {
    const [contacts, setContacts] = useState<Contacts[]>([])
    const router = useRouter();

  
  return (
    <>
        <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans light:bg-white">
       <ParentComponent/>
    </div>
    </>
  );
}
