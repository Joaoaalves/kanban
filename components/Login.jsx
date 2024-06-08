"use client";
import Image from "next/image";
import Input from "./Input";

import SubmitButton from "./SubmitButton";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email("Invalid email"),
  password: z.string().min(8, { message: "Invalid password" }).max(50),
});

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState(
    router?.query?.error ? "Check your credentials." : "",
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    const { email, password } = values;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/boards",
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  }

  return (
    <div className="max-w-[90vw] rounded-xl bg-white p-8 dark:bg-dark-grey xl:min-w-96">
      <h1 className="heading-xl self-start">Login</h1>
      <p className="body-m self-start text-dark-lines dark:text-light-lines/50">
        Add your details below to get back into the app
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col space-y-6"
          data-testid="login-component"
        >
          {error && (
            <span className="self-center rounded-md bg-red/80 p-2 text-white">
              {error}
            </span>
          )}
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
            />
          </Input>
          <Input
            type={"password"}
            id={"password"}
            label={"Password"}
            placeholder={"Enter your password"}
          >
            <Image
              src={"/images/icon-password.svg"}
              width={13}
              height={10}
              alt="Password Icon"
            />
          </Input>

          <SubmitButton text={"Submit"} />
          <p className="text-dark-gray xl:text-md text-center text-xs">
            Don’t have an account?{" "}
            <Link
              className="cursor-pointer font-bold text-purple"
              href="/signup"
            >
              Create account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
