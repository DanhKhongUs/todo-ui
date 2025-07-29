import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { actions } = useAuth();

  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
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
    } else {
      toast.error("Send code false!");
    }
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!providedCode) return toast.error("Please enter verification code!");

    setIsLoading(true);
    const success = await actions.checkForgotPasswordCode({
      email,
      providedCode,
    });
    setIsLoading(false);
    if (success) {
      toast.success("Password changed successfully.");
      setStep(3);
    } else {
      toast.error("Invalid or expired verification code!");
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    const success = await actions.resetPasswordWithCode({
      email,
      providedCode,
      newPassword,
      confirmPassword,
    });

    setIsLoading(false);

    if (success) {
      toast.success("Password has been updated!");
      navigate("/signin");
    } else {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      {step === 1 && (
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
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Nhập mã xác thực
          </h2>
          <input
            type="text"
            placeholder="Mã xác thực"
            className="w-full p-2 border rounded"
            value={providedCode}
            onChange={(e) => setProvidedCode(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            {isLoading ? "Đang xác minh..." : "Xác minh mã"}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-blue-500 underline text-sm"
          >
            Quay lại bước trước
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Đặt lại mật khẩu
          </h2>
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
            {isLoading ? "Đang cập nhật..." : "Xác nhận mật khẩu mới"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
