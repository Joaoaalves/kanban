"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "./ui/form";

export default function CustomInput({
  control,
  type,
  label,
  className,
  id,
  placeholder,
  children,
}) {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel className="text-xs">{label}</FormLabel>
          <FormControl>
            <div
              className={`grid max-w-[90vw] grid-cols-[2em_1fr] grid-rows-1 place-items-center items-center rounded border-[1px] ${formState.errors[id] ? "border-red" : ""}`}
            >
              {children}
              <Input
                type={type}
                className={`${className} text-dark-gray !border-0 border-none !bg-transparent ps-0 text-sm !outline-none !ring-0 focus-visible:ring-offset-0`}
                {...field}
                id={id}
                placeholder={placeholder}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs !text-red sm:hidden" />
        </FormItem>
      )}
    />
  );
}
