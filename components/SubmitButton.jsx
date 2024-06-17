export default function SubmitButton({ text, disabled = false }) {
  return (
    <input
      type="submit"
      value={disabled ? "Loading..." : text}
      className="w-full cursor-pointer rounded-[24px] bg-purple p-2 text-white transition-all duration-300 hover:bg-light-purple disabled:bg-light-purple/50"
      disabled={disabled}
    />
  );
}
