import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });
import Login from "@/components/Login";
export default function Home() {

  return (
    <main
      className={`bg-light-bg dark:bg-dark-bg flex items-center justify-center h-screen ${font.className}`}
    >
      <Login />
    </main>
  );
}