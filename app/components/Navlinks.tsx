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
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </NavbarBrand>
            <div className="max-w-md light:bg-white! dark:bg-white!">
                <TextInput id="email4" type="email" placeholder="name@flowbite.com" required className="light:bg-white! dark:bg-white!" />
                </div>

        </Navbar>
    )
}


export default Navlinks