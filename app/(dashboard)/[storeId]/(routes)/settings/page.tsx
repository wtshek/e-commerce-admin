import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import SettingsForm from "./components/SettingsForm";

interface PageProps {
  params: {
    storeId: string;
  };
}

export const Page: FC<PageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma?.store.findFirst({
    where: { userId, id: params.storeId },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default Page;
