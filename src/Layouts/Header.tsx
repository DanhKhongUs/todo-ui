import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { useAuth } from "../contexts/auth/AuthContext";
import * as Popover from "@radix-ui/react-popover";

function Header() {
  const { isAuthenticated, user, actions, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignout = async () => {
    await actions.signout();
    navigate("/");
  };

  if (isLoading) return null;

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-20 border-b border-gray-300 px-8">
        {isAuthenticated ? (
          <Link
            to={routes.todoapp}
            className="flex items-center text-xl font-extrabold gap-2 text-[#02afae]"
          >
            <img
              className="w-12 h-12 object-cover"
              src="https://cdn-icons-png.flaticon.com/512/7692/7692809.png"
              alt="todo"
            />
            <div className="leading-5">
              <p className="tracking-wide">TODO</p>
              <p className="ml-1 text-gray-700">APP</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center text-xl font-extrabold gap-2 text-gray-400 cursor-not-allowed">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src="https://cdn-icons-png.flaticon.com/512/7692/7692809.png"
              alt="todo"
            />
            <div className="leading-5 select-none">
              <p className="tracking-wide">TODO</p>
              <p className="ml-1 text-gray-700">APP</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 px-2 items-center">
          {!isAuthenticated ? (
            <>
              <Link to={routes.signin}>
                <button className="py-2 min-w-[100px] rounded bg-gray-800 text-white hover:bg-gray-700 transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to={routes.signup}>
                <button className="min-w-[100px] py-2 rounded border border-[#02afae] text-[#02afae] hover:underline cursor-pointer transition">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Trigger asChild>
                <div
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src="vite.svg"
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  side="bottom"
                  align="end"
                  className="bg-white p-4 shadow-lg border border-gray-200 rounded-md w-64 z-50 transition-all duration-300 transform"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <p className="font-semibold mb-2 text-gray-800">
                    Xin chào, <span className="text-sky-600">{user?.name}</span>
                  </p>

                  <Link
                    to="/todo"
                    className="block w-full text-left text-gray-700 hover:bg-sky-100 hover:text-sky-800 rounded px-3 py-2 transition"
                  >
                    Danh sách TODO
                  </Link>

                  <Link
                    to="/email-verification"
                    className="block w-full text-left text-gray-700 hover:bg-sky-100 hover:text-sky-800 rounded px-3 py-2 transition"
                  >
                    Xác thực tài khoản
                  </Link>
                  <Link
                    to="/change-password"
                    className="block w-full text-left text-gray-700 hover:bg-sky-100 hover:text-sky-800 rounded px-3 py-2 transition"
                  >
                    Đổi mật khẩu
                  </Link>

                  <button
                    onClick={handleSignout}
                    className="mt-2 block w-full text-left text-red-600 hover:bg-red-100 hover:text-red-700 rounded px-3 py-2 transition outline-none cursor-pointer"
                  >
                    Đăng xuất
                  </button>

                  <Popover.Arrow className="fill-white drop-shadow" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
