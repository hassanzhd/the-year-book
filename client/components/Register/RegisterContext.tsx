import { StateWrapper } from "@helpers/utility";
import React, { createContext, useState } from "react";

export interface registerContextI {
  stepNumber: StateWrapper;
  email: StateWrapper;
  password: StateWrapper;
  handle: StateWrapper;
  fullName: StateWrapper;
  university: StateWrapper;
  batch: StateWrapper;
  shortBio: StateWrapper;
  image: StateWrapper;
}

export const registerContext = createContext<registerContextI>(
  {} as registerContextI
);

const RegisterProvider = ({ children }: { children: any }) => {
  const stepNumber: StateWrapper = new StateWrapper(useState<number>(0));
  const email: StateWrapper = new StateWrapper(useState<string>(""));
  const password: StateWrapper = new StateWrapper(useState<string>(""));
  const handle: StateWrapper = new StateWrapper(useState<string>(""));
  const fullName: StateWrapper = new StateWrapper(useState<string>(""));
  const university: StateWrapper = new StateWrapper(useState<string>(""));
  const batch: StateWrapper = new StateWrapper(useState<number>(20));
  const shortBio: StateWrapper = new StateWrapper(useState<string>(""));
  const image: StateWrapper = new StateWrapper(useState<File>());

  return (
    <registerContext.Provider
      value={{
        stepNumber,
        email,
        password,
        handle,
        fullName,
        university,
        batch,
        shortBio,
        image,
      }}
    >
      {children}
    </registerContext.Provider>
  );
};

export default RegisterProvider;
