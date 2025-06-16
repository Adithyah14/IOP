import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({ title, showBackButton, onBack }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsMenuOpen(false);
    // Add a small delay for smooth animation before navigation
    setTimeout(() => {
      navigate("/login");
    }, 200);
  };
  return (
    <div className="bg-iop-blue rounded-b-[30px] px-6 py-4 text-white relative overflow-hidden">
      {/* Menu Button */}
      <div className="flex items-center justify-between relative z-10">
        {showBackButton ? (
          <button onClick={onBack} className="p-1">
            <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
              <path
                d="M5.46875 11.7188H21.0938C21.301 11.7188 21.4997 11.8011 21.6462 11.9476C21.7927 12.0941 21.875 12.2928 21.875 12.5C21.875 12.7072 21.7927 12.9059 21.6462 13.0524C21.4997 13.1989 21.301 13.2812 21.0938 13.2812H5.46875C5.26155 13.2812 5.06284 13.1989 4.91632 13.0524C4.76981 12.9059 4.6875 12.7072 4.6875 12.5C4.6875 12.2928 4.76981 12.0941 4.91632 11.9476C5.06284 11.8011 5.26155 11.7188 5.46875 11.7188Z"
                fill="black"
              />
              <path
                d="M5.79224 12.5L12.2719 18.9781C12.4186 19.1248 12.501 19.3238 12.501 19.5312C12.501 19.7387 12.4186 19.9377 12.2719 20.0844C12.1252 20.2311 11.9263 20.3135 11.7188 20.3135C11.5113 20.3135 11.3124 20.2311 11.1657 20.0844L4.13443 13.0531C4.06167 12.9806 4.00395 12.8943 3.96457 12.7994C3.92518 12.7045 3.90491 12.6028 3.90491 12.5C3.90491 12.3972 3.92518 12.2955 3.96457 12.2006C4.00395 12.1057 4.06167 12.0194 4.13443 11.9469L11.1657 4.91562C11.3124 4.76893 11.5113 4.68651 11.7188 4.68651C11.9263 4.68651 12.1252 4.76893 12.2719 4.91562C12.4186 5.06232 12.501 5.26129 12.501 5.46875C12.501 5.67621 12.4186 5.87518 12.2719 6.02187L5.79224 12.5Z"
                fill="black"
              />
            </svg>
          </button>
        ) : (
          <button
            className="p-1 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-7 h-7" viewBox="0 0 30 30" fill="none">
              <path
                d="M7.5 8.75H13.75C14.0815 8.75 14.3995 8.8817 14.6339 9.11612C14.8683 9.35054 15 9.66848 15 10C15 10.3315 14.8683 10.6495 14.6339 10.8839C14.3995 11.1183 14.0815 11.25 13.75 11.25H7.5C7.16848 11.25 6.85054 11.1183 6.61612 10.8839C6.3817 10.6495 6.25 10.3315 6.25 10C6.25 9.66848 6.3817 9.35054 6.61612 9.11612C6.85054 8.8817 7.16848 8.75 7.5 8.75ZM16.25 18.75H22.5C22.8315 18.75 23.1495 18.8817 23.3839 19.1161C23.6183 19.3505 23.75 19.6685 23.75 20C23.75 20.3315 23.6183 20.6495 23.3839 20.8839C23.1495 21.1183 22.8315 21.25 22.5 21.25H16.25C15.9185 21.25 15.6005 21.1183 15.3661 20.8839C15.1317 20.6495 15 20.3315 15 20C15 19.6685 15.1317 19.3505 15.3661 19.1161C15.6005 18.8817 15.9185 18.75 16.25 18.75ZM7.5 13.75H22.5C22.8315 13.75 23.1495 13.8817 23.3839 14.1161C23.6183 14.3505 23.75 14.6685 23.75 15C23.75 15.3315 23.6183 15.6495 23.3839 15.8839C23.1495 16.1183 22.8315 16.25 22.5 16.25H7.5C7.16848 16.25 6.85054 16.1183 6.61612 15.8839C6.3817 15.6495 6.25 15.3315 6.25 15C6.25 14.6685 6.3817 14.3505 6.61612 14.1161C6.85054 13.8817 7.16848 13.75 7.5 13.75Z"
                fill="#1E1E1E"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Title */}
      <div className="mt-8 relative z-10">
        <h1 className="text-3xl font-normal leading-tight">{title}</h1>
      </div>

      {/* Sliding Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Menu Header */}
        <div className="bg-iop-blue text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <div className="flex-1 p-6">
            <div className="space-y-4">
              {/* Profile Section */}
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-iop-blue rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Dr. XYZ</h3>
                    <p className="text-sm text-gray-600">
                      Medical Professional
                    </p>
                  </div>
                </div>
              </div>
              {/* Sign Out Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors group"
            >
              <svg
                className="w-5 h-5 text-red-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-red-600 group-hover:text-red-700 font-medium">
                Sign Out
              </span>
            </button>
          </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
