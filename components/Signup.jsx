"use client";
import Image from "next/image";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { IoPersonSharp } from "react-icons/io5";

import { Form } from "@/components/ui/form";

import { toast } from "sonner";
import { useRouter } from "next/router";

import Link from "next/link";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "Can't be empty" }),
    lastName: z.string().min(1, { message: "Can't be empty" }),
    email: z
      .string()
      .min(1, { message: "Can't be empty" })
      .email("Invalid email"),
    password: z.string().min(8, { message: "Invalid password" }).max(50),
    confirmPassword: z.string().min(8, { message: "Invalid password" }).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        return toast(data.message, {
          position: "bottom-center",
          style: {
            backgroundColor: "#FF3939",
            color: "white",
            textAlign: "center",
          },
        });
      }

      toast("User created successfuly.", {
        position: "bottom-center",
        style: {
          backgroundColor: "#333333",
          color: "white",
          textAlign: "center",
        },
        onDismiss: () => router.push("/"),
        onAutoClose: () => router.push("/"),
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  return (
    <div className="max-w-[90vw] rounded-xl bg-white p-8 dark:bg-dark-grey xl:min-w-96">
      <h1 className="heading-xl self-start">Create account</h1>
      <p className="body-m self-start text-dark-lines dark:text-light-lines/50">
        Let’s get you started sharing your links!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col space-y-6"
        >
          <Input
            type={"text"}
            id={"firstName"}
            label={"First Name"}
            placeholder={"John"}
            control={form.control}
          >
            <IoPersonSharp className="text-sm text-[#737373]" />
          </Input>
          <Input
            type={"text"}
            id={"lastName"}
            label={"Last Name"}
            placeholder={"Doe"}
            control={form.control}
          >
            <IoPersonSharp className="text-sm text-[#737373]" />
          </Input>
          <Input
            type={"email"}
            id={"email"}
            label={"Email address"}
            placeholder={"e.g. alex@email.com"}
            control={form.control}
          >
            <Image
              src={"/images/icon-email.svg"}
              width={13}
              height={10}
              alt="Email Icon"
              priority
            />
          </Input>
          <Input
            type={"password"}
            id={"password"}
            label={"Create password"}
            placeholder={"At least 8 characters"}
          >
            <Image
              src={"/images/icon-password.svg"}
              width={13}
              height={10}
              alt="Password Icon"
              priority
            />
          </Input>
          <Input
            type={"password"}
            id={"confirmPassword"}
            label={"Confirm password"}
            placeholder={"At least 8 characters"}
          >
            <Image
              src={"/images/icon-password.svg"}
              width={13}
              height={10}
              alt="Password Icon"
              priority
            />
          </Input>

          <p className="text-dark-gray text-xs">
            Password must contain at least 8 characters
          </p>

          <SubmitButton text={"Submit"} />
          <p className="text-dark-gray xl:text-md text-center text-xs">
            Already have an account?{" "}
            <Link className="cursor-pointer font-bold text-purple" href="/">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
