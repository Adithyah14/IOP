import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"doctor" | "patient">("patient");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (activeTab === "doctor") {
      navigate("/dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
  <div className="w-32 h-16 mx-auto mb-4 flex items-center justify-center">
    <img
      src="src/logo.png"  
      alt="App Logo"
      className="max-h-16 object-contain"
    />
  </div>
</div>

        {/* Login Form Container */}
        <div className="bg-iop-blue rounded-[20px] p-8 text-white">
          {/* User Type Tabs */}
          <div className="bg-white rounded-full p-1 mb-8 flex">
            <button
              onClick={() => setActiveTab("doctor")}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-full text-sm font-bold transition-colors ${
                activeTab === "doctor"
                  ? "text-iop-blue bg-white"
                  : "text-black bg-transparent"
              }`}
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M20 22V19C20 16.172 20 14.757 19.121 13.879C18.243 13 16.828 13 14 13L12 15L10 13C7.172 13 5.757 13 4.879 13.879C4 14.757 4 16.172 4 19V22M16 13V18.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 13V17M8.5 17C9.03043 17 9.53914 17.2107 9.91421 17.5858C10.2893 17.9609 10.5 18.4696 10.5 19V20M8.5 17C7.96957 17 7.46086 17.2107 7.08579 17.5858C6.71071 17.9609 6.5 18.4696 6.5 19V20M15.5 6.5V5.5C15.5 5.04037 15.4095 4.58525 15.2336 4.16061C15.0577 3.73597 14.7999 3.35013 14.4749 3.02513C14.1499 2.70012 13.764 2.44231 13.3394 2.26642C12.9148 2.09053 12.4596 2 12 2C11.5404 2 11.0852 2.09053 10.6606 2.26642C10.236 2.44231 9.85013 2.70012 9.52513 3.02513C9.20012 3.35013 8.94231 3.73597 8.76642 4.16061C8.59053 4.58525 8.5 5.04037 8.5 5.5V6.5C8.5 6.95963 8.59053 7.41475 8.76642 7.83939C8.94231 8.26403 9.20012 8.64987 9.52513 8.97487C9.85013 9.29988 10.236 9.55769 10.6606 9.73358C11.0852 9.90947 11.5404 10 12 10C12.4596 10 12.9148 9.90947 13.3394 9.73358C13.764 9.55769 14.1499 9.29988 14.4749 8.97487C14.7999 8.64987 15.0577 8.26403 15.2336 7.83939C15.4095 7.41475 15.5 6.95963 15.5 6.5ZM16.75 19.25C16.75 19.4489 16.671 19.6397 16.5303 19.7803C16.3897 19.921 16.1989 20 16 20C15.8011 20 15.6103 19.921 15.4697 19.7803C15.329 19.6397 15.25 19.4489 15.25 19.25C15.25 19.0511 15.329 18.8603 15.4697 18.7197C15.6103 18.579 15.8011 18.5 16 18.5C16.1989 18.5 16.3897 18.579 16.5303 18.7197C16.671 18.8603 16.75 19.0511 16.75 19.25Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Doctor
            </button>
            <button
              onClick={() => setActiveTab("patient")}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-full text-sm font-bold transition-colors ${
                activeTab === "patient"
                  ? "text-iop-blue bg-white"
                  : "text-black bg-transparent"
              }`}
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12.25C11.2583 12.25 10.5333 12.0301 9.91661 11.618C9.29993 11.206 8.81928 10.6203 8.53545 9.93506C8.25162 9.24984 8.17736 8.49584 8.32205 7.76841C8.46675 7.04098 8.8239 6.3728 9.34835 5.84835C9.8728 5.3239 10.541 4.96675 11.2684 4.82206C11.9958 4.67736 12.7498 4.75162 13.4351 5.03545C14.1203 5.31928 14.706 5.79993 15.118 6.41661C15.5301 7.0333 15.75 7.75832 15.75 8.5C15.75 9.49456 15.3549 10.4484 14.6517 11.1517C13.9484 11.8549 12.9946 12.25 12 12.25ZM12 6.25C11.555 6.25 11.12 6.38196 10.75 6.62919C10.38 6.87643 10.0916 7.22783 9.92127 7.63896C9.75097 8.0501 9.70642 8.5025 9.79323 8.93895C9.88005 9.37541 10.0943 9.77632 10.409 10.091C10.7237 10.4057 11.1246 10.62 11.561 10.7068C11.9975 10.7936 12.4499 10.749 12.861 10.5787C13.2722 10.4084 13.6236 10.12 13.8708 9.75003C14.118 9.38002 14.25 8.94501 14.25 8.5C14.25 7.90326 14.0129 7.33097 13.591 6.90901C13.169 6.48705 12.5967 6.25 12 6.25ZM19 19.25C18.8019 19.2474 18.6126 19.1676 18.4725 19.0275C18.3324 18.8874 18.2526 18.6981 18.25 18.5C18.25 16.55 17.19 15.25 12 15.25C6.81 15.25 5.75 16.55 5.75 18.5C5.75 18.6989 5.67098 18.8897 5.53033 19.0303C5.38968 19.171 5.19891 19.25 5 19.25C4.80109 19.25 4.61032 19.171 4.46967 19.0303C4.32902 18.8897 4.25 18.6989 4.25 18.5C4.25 13.75 9.68 13.75 12 13.75C14.32 13.75 19.75 13.75 19.75 18.5C19.7474 18.6981 19.6676 18.8874 19.5275 19.0275C19.3874 19.1676 19.1981 19.2474 19 19.25Z" />
              </svg>
              Patient
            </button>
          </div>
          {activeTab === "patient" && (
            <div className="bg-iop-blue rounded-full h-1 w-20 mx-auto mb-8 relative">
              <div className="absolute right-0 w-20 h-1 bg-iop-blue rounded-full"></div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-lg mb-2">
                {activeTab === "doctor" ? "Username" : "Patient ID"}
              </label>
              <input
                type="text"
                placeholder={
                  activeTab === "doctor" ? "Enter Username" : "Enter Patient ID"
                }
                className="w-full p-3 rounded border border-black/30 text-black text-sm placeholder-black/50"
              />
            </div>

            <div>
              <label className="block text-lg mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 rounded border border-black/30 text-black text-sm placeholder-black/50"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-iop-blue-dark text-white font-bold py-3 px-6 rounded mt-6 text-sm"
          >
            Login
          </button>

          {/* Create Account Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-white text-xs underline">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
