
import { Button, Checkbox, Label, TextInput, Table, TableHead, TableBody, TableCell, TableHeadCell, TableRow } from "flowbite-react";


import Link from "next/link";

export default function ContactsBox() {
  return (
    <div className="shadow-md shadow-gray-300 flex flex-col gap-4 p-0">
        <div className="border-b-gray-400 border-b pt-10 pb-5 px-5 flex justify-between">
        <h1 className="text-2xl font-bold text-black!">Add New Contact</h1>
        <h2 className="text-[#828282]">0 contacts</h2>
        </div>
<div className="">
      <Table>
        <TableHead >
          <TableRow className="flex justify-between">
            <TableHeadCell className="bg-transparent!">Name</TableHeadCell>
            <TableHeadCell className="bg-transparent!">Email</TableHeadCell>
            <TableHeadCell className="bg-transparent!">Phone</TableHeadCell>
            <TableHeadCell className="bg-transparent!">Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
        </TableBody>
      </Table>
    </div>
    </div>
  );
}
