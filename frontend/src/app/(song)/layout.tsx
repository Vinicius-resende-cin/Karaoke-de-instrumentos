import { Metadata } from "next";
import { InstrumentProvider } from "./contexts/IntrumentContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";

export const metadata: Metadata = {
  title: "Karaoke de Instrumentos",
  description: "App de karaoke de instrumentos"
};

export default function SongPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InstrumentProvider>
        <FeedbackProvider>
          <main>{children}</main>
        </FeedbackProvider>
      </InstrumentProvider>
    </>
  );
}
