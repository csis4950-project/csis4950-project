import "./styles/styles.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getSession } from "@/utils/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSIS4950",
  description: "Project",
};

export default async function RootLayout({ children }) {
  const data = await getSession();
  const session = data?.payload ?? null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper">
          <Navbar session={session} />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
