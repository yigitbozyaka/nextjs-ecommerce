import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  const loginUser = async (e: any) => {
    e.preventDefault();

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success('Logged in successfully!');
        router.push('/admin/add-rvs');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    }
  };



  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>

      <Toaster />

      <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Login</h1>
        <form onSubmit={loginUser}>
          <div className="flex flex-col my-3">
            <label className="text-white font-bold underline" htmlFor="email">
              Email
            </label>
            <input className="bg-transparent border-2 border-[#5865F2] rounded-lg text-gray-300" placeholder="johndoe@gmail.com" type="email" name="email" onChange={e => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="flex flex-col my-3">
            <label className="text-white font-bold underline" htmlFor="password">
              Password
            </label>
            <input className="bg-transparent border-2 border-[#5865F2] rounded-lg text-gray-300" type="password" name="password" onChange={e => setData({ ...data, password: e.target.value })} />
          </div>
          <button
            type="submit"
            className="text-white bg-[#5865F2] px-4 py-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
