"use client";

import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../(redux)/authenticate";
import Link from "next/link";
import { UserAccDocument } from "@/backend/src/models/userAccModel";
import { RootState } from "@/(redux)/store";

const Login = () => {
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.auth.userData as UserAccDocument
  );

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = emailref.current?.value;
      const password = passwordref.current?.value;
      const res = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      }
      dispatch(login({ userData: data.user }));

      toast.success(data.message);
    } catch (error: any) {
      return toast.error(error);
    }
  };

  if (user._id) {
    if (user.role === "nuser") {
      redirect("/");
    }
    if (user.role === "mod") {
      redirect("/");
    }
    if (user.role === "admin") {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" id="login" onSubmit={loginHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                ref={emailref}
                placeholder="Enter Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                ref={passwordref}
                type="password"
                placeholder="Enter Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-passwd"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>

          <p>OR</p>
          <Link href={"/register"}>Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
