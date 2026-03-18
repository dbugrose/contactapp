"use server"
import { Button, Label, TextInput } from 'flowbite-react'
import { HiOutlineSearch } from "react-icons/hi"
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react/components/Navbar'
import React from 'react'

const Navlinks = async () => {
    return (
        <Navbar fluid rounded className="light:bg-white! dark:bg-white!">
            <NavbarBrand>
                <img src="/assets/ContactFlow.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-black!">Contact Manager</span>
            </NavbarBrand>
            <div className="max-w-md light:bg-white! dark:bg-white!"><img src="/assets/searchIcon.png" alt="search icon" className="absolute right-45 top-4 max-w-18 max-h-8 z-2" />
                <TextInput id="email4" type="email" placeholder="    Search contacts..." required className="light:bg-white! dark:bg-white! searchbar" />
                </div>

        </Navbar>
    )
}


export default Navlinks