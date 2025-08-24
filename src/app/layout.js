import Layout from "@/components/Layout";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

export const metadata = {
  title: "تناژ مارکت",
  description: "تناژ مارکت",
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
