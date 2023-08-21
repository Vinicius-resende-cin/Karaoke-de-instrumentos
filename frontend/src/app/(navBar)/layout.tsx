import NavBar from "@/components/NavBar/NavBar";

export default function NavBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
