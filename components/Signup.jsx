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

import Link from 'next/link'

const formSchema = z
  .object({
    firstName: z.string().min(1, {message: "Can't be empty"}),
    lastName: z.string().min(1, {message: "Can't be empty"}),
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
      console.log(values)
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
    <div className="bg-white dark:bg-dark-grey p-8 rounded-xl max-w-[90vw] xl:min-w-96">
      <h1 className="self-start heading-xl">Create account</h1>
      <p className="self-start body-m text-dark-lines dark:text-light-lines/50">
        Let’s get you started sharing your links!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-10 flex flex-col"
        >
          <Input
            type={"text"}
            id={"firstName"}
            label={"First Name"}
            placeholder={"John"}
            control={form.control}
          >
            <IoPersonSharp className="text-[#737373] text-sm"/>
          </Input>
          <Input
            type={"text"}
            id={"lastName"}
            label={"Last Name"}
            placeholder={"Doe"}
            control={form.control}
          >
            <IoPersonSharp className="text-[#737373] text-sm"/>
          </Input>
          <Input
            type={"email"}
            id={"email"}
            label={"Email address"}
            placeholder={"e.g. alex@email.com"}
            control={form.control}
          >
            <Image src={"/images/icon-email.svg"} width={13} height={10} alt="Email Icon" priority/>
          </Input>
          <Input
            type={"password"}
            id={"password"}
            label={"Create password"}
            placeholder={"At least 8 characters"}
          >
            <Image src={"/images/icon-password.svg"} width={13} height={10} alt="Password Icon" priority/>
          </Input>
          <Input
            type={"password"}
            id={"confirmPassword"}
            label={"Confirm password"}
            placeholder={"At least 8 characters"}
          >
            <Image src={"/images/icon-password.svg"} width={13} height={10} alt="Password Icon" priority/>
          </Input>

          <p className="text-xs text-dark-gray">
            Password must contain at least 8 characters
          </p>

          <SubmitButton text={'Submit'}/>
          <p className="text-dark-gray text-xs text-center xl:text-md">
            Already have an account?{" "}
            <Link className="text-purple cursor-pointer font-bold" href="/">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
