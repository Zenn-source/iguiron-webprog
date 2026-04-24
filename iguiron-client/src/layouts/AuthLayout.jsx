import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#0b1326] text-[#dae2fd]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="relative hidden lg:block overflow-hidden border-r border-white/[8%]">
          <img
            src="/lav.jpg"
            alt="Auth banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <main className="flex items-center bg-[#131b2e] px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
