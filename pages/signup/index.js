import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });
import Signup from "@/components/Signup";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <main
      className={`flex h-screen items-center justify-center bg-light-bg dark:bg-dark-bg ${font.className}`}
    >
      <Signup />
      <Toaster />
    </main>
  );
}
