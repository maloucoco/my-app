"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动改变背景透明度
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo 和站点名称 */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">🎵</span>
          <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
            MusicBox
          </span>
        </Link>

        {/* 导航链接（可根据需要扩展） */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-pink-500 transition">
            首页
          </Link>
          <Link href="/playlist" className="hover:text-pink-500 transition">
            播放列表
          </Link>
          <Link href="/about" className="hover:text-pink-500 transition">
            关于
          </Link>
        </nav>

        {/* 右侧图标：主题切换（占位）或菜单按钮 */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="搜索"
          >
            🔍
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden"
            aria-label="菜单"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
