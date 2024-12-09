import { ReactNode } from "react";

interface ModalProps {
  isOpen?: true;
  children: ReactNode;
}
export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      {children}
    </div>
  );
};
