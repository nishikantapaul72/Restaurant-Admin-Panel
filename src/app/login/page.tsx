import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-gray-50 p-8">
          <Image
            src="/images/login.png"
            alt="Waiter and Customer"
            width={350}
            height={350}
          />
        </div>
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <AuthForm formType="login" />
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
