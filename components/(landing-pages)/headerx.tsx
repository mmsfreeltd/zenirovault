'use client';
import { useState } from 'react';
import { ModeToggle } from '@/components/(landing-pages)/modeswitch';
import {
  Users,
  Copy,
  Lock,
  Cpu,
  FileText,
  CircleDollarSign,
  BarChart3,
  Folder,
  Home,
} from 'lucide-react';
import { SITE_NAME } from '@/global/constants';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: 'About Us',
      href: '/about',
      icon: Users,
    },
    {
      label: 'Copy Trading',
      href: '/copy-trading',
      icon: Copy,
    },
    {
      label: 'Cookie Policy',
      href: '/cookie-policy',
      icon: Lock,
    },
    {
      label: 'Crypto Mining',
      href: '/crypto-mining',
      icon: Cpu,
    },
    {
      label: 'Forex Trading',
      href: '/forex-trading',
      icon: FileText,
    },
    {
      label: 'Privacy Policy',
      href: '/privacy-policy',
      icon: Lock,
    },
    {
      label: 'Bitcoin Mining',
      href: '/bitcoin-mining',
      icon: CircleDollarSign,
    },
    {
      label: 'Crypto Trading',
      href: '/crypto-trading',
      icon: CircleDollarSign,
    },
    {
      label: 'Stocks Trading',
      href: '/stocks-trading',
      icon: BarChart3,
    },
    {
      label: 'Dogecoin Mining',
      href: '/dogecoin-mining',
      icon: CircleDollarSign,
    },
    {
      label: 'Terms of Service',
      href: '/terms-of-service',
      icon: Folder,
    },
  ];
  return (
    <>
      {/* HEADER */}
      <header
        className="fixed top-0 inset-x-0 z-50
        bg-white/80 dark:bg-[#07061a]/80
        backdrop-blur
        border-b border-gray-200 dark:border-white/5"
      >
        <div className="h-16 px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <Image
              src="/images/icon.png"
              alt="favicon"
              width={20}
              className="object-cover"
              height={20}
            />
            {SITE_NAME}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="text-gray-900 dark:text-white"
              aria-label="Open menu"
            >
              <svg width="26" height="26" fill="none">
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <ModeToggle />
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity duration-300
          bg-black/50 dark:bg-black/60
          ${
            open
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      />

      {/* SLIDE-IN DRAWER */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-75
          bg-white dark:bg-[#07061a]
          border-r border-gray-200 dark:border-white/10
          flex flex-col
          transform transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Drawer Header */}
        <div
          className="h-16 px-6 flex items-center justify-between
          border-b border-gray-200 dark:border-white/10"
        >
          <div className="flex items-center">
            <div>
              <Image
                src="/images/icon.png"
                alt="favicon"
                width={20}
                className="object-cover"
                height={20}
              />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white ml-1">
              {SITE_NAME}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Menu */}
        <nav
          className="flex-1 overflow-y-auto px-6 py-6 space-y-2
          text-gray-700 dark:text-gray-300"
        >
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <a
                key={label}
                href={href}
                className={`
        relative flex items-center gap-2
        px-3 py-2 rounded-sm
        text-base transition
        ${
          isActive
            ? 'text-purple-600 dark:text-white bg-purple-50 dark:bg-white/10'
            : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white'
        }
      `}
              >
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="
            absolute left-0 top-1/2 -translate-y-1/2
            h-6 w-1 rounded-full
            bg-purple-500
          "
                  />
                )}

                <Icon className="w-5 h-5" />
                {label}
              </a>
            );
          })}

          {/* CTA */}
          <a
            href="login"
            className="
            w-full mt-2 px-6 py-3 rounded-xl
            bg-linear-to-r from-purple-500 to-orange-500
            text-white font-medium
          "
          >
            Login Account
          </a>
        </nav>
      </aside>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
