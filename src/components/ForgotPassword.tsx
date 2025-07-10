import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { actions } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState<string>("");
  const [providedCode, setProvidedCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setIsLoading(true);
    const error = await actions.sendForgotPasswordCode({ email });
    setIsLoading(false);

    if (!error) {
      setStep(2);
    }
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!providedCode || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    setIsLoading(true);
    const success = await actions.verifyForgotPasswordCode({
      email,
      providedCode,
      newPassword,
      confirmPassword,
    });
    setIsLoading(false);
    if (success) {
      toast.success("Password changed successfully.");
      setStep(1);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      {step === 1 ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Quên mật khẩu</h2>
          <input
            type="email"
            placeholder="Nhập email đã đăng ký"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Đang gửi mã..." : "Gửi mã xác thực"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Nhập mã xác nhận
          </h2>
          <button
            className="hover:underline ml-2 text-gray-800 cursor-pointer"
            type="button"
            onClick={() => setStep(1)}
          >
            Quay Lại
          </button>
          <input
            type="text"
            placeholder="Mã xác thực"
            className="w-full p-2 border rounded"
            value={providedCode}
            onChange={(e) => setProvidedCode(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isLoading ? "Đang xác minh..." : "Xác nhận đổi mật khẩu"}
          </button>
          <button
            type="button"
            onClick={() => handleSendCode}
            className="text-blue-500 underline text-sm"
          >
            Gửi lại mã
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
