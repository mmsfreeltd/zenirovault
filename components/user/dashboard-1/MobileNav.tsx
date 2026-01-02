'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpenState() {
    setIsOpen(!isOpen);
  }
  const classes = clsx(
    'fixed sm:hidden bg-gray-950 border-b border-gray-800 h-full w-2/3 top-0 px-5 py-4 z-90 transition-all',
    {
      '-right-2/3': !isOpen,
      'right-0': isOpen,
    }
  );

  return (
    <div>
      <div className="sm:hidden flex justify-end p-3">
        <button onClick={toggleOpenState}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      <nav className={classes}>
        <div className="sm:hidden flex justify-end px-2">
          <button onClick={toggleOpenState}>{isOpen ? <X /> : <Menu />}</button>
        </div>
        <ul className="flex flex-col gap-5">
          <li>
            <span className="text-green-400">Account Status: Active</span>
          </li>
          <li>Wallet Balance:$123,500</li>
          <li>
            <Link href="#">TRADING</Link>
          </li>
          <li>
            <Link href="#">Account Funding</Link>
          </li>
          <li>
            <Link href="#">Withdrawals</Link>
          </li>
          <li>
            <Link href="#">STATEMENT</Link>
          </li>
          <li>
            <Link href="#">Transaction History</Link>
          </li>
          <li>
            <Link href="#">SETTINGS</Link>
          </li>
          <li>
            <Link href="#">Personal Data</Link>
          </li>
          <li>
            <Link href="#">Security Setting</Link>
          </li>
          <li>
            <Link href="#">DEMO TRADING</Link>
          </li>
          <li>
            <Link href="#">CONTACT US</Link>
          </li>
          <li>
            <Link href="#">Exit</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
