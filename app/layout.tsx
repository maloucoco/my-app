import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";  // 注意路径
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COCO音乐下载站",
  description: "简约纯净的音乐下载工具",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {/* 页头 */}
          <Header />

          {/* 主内容区域：添加上边距避免被固定头部遮挡 */}
          <main className="pt-16 min-h-screen">
            {children}
          </main>

          {/* 页尾 */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
