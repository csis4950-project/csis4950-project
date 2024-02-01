import { Inter } from "next/font/google";
import "./styles/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSIS4950",
  description: "Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
