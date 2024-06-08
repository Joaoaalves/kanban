import Panel from "@/components/Panel";
import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });
import { authUser } from "@/lib/clientAuth";

export const getServerSideProps = async (context) => authUser(context)

export default function Home() {
  return (
    <Panel>
    </Panel>
  );
}
