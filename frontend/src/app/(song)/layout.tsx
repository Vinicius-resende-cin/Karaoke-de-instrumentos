import { Metadata } from "next";
import { InstrumentProvider } from "./contexts/IntrumentContext";

export const metadata: Metadata = {
  title: "Karaoke de Instrumentos",
  description: "App de karaoke de instrumentos"
};

export default function SongPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InstrumentProvider>
        <main>{children}</main>
      </InstrumentProvider>
    </>
  );
}
