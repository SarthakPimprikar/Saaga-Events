"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CalendarDays, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Role } from '@/lib/permissions';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles: Role[];
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['ADMIN'] },
  { name: 'CMS Management', href: '/cms/home', icon: <FileText className="w-5 h-5" />, roles: ['ADMIN', 'CMS'] },
  { name: 'Lead Management', href: '/leads/dashboard', icon: <Briefcase className="w-5 h-5" />, roles: ['ADMIN', 'LEAD_MGT'] },
  { name: 'Event Enquiries', href: '/events/enquiries', icon: <CalendarDays className="w-5 h-5" />, roles: ['ADMIN', 'LEAD_MGT'] },
  { name: 'User Management', href: '/users', icon: <Users className="w-5 h-5" />, roles: ['ADMIN'] },
  { name: 'Settings', href: '/settings/general', icon: <Settings className="w-5 h-5" />, roles: ['ADMIN'] },
];

export default function Sidebar({ userRole }: { userRole: Role }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const authorizedItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <motion.aside 
      animate={{ width: collapsed ? 80 : 280 }}
      className="bg-black border-r border-white/10 text-white flex flex-col h-screen sticky top-0"
    >
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <ShieldCheck className="w-7 h-7 text-purple-400" />
            <span className="font-bold text-lg tracking-tight">Saaga Admin</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 hover:bg-white/10 rounded-xl transition-colors ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {authorizedItems.map((item) => {
          // Check if active (handle subroutes)
          const isActive = pathname.startsWith(item.href.split('/')[1] ? '/' + item.href.split('/')[1] : item.href);

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap ${
                isActive 
                  ? 'bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-xs text-gray-500 font-medium">LOGGED IN AS</p>
            <p className="text-sm font-bold text-white mt-1">{userRole}</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
