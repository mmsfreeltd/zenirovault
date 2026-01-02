"use client"
import { SITE_NAME } from '@/global/constants';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#07061a]/80 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-semibold">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-purple-400"
            >
              <path
                d="M3 12L12 3L21 12L12 21L3 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {SITE_NAME}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition">
              Home
            </a>
            <a href="#" className="hover:text-white transition">
              Trading
            </a>
            <a href="#" className="hover:text-white transition">
              Community
            </a>
            <a href="#" className="hover:text-white transition">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white text-sm font-medium">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M3 6H21M3 12H21M3 18H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SLIDE MENU */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#07061a] border-r border-white/10
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
          <span className="text-white font-semibold">{SITE_NAME}</span>
          <button onClick={() => setOpen(false)} className="text-gray-400">
            ✕
          </button>
        </div>

        {/* Scrollable Menu */}
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-6 py-6 space-y-6 text-gray-300">
          <a href="#" className="block hover:text-white transition">
            Home
          </a>
          <a href="#" className="block hover:text-white transition">
            Trading
          </a>
          <a href="#" className="block hover:text-white transition">
            Markets
          </a>
          <a href="#" className="block hover:text-white transition">
            Community
          </a>
          <a href="#" className="block hover:text-white transition">
            Pricing
          </a>
          <a href="#" className="block hover:text-white transition">
            Blog
          </a>
          <a href="#" className="block hover:text-white transition">
            About Us
          </a>
          <a href="#" className="block hover:text-white transition">
            Contact
          </a>

          {/* CTA */}
          <button className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 text-white font-medium">
            Login Account
          </button>
        </nav>
      </aside>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
