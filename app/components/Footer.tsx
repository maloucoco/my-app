export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} MusicBox. 享受音乐，放松心情。
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-pink-500 transition">
              关于我们
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              隐私政策
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
