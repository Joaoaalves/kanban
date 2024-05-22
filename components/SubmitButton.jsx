export default function SubmitButton({text}){
    return (
        <input type="submit" value={text} className="w-full bg-purple hover:bg-light-purple p-2 rounded-[24px] cursor-pointer transition-all duration-300"/>
    )
}