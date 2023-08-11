"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/${params.storeId}/billboards/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards 0"
          description="Manage billboard for your store"
        ></Heading>
        <Button onClick={onClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
    </>
  );
};
