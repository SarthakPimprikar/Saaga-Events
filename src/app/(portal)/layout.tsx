import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth/jwt';
import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import { Role } from '@/lib/permissions';
import { redirect } from 'next/navigation';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const payload = await verifyAccessToken(token);
  
  if (!payload) {
    redirect('/login');
  }

  const userRole = payload.role as Role;

  return (
    <div className="flex h-screen bg-black text-white selection:bg-purple-500/30 overflow-hidden">
      <Sidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto bg-neutral-950">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
