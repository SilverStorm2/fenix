"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-gradient-to-r from-fenix-black to-gray-900 border-b-2 border-fenix-gold/30 shadow-xl no-print">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            href="/admin/treningi"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
              <span className="text-2xl">⚽</span>
            </div>
            <h1 className="text-2xl font-extrabold gold-shine">FENIX TEAM</h1>
          </Link>
          <button
            onClick={handleLogout}
            className="text-fenix-gold hover:text-fenix-gold-dark font-semibold transition-colors"
          >
            Wyloguj
          </button>
        </div>
      </div>
    </header>
  );
}
