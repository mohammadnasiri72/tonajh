import Layout from "@/components/Layout";
import { getCategory } from "@/services/categoryServices";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

export const metadata = {
  title: "تناژ مارکت",
  description: "تناژ مارکت",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function RootLayout({ children }) {
  const categorys = await getCategory();

  

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Layout categorys={categorys?.data}>{children}</Layout>
      </body>
    </html>
  );
}
