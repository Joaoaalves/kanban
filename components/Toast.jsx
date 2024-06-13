export default function Toast({title, description}){
  return (
    <div className="w-full h-full p-4 bg-light-bg dark:bg-dark-bg rounded-lg text-center">
      <h4 className="text-lg font-bold text-green-400">{title}</h4>
      <p>{description}</p>
    </div>
  )
}