import { InstrumentProvider } from "./contexts/IntrumentContext";

export default function SongPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InstrumentProvider>
        <main>{children}</main>
      </InstrumentProvider>
    </>
  );
}
