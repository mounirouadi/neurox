import { Header, Main } from "@/components";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />
      <Header />
      <main>
        <Main />
      </main>
    </>
  );
}
