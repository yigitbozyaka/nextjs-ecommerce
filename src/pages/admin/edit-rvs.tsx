import Head from "next/head";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Admin/Navbar";
import EditRv from "@/components/Admin/EditRv";
import { Toaster } from "react-hot-toast";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session || session?.user?.email !== process.env.NEXTAUTH_EMAIL) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function EditRvsPage() {
  return (
    <>
      <Head>
        <title>Admin | Edit RVs</title>
      </Head>
      <Navbar />
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800">
        <section id="editRv">
          <EditRv />
        </section>
      </div>
    </>
  );
}
