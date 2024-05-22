import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`${font.className}`}
    >
      <h1 className="heading-xl">Heading (XL)</h1>
    </main>
  );
}
