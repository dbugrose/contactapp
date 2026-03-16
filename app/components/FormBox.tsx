
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";

export default function FormBox() {
  return (
    <div className="shadow-md shadow-gray-300 p-10">
    <form className="flex max-w-md flex-col gap-4">
      <div className="text-black">
        <h1 className="text-2xl font-bold">Add New Contact</h1>
        <h2 className="text-[#6a6a6a]! mb-5">Fill in the details below to add a new contact to your list.</h2>
        <div className="mb-2 block">
          <Label htmlFor="name" className="text-black!">Name</Label>
        </div>
        <TextInput id="name" type="name" placeholder="John Doe" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" className="text-black!">Email</Label>
        </div>
        <TextInput id="email" type="email" placeholder="john.doe@example.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" className="text-black!">Phone</Label>
        </div>
        <TextInput id="phone" type="phone" placeholder="+1 (555) 123-4567" required shadow />
      </div>
      <Button type="submit" className="bg-[#6d6ae7]!"><span className="text-2xl p-3">+</span> Add Contact</Button>
    </form>
    </div>
  );
}
