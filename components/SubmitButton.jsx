export default function SubmitButton({ text }) {
  return (
    <input
      type="submit"
      value={text}
      className="w-full cursor-pointer rounded-[24px] bg-purple p-2 text-white transition-all duration-300 hover:bg-light-purple"
    />
  );
}
