import Layout from "@/components/Layout";
import "./globals.css";

export const metadata = {
  description: "خانه عکاسان افرنگ",
  icons: {
    icon: '/images/logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
