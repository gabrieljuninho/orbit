import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { PropsWithChildren } from "@/types";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={"/13604129.svg"}
            alt={"Logo"}
            width={24}
            height={24}
            className="rounded-md"
            priority
          />
          Orbit
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
