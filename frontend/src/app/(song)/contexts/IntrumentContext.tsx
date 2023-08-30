"use client";
import { createContext, useContext, useState } from "react";

interface InstrumentContext {
  choosenInstrument: string;
  setChoosenInstrument: React.Dispatch<React.SetStateAction<string>>;
}

interface InstrumentProviderProps {
  children: React.ReactNode;
}

export const InstrumentContext = createContext<InstrumentContext | null>(null);

export function InstrumentProvider({ children }: InstrumentProviderProps) {
  const [choosenInstrument, setChoosenInstrument] = useState("bass");

  return (
    <InstrumentContext.Provider value={{ choosenInstrument, setChoosenInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
}

export function useInstrumentContext() {
  const context = useContext(InstrumentContext);
  if (!context) throw new Error("InstrumentContext not found!");
  return context;
}
