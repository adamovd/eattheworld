"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Resolver } from "react-hook-form";
import React from "react";
import { User } from "../../Models/dbTypes";
import {
  InputContainer,
  InputField,
  InputLabel,
} from "@/app/Styles/Components/InputFields";
import { Button } from "@/app/Styles/Components/Buttons";
import { FormContainer } from "@/app/Styles/Components/Containers";
import { FormRegisterLink, FormTitle } from "@/app/Styles/Components/Fonts";
import PageWrapper from "@/app/Components/PageWrapper";

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      signIn("credentials", {
        ...data,
        redirect: false,
      });
      reset();
      router.push("/");
    } catch (error) {
      console.error("Error while login in", error);
    }
  });

  return (
    <PageWrapper>
      <FormContainer>
        <FormTitle>Sign in to your account</FormTitle>

        <form onSubmit={onSubmit}>
          <InputContainer>
            <InputLabel
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </InputLabel>

            <InputField
              {...register("email")}
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </InputContainer>

          <InputContainer>
            <InputLabel
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </InputLabel>

            <InputField
              {...register("password")}
              bgcolor="--Light"
              textcolor="--Dark"
              fontSize="1rem"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </InputContainer>
          <InputContainer>
            <Button
              type="submit"
              bgcolor="--DarkGreen"
              textcolor="--Light"
              fontSize="1rem"
            >
              Sign in
            </Button>
          </InputContainer>
        </form>
        {/* <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
              OR
            </p>
          </div>
        
        <Button
          bgcolor="--Light"
          textcolor="--Dark"
          fontSize="1rem"
          className="flex w-full justify-center align-middle my-4 ml-6 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => signIn("google")}
        >
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="-0.5 0 48 48"
            version="1.1"
          >
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  ></path>
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <span>Continue with Google</span>
        </Button> */}

        <FormRegisterLink>
          Not a member? <Link href="/register">Create an account today!</Link>
        </FormRegisterLink>
      </FormContainer>
    </PageWrapper>
  );
};

export default SignInForm;
