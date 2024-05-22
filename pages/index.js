import { Inter } from "next/font/google";
const font = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`${font.className}`}
    >
    </main>
  );
}
