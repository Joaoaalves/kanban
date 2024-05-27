import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Switch } from "@/components/ui/switch"

export default function ThemeToggle(){
    const { theme, setTheme } = useTheme()

    const toggleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className='bg-light-bg dark:bg-dark-bg py-[14px] px-8 lg:px-16 gap-x-6 flex items-center justify-center rounded-md mt-auto'>
            <Image width={20} height={20} src={'/images/icon-light-theme.svg'} alt='Light Mode Icon'/>
            <Switch value={theme === 'dark'} onClick={toggleDarkMode} className="!bg-purple switch"/>
            <Image width={20} height={20} src={'/images/icon-dark-theme.svg'} alt='Dark Mode Icon'/>
        </div>
    )
}