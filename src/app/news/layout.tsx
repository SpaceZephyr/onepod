import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnePod 日报",
  description: "精选海外科技资讯，按原文时间倒序",
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
