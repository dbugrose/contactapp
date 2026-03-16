import Image from "next/image";
import FormBox from "./components/FormBox";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans light:bg-white">
      <main className="grid-cols-2">
        <FormBox/>
      </main>
    </div>
  );
}
