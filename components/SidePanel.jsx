"use client";
import { useState } from "react";
import Link from "next/link";
import BoardsNav from "./BoardsNav";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import ItemNav from "./ItemNav";
export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidePanel = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <>
      <aside
        className={`hidden border-r-2 light:border-light-lines dark:border-dark-lines md:flex bg-white dark:bg-dark-grey h-screen min-w-60 lg:min-w-80 ${isOpen ? "" : "!hidden"} flex-col items-center py-8 transition-all duration-500 z-20`}
      >
        <Link href="/boards">
          <Image
            src={"/images/logo-dark.svg"}
            alt="Logo-kan-ban"
            width={150}
            height={26}
            className="mb-14"
          />
        </Link>
        <BoardsNav />
        <ThemeToggle />
        <ItemNav onClick={toggleSidePanel}>
          <Image
            src={"/images/icon-hide-sidebar.svg"}
            width={18}
            height={18}
            alt="Hide Sidebar Button"
            className={`group-hover:!brightness-200 transition-all duration-300`}
          />
          Hide Sidebar
        </ItemNav>
      </aside>
      <button
        onClick={toggleSidePanel}
        className={`hidden md:block absolute bottom-8 left-80 ${isOpen ? "-translate-x-96" : "-translate-x-80"} bg-purple rounded-r-full text-white transition-all duration-1000 p-5 z-10`}
      >
        <Image
          src={"/images/icon-show-sidebar.svg"}
          width={18}
          height={18}
          alt="Show Sidebar Icon."
          className={`group-hover:!brightness-200 transition-all duration-300`}
        />
      </button>
    </>
  );
}
