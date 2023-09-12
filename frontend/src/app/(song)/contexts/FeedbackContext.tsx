"use client";
import { createContext, useContext, useState } from "react";

interface FeedbackContext {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface FeedbackProviderProps {
  children: React.ReactNode;
}

export const FeedbackContext = createContext<FeedbackContext | null>(null);

export function FeedbackProvider({ children }: FeedbackProviderProps) {
  const [score, setScore] = useState(0);

  return (
    <FeedbackContext.Provider value={{ score, setScore }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("FeedbackContext not found!");
  return context;
}
