import SidePanel from "@/components/SidePanel";
import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });


export default function Home() {
  return (
    <main
      className={`bg-light-bg dark:bg-dark-bg flex items-center jusify-center gap-y-8 h-screen w-screen ${font.className}`}
    >
        <SidePanel />
    </main>
  );
}