export default function ItemNav({children, onClick, className, isActive=false}){
    return (
        <li onClick={onClick} className={`w-full ps-8 rounded-r-full py-4 flex items-center gap-x-4 heading-m cursor-pointer transition-all duration-300 hover:bg-light-purple hover:text-white group ${isActive ? 'bg-purple text-white' : 'text-medium-grey'} ${className}`}>
            {children}
        </li>
    )
}