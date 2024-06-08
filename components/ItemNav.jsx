export default function ItemNav({
  children,
  onClick,
  className,
  isActive = false,
}) {
  return (
    <li
      onClick={onClick}
      className={`heading-m group flex w-full cursor-pointer items-center gap-x-4 rounded-r-full py-4 ps-8 transition-all duration-300 hover:bg-light-purple hover:text-white ${isActive ? "bg-purple text-white" : "text-medium-grey"} ${className}`}
    >
      {children}
    </li>
  );
}
