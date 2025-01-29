interface AuthLayoutProps {
    children: React.ReactNode
  }
  
  export function AuthLayout({ children }: AuthLayoutProps) {
    return (
      <div className="min-h-screen w-full bg-[#0B3B5B] p-4 flex items-center justify-center">
        <div className="w-full max-w-[500px] bg-white rounded-lg p-6 md:p-8">{children}</div>
      </div>
    )
  }
  
  