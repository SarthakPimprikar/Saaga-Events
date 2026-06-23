import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full p-8 border border-red-500/20 bg-red-500/5 rounded-3xl text-center shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          You do not have the required role or permissions to access this page. This event has been logged.
        </p>
        <Link 
          href="/dashboard"
          className="inline-block w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
