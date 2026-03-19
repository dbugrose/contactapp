"use client"

import React, { useState } from "react"
import { Contacts } from "@/interfaces/interface"
import { GetContactsByUserId, GetContactsBySearch } from "@/lib/services"
import { Navbar, NavbarBrand, TextInput } from "flowbite-react"

type NavlinksProps = {
  userId: number
  token: string
  setContacts: (c: Contacts[]) => void
}

const Navlinks = ({ userId, token, setContacts }: NavlinksProps) => {
  const [search, setSearch] = useState("")

  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!userId || !token) return

      if (search.trim() === "") {
        const all = await GetContactsByUserId(userId, token)
        setContacts(all)
      } else {
        const results = await GetContactsBySearch(search, token)
        setContacts(results)
      }
    }
  }

  return (
    <Navbar fluid rounded className="light:bg-white! dark:bg-white! border-b border-b-[#b0b0b0]!">
      <NavbarBrand>
        <img
          src={token ? "/assets/contactmanager.png" : "/assets/ContactFlow.png"}
          className="h-6 sm:h-9"
          alt="Logo"
        />
      </NavbarBrand>

      <div className="max-w-md relative">
        <TextInput
          id="searchContacts"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="light:bg-white! dark:bg-white! searchbar"
        />
      </div>
    </Navbar>
  )
}

export default Navlinks