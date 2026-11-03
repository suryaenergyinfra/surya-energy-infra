"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface WhatsAppEnquiryOptions {
  title?: string;
  defaultKw?: number;
  defaultRequirement?: string;
  defaultNotes?: string;
}

interface WhatsAppModalContextType {
  isOpen: boolean;
  options: WhatsAppEnquiryOptions;
  openEnquiryModal: (options?: WhatsAppEnquiryOptions) => void;
  closeEnquiryModal: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextType | undefined>(undefined);

export function WhatsAppModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<WhatsAppEnquiryOptions>({});

  const openEnquiryModal = (newOptions: WhatsAppEnquiryOptions = {}) => {
    setOptions(newOptions);
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <WhatsAppModalContext.Provider
      value={{
        isOpen,
        options,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </WhatsAppModalContext.Provider>
  );
}

export function useWhatsAppModal() {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error("useWhatsAppModal must be used within a WhatsAppModalProvider");
  }
  return context;
}
