import Image from "next/image";
import FormBox from "./components/FormBox";
import ContactsBox from "./components/ContactsBox";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans light:bg-white">
      <main className="gap-5 grid grid-cols-[400px_1fr]">
        <div className="grid"><FormBox/></div>
        <div className="grid"><ContactsBox/></div>
      </main>
    </div>
  );
}
