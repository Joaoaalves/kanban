export default function Toast({ title, description }) {
  return (
    <div className="h-full w-full rounded-lg bg-light-bg p-4 text-center shadow-lg dark:bg-dark-bg dark:shadow-white/10">
      <h4 className="text-lg font-bold text-green-400">{title}</h4>
      <p>{description}</p>
    </div>
  );
}
