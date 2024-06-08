"use client";
import { useState } from "react";
import Link from "next/link";
import BoardsNav from "./BoardsNav";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Logo from "./Logo";
import ItemNav from "./ItemNav";

import { Plus_Jakarta_Sans } from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });


export default function Panel({children}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidePanel = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <div className={`grid grid-rows-1 overflow-y-hidden max-h-screen max-w-screen items-start gap-y-8 bg-light-bg dark:bg-dark-bg ${font.className}`}
      style={{
        gridTemplateColumns: isOpen ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)'
      }}
    >
      <aside
        className={`light:border-light-lines hidden h-screen min-w-60 border-r-2 bg-white dark:border-dark-lines dark:bg-dark-grey md:flex lg:min-w-80 ${isOpen ? "" : "!hidden"} z-100 flex-col items-center py-8 transition-all duration-500`}
      >
        <Link href="/boards">
          <Logo width={150} height={26} className="mb-14" />
        </Link>
        <BoardsNav />
        <ThemeToggle />
        <ItemNav onClick={toggleSidePanel}>
          <Image
            src={"/images/icon-hide-sidebar.svg"}
            width={18}
            height={18}
            alt="Hide Sidebar Button"
            className={`transition-all duration-300 group-hover:!brightness-200`}
          />
          Hide Sidebar
        </ItemNav>
      </aside>
      <button
        onClick={toggleSidePanel}
        className={`absolute bottom-8 left-80 hidden md:block ${isOpen ? "-translate-x-96" : "-translate-x-80"} z-10 rounded-r-full bg-purple p-5 text-white transition-all duration-1000`}
      >
        <Image
          src={"/images/icon-show-sidebar.svg"}
          width={18}
          height={18}
          alt="Show Sidebar Icon."
          className={`transition-all duration-300 group-hover:!brightness-200`}
        />
      </button>
      {children}
    </div>
  );
}