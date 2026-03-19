"use client"
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ToastComponent from "./ToastComponent";
import { useRouter } from "next/navigation";
import { Token } from "@/interfaces/interface";
import { createAccount, login, getUserByUsername, loggedInData } from "@/lib/user-services";
import { GetContactsByUserId } from "@/lib/services";

export function LoginBox() {
  const [passwordView, setPasswordView] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [switchBool, setSwitchBool] = useState(true);

  const router = useRouter(); 
  const { push } = useRouter(); 
  const handleSwitch = () => setSwitchBool(!switchBool);

  const handleSubmit = async () => {
    const user = {
      username,
      password
    }
    if (switchBool) {
      const result = await createAccount(user);
      alert(result ? "Account Created" : "Username already exists");
    }
    else {
      const token: Token | null = await login(user);
      console.log(token?.token)

      if (token != null ) {
        localStorage.setItem("token", token.token);
        const user = await getUserByUsername(username)
        push('/');

      } else {
        alert("Login failed - did you enter your information correctly?");
      }
    }
  }

  function handleTogglePW() {
    setPasswordView(prev => !prev);
  }
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <ToastComponent />
      <form className="flex max-w-md flex-col gap-4 shadow-lg shadow-gray-300 bg-white! p-10">
        <div>
          <h1 className="text-center! text-2xl font-bold! text-black!">Sign In</h1>
          <h2 className="text-gray-600! subtext mb-5">Enter your credentials to access your workspace.</h2>
          <div className="mb-2 block">
            <Label htmlFor="email1">Email or Username</Label>
          </div>
          <TextInput id="email1" onChange={(e) => setUsername(e.target.value)} placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className=""><TextInput id="password" type={passwordView ? "text" : "password"} required onChange={(e) => setPassword(e.target.value)} /><img src="/assets/eye.png" alt="toggle password icon" className="max-w-7 max-h-7 absolute z-2 -translate-y-9 translate-x-60" onClick={handleTogglePW} /></div>
        </div>
        <p className={!wrongPassword ? "hidden" : "text-red-600 text-xs font-bold"}>The password you entered is incorrect. Please try again.</p>
        <div className="flex items-center gap-2 my-5 justify-between">
          <div className="items-center"><Checkbox id="remember" /> <Label htmlFor="remember" className="text-xs">Keep me signed in</Label></div>
          <p className="text-[#6d6ae7]! text-xs font-bold">Forgot Password?</p>
        </div>
        <Button onClick={handleSwitch} color="light">{switchBool ? "Already have an account?" : "Don't have an account?"}</Button>
        <Button onClick={handleSubmit} className="bg-[#6d6ae7]!">Sign In to Dashboard {">"} </Button>
      </form>
    </div>
  );
}
