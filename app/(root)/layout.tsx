import { auth } from "@clerk/nextjs";
import { FC, ReactNode } from "react";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface SetupLayoutProps {
  children: ReactNode;
}
const SetupLayout: FC<SetupLayoutProps> = async ({ children }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({ where: { userId } });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
