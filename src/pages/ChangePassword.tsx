import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";

function ChangePassword() {
  const { actions } = useAuth();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = actions.changePassword({ oldPassword, newPassword });
    setIsLoading(false);

    if (typeof result === "string") {
      return;
    }

    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Thay đổi mật khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="old-password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Mật khẩu cũ
            </label>
            <input
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Nhập mật khẩu cũ"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="new-password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Mật khẩu mới
            </label>
            <input
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-300 cursor-pointer"
          >
            Thay đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
