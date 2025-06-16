import { useState, useEffect } from "react";

export default function DeviceStatus() {
  const [connected, setConnected] = useState(() => {
    const saved = localStorage.getItem("deviceConnected");
    return saved ? JSON.parse(saved) : true;
  });
  const [loading, setLoading] = useState(() => {
    const saved = localStorage.getItem("deviceLoading");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("deviceConnected", JSON.stringify(connected));
  }, [connected]);

  useEffect(() => {
    localStorage.setItem("deviceLoading", JSON.stringify(loading));
  }, [loading]);

  const handleToggle = () => {
    setConnected((prev: boolean) => {
      const newConnected = !prev;
      window.dispatchEvent(new CustomEvent('deviceStatusChange', { detail: { connected: newConnected } }));
      return newConnected;
    });
  };

  const handleCalibrate = () => {
    if (!connected || loading) return;

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div className="bg-iop-light rounded-[20px] p-6 shadow-lg border border-black/10 mx-4 sm:mx-6 mt-4 sm:mt-6 relative z-10 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-black">Device Status</h2>
        <div
          className={`w-2.5 h-2.5 rounded-full opacity-80 ${
            connected ? "bg-iop-green" : "bg-red-500"
          }`}
        ></div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-lg text-black mr-4">Connection:</span>
          <button
            onClick={handleToggle}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${
              connected ? "bg-iop-green/80 text-black" : "bg-red-500 text-white"
            }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-lg text-black">Device ID:</span>
          <span className="ml-2">{connected ? "Tono V100" : "NA"}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleCalibrate}
          disabled={!connected || loading}
          className={`px-6 py-2 rounded font-semibold text-sm flex items-center gap-2 transition-opacity duration-300 ${
            connected ? "bg-iop-blue text-white" : "bg-iop-blue text-white opacity-50 cursor-not-allowed"
          } ${loading ? "opacity-80" : ""}`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Calibrate
              <svg className="w-5 h-5" viewBox="0 0 19 19" fill="none">
                <path
                  d="M5.10313 8.32201C4.87009 9.19165 4.90017 10.1109 5.18955 10.9634C5.47893 11.816 6.01463 12.5635 6.72889 13.1116C7.44316 13.6597 8.30391 13.9837 9.20231 14.0426C10.1007 14.1015 10.9964 13.8927 11.7761 13.4425M13.897 10.678C14.13 9.80837 14.0999 8.88916 13.8105 8.03661C13.5212 7.18406 12.9855 6.43647 12.2712 5.88838C11.5569 5.34029 10.6962 5.01631 9.79779 4.95741C8.8994 4.89852 8.00371 5.10735 7.22401 5.55751"
                  stroke="white"
                  strokeLinecap="round"
                />
                <path
                  d="M2.96875 9.89585L4.94792 7.91669L6.92708 9.89585M12.0729 9.10419L14.0521 11.0834L16.0313 9.10419"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}