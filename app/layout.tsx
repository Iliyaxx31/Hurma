import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";



const vazirmatn = localFont({ src: "../public/fonts/vazirmatn.woff2", display: "swap", variable: "--font-persian" });

export const metadata: Metadata = {
  title: "نخل | شیرینیِ سادهٔ زندگی",
  description: "نمونهٔ فروشگاه خرمای نخل؛ کشف طعم‌های مضافتی، پیارم، مجول و زاهدی.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('nakhl-theme')==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
