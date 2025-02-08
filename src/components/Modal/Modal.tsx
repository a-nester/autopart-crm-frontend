'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/*Backdrop  */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => {
          onClose();
        }}
      ></div>
      {/* вміст */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg rounded-t-lg z-50">
        <button
          className="absolute top-2 right-4 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </>,
    document.body,
  );
}
