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
    <div className="relative overflow-hidden">
      {/* background */}
      <div className="bg-gradient-to-br from-iop-blue via-iop-blue to-iop-blue rounded-b-[30px] px-4 sm:px-6 py-6 text-white relative overflow-hidden shadow-xl">
        {/* decorative elements */}
        <div className="absolute top-4 right-8 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="45" ry="25" fill="currentColor" />
            <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.7" />
            <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        
        {/* Vision chart pattern */}
        <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
          <div className="text-6xl font-bold">E</div>
          <div className="text-4xl font-bold ml-4">F P</div>
          <div className="text-2xl font-bold ml-2">T O Z</div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at center, transparent 30%, currentColor 31%, currentColor 32%, transparent 33%)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between relative z-10">
          {showBackButton ? (
            <button 
              onClick={onBack} 
              className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 group"
            >
              <svg className="w-6 h-6 group-hover:translate-x-[-2px] transition-transform" viewBox="0 0 25 25" fill="none">
                <path
                  d="M5.46875 11.7188H21.0938C21.301 11.7188 21.4997 11.8011 21.6462 11.9476C21.7927 12.0941 21.875 12.2928 21.875 12.5C21.875 12.7072 21.7927 12.9059 21.6462 13.0524C21.4997 13.1989 21.301 13.2812 21.0938 13.2812H5.46875C5.26155 13.2812 5.06284 13.1989 4.91632 13.0524C4.76981 12.9059 4.6875 12.7072 4.6875 12.5C4.6875 12.2928 4.76981 12.0941 4.91632 11.9476C5.06284 11.8011 5.26155 11.7188 5.46875 11.7188Z"
                  fill="white"
                />
                <path
                  d="M5.79224 12.5L12.2719 18.9781C12.4186 19.1248 12.501 19.3238 12.501 19.5312C12.501 19.7387 12.4186 19.9377 12.2719 20.0844C12.1252 20.2311 11.9263 20.3135 11.7188 20.3135C11.5113 20.3135 11.3124 20.2311 11.1657 20.0844L4.13443 13.0531C4.06167 12.9806 4.00395 12.8943 3.96457 12.7994C3.92518 12.7045 3.90491 12.6028 3.90491 12.5C3.90491 12.3972 3.92518 12.2955 3.96457 12.2006C4.00395 12.1057 4.06167 12.0194 4.13443 11.9469L11.1657 4.91562C11.3124 4.76893 11.5113 4.68651 11.7188 4.68651C11.9263 4.68651 12.1252 4.76893 12.2719 4.91562C12.4186 5.06232 12.501 5.26129 12.501 5.46875C12.501 5.67621 12.4186 5.87518 12.2719 6.02187L5.79224 12.5Z"
                  fill="white"
                />
              </svg>
            </button>
          ) : (
            <button
              className="p-3 relative z-50 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-7 h-7" viewBox="0 0 30 30" fill="none">
                <path
                  d="M7.5 8.75H13.75C14.0815 8.75 14.3995 8.8817 14.6339 9.11612C14.8683 9.35054 15 9.66848 15 10C15 10.3315 14.8683 10.6495 14.6339 10.8839C14.3995 11.1183 14.0815 11.25 13.75 11.25H7.5C7.16848 11.25 6.85054 11.1183 6.61612 10.8839C6.3817 10.6495 6.25 10.3315 6.25 10C6.25 9.66848 6.3817 9.35054 6.61612 9.11612C6.85054 8.8817 7.16848 8.75 7.5 8.75ZM16.25 18.75H22.5C22.8315 18.75 23.1495 18.8817 23.3839 19.1161C23.6183 19.3505 23.75 19.6685 23.75 20C23.75 20.3315 23.6183 20.6495 23.3839 20.8839C23.1495 21.1183 22.8315 21.25 22.5 21.25H16.25C15.9185 21.25 15.6005 21.1183 15.3661 20.8839C15.1317 20.6495 15 20.3315 15 20C15 19.6685 15.1317 19.3505 15.3661 19.1161C15.6005 18.8817 15.9185 18.75 16.25 18.75ZM7.5 13.75H22.5C22.8315 13.75 23.1495 13.8817 23.3839 14.1161C23.6183 14.3505 23.75 14.6685 23.75 15C23.75 15.3315 23.6183 15.6495 23.3839 15.8839C23.1495 16.1183 22.8315 16.25 22.5 16.25H7.5C7.16848 16.25 6.85054 16.1183 6.61612 15.8839C6.3817 15.6495 6.25 15.3315 6.25 15C6.25 14.6685 6.3817 14.3505 6.61612 14.1161C6.85054 13.8817 7.16848 13.75 7.5 13.75Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Title Section */}
        <div className="mt-8 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-300" viewBox="0 0 24 24" fill="none">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
                      stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <div className="w-1 h-8 bg-gradient-to-b from-blue-300 to-transparent rounded-full"></div>
              <div className="w-2 h-2 bg-blue-300/80 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-wide text-white drop-shadow-sm">
            {title}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-300/80 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Subtle animated wave effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-blue-400/10 animate-pulse"></div>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50
        transform transition-all duration-300 ease-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-iop-blue to-iop-blue text-white p-4 sm:p-6 relative ">
          <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx="50" cy="50" rx="45" ry="25" fill="currentColor" />
              <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.7" />
            </svg>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
                        stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Menu</h2>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
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
        <div className="flex flex-col h-relative bg-gradient-to-b from-gray-50 to-white">
          {/* Profile Section */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
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
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">Rajendra kapoor</h3>
                    <div className="flex items-center gap-2 mt-2">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 mt-auto">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 p-4 text-center bg-white hover:bg-red-50 rounded-xl transition-all duration-200 group hover:shadow-lg border-2 border-red-100 hover:border-red-200 active:scale-95"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors flex-shrink-0">
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
              </div>
              <div className="text-left flex-1">
                <div className="text-red-600 group-hover:text-red-700 font-bold text-base sm:text-lg">
                  Sign Out
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
