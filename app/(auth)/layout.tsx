import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={"/images/logo.svg"}
            alt={"Orbit Logo"}
            width={21}
            height={21}
          />
          Orbit
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
