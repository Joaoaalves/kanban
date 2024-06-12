export default function ItemNav({
  children,
  onClick,
  className,
  isActive = false,
}) {
  return (
    <li
      onClick={onClick}
      className={`heading-m group flex w-full items-center gap-x-4 rounded-r-full py-4 ps-8 transition-all duration-300 ${isActive ? "bg-purple text-white" : "text-medium-grey hover:bg-light-purple hover:text-white cursor-pointer"} ${className}`}
    >
      {children}
    </li>
  );
}
