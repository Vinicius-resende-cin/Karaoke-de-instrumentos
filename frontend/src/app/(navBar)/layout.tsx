import NavBar from "@/components/NavBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karaoke de Instrumentos",
  description: "App de karaoke de instrumentos"
};

export default function NavBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
