import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>
      
      <LoginForm />
    </div>
  );
}
