import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { toast } from "react-toastify";

function EmailVerification() {
  const { user, actions } = useAuth();
  const [providedCode, setProvidedCode] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const email = user?.email;

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Không tìm thấy email.");
      return;
    }
    try {
      setIsSending(true);
      await actions.sendVerificationCode({ email });
    } catch (error) {
      console.error("Error sending verification code: ", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !providedCode) return;
    try {
      setIsVerifying(true);
      const result = await actions.verifyVerificationCode({
        email,
        providedCode,
      });

      if (result) {
        await actions.validate();
        setProvidedCode("");
      }
    } catch (error) {
      console.error("Error verifying code: ", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Xác minh email
        </h2>

        {user?.verified ? (
          <div className="text-green-600 text-center text-lg font-semibold">
            Tài khoản của bạn đã được xác thực!
          </div>
        ) : (
          <>
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label
                  htmlFor="code"
                  className="block mb-1 text-gray-700 font-medium"
                >
                  Mã xác minh
                </label>
                <input
                  id="code"
                  value={providedCode}
                  onChange={(e) => setProvidedCode(e.target.value)}
                  placeholder="Nhập mã xác minh"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              <div className="flex justify-start mb-4 ml-2">
                <button
                  type="button"
                  onClick={handleSendCode}
                  className=" text-blue-600 hover:underline cursor-pointer transition"
                  disabled={isSending}
                >
                  {isSending ? "Đang gửi mã..." : "Gửi mã xác minh"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-300 cursor-pointer"
              >
                {isVerifying ? "Đang xác minh..." : "Gửi"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
