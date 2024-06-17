import Image from "next/image";

export default function Logo({ width = 200, height = 34, className }) {
  return (
    <>
      <Image
        src={"/images/logo-light.svg"}
        width={width}
        height={height}
        alt="Logo Kanban"
        className={`hidden dark:block ${className}`}
      />

      <Image
        src={"/images/logo-dark.svg"}
        width={width}
        height={height}
        alt="Logo Kanban"
        className={`dark:hidden ${className}`}
      />
    </>
  );
}
