"use client";

import { StoreModal } from "@/components/modal/StoreModal";
import { useIsMounted } from "@/hooks/useMounted";

export const ModalProvider: React.FC = () => {
  useIsMounted();

  return (
    <div>
      <StoreModal />
    </div>
  );
};
