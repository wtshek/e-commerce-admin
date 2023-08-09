"use client";

import { StoreModal } from "@/components/modal/StoreModal";
import { useEffect, useState } from "react";

export const ModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) return null;

  return (
    <div>
      <StoreModal />
    </div>
  );
};
