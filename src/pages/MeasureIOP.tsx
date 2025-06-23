import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import DeviceStatus from "@/components/DeviceStatus";
import Navigation from "@/components/Navigation";
import { Capacitor } from '@capacitor/core';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';



interface Patient {
  id: string;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string | null;
}

export default function MeasureIOP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [baseIOP, setBaseIOP] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [rightEyeReading, setRightEyeReading] = useState<string>("NA");
  const [leftEyeReading, setLeftEyeReading] = useState<string>("NA");
  const [notes, setNotes] = useState<string>("");
  const [isLoadingLeft, setIsLoadingLeft] = useState<boolean>(false);
  const [isLoadingRight, setIsLoadingRight] = useState<boolean>(false);
  const [rightEyeAnimating, setRightEyeAnimating] = useState<boolean>(false);
  const [leftEyeAnimating, setLeftEyeAnimating] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(() => {
    const saved = localStorage.getItem("deviceConnected");
    return saved ? JSON.parse(saved) : true;
  });
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Fetch patients from Supabase and set selected patient from navigation state
  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*");
      if (error) {
        console.error("Error fetching patients:", error);
        return;
      }
      setPatients(data || []);
      const patientIdFromState = location.state?.patientId;
      if (patientIdFromState && data?.some(p => p.id === patientIdFromState)) {
        setSelectedPatient(patientIdFromState);
      } else if (data && data.length > 0) {
        setSelectedPatient(data[0].id);
      }
    };
    fetchPatients();
  }, [location.state]);

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("deviceConnected");
      setConnected(saved ? JSON.parse(saved) : true);
    };

    const handleDeviceStatusChange = (e: CustomEvent) => {
      setConnected(e.detail.connected);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("deviceStatusChange", handleDeviceStatusChange as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("deviceStatusChange", handleDeviceStatusChange);
    };
  }, []);

  useEffect(() => {
  const startCamera = async () => {
    if (!showCamera) return;

    if (Capacitor.getPlatform() === 'web') {
        // Web browser camera preview
        if (!videoRef.current) return;
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: "environment" },
              width: { ideal: 192 },
              height: { ideal: 192 },
            },
        });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Unable to access camera. Please ensure permissions are granted and use HTTPS.");
        setShowCamera(false);
      }
    } else {
      // ✅ Mobile (APK) using CameraPreview for live stream
      try {
        await CameraPreview.start({
          parent: "cameraPreview", // Ensure this div exists
          className: "cameraFeed",
          position: "rear",
          width: 192,
          height: 192,
          toBack: false,
        });
      } catch (err) {
        console.error("Mobile camera preview error:", err);
        alert("Unable to access camera on mobile.");
        setShowCamera(false);
      }
    }
  };

  startCamera();

  return () => {
    // ✅ Stop web stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // ✅ Stop mobile preview
    if (Capacitor.getPlatform() !== 'web') {
      CameraPreview.stop().catch((err) =>
        console.warn("Error stopping mobile camera preview:", err)
      );
    }
  };
}, [showCamera]);


  const selectedPatientData = patients.find((p) => p.id === selectedPatient);

  const generateIOPReading = (existingReading: number | null) => {
    if (existingReading === null) {
      return Math.floor(Math.random() * 36) + 10; // 10–45
    } else {
      const min = Math.max(10, existingReading - 4);
      const max = Math.min(45, existingReading + 4);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const getIOPRiskLevel = (reading: string) => {
    if (reading === "NA") return { level: "unknown", color: "text-gray-500" };
    const value = parseInt(reading);
    if (value <= 20) return { level: "normal", color: "text-iop-green" };
    if (value <= 30) return { level: "borderline", color: "text-iop-yellow" };
    return { level: "at-risk", color: "text-iop-red" };
  };

  const handleMeasureLeft = async () => {
    if (!connected) return;
    setIsLoadingLeft(true);
    setShowCamera(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const reading = generateIOPReading(baseIOP);
    setLeftEyeReading(`${reading}`);

    if (baseIOP === null) setBaseIOP(reading);

    setIsLoadingLeft(false);
    setLeftEyeAnimating(true);
    setShowCamera(false);
    setTimeout(() => setLeftEyeAnimating(false), 500);
  };

  const handleMeasureRight = async () => {
    if (!connected) return;
    setIsLoadingRight(true);
    setShowCamera(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const reading = generateIOPReading(baseIOP);
    setRightEyeReading(`${reading}`);

    if (baseIOP === null) setBaseIOP(reading);

    setIsLoadingRight(false);
    setRightEyeAnimating(true);
    setShowCamera(false);
    setTimeout(() => setRightEyeAnimating(false), 500);
  };

  const handleSave = async () => {
    if (!connected) return;
    const patient = patients.find((p) => p.id === selectedPatient);
    const measurementData = {
      id: patient?.patient_id || selectedPatient,
      last_visited: new Date().toISOString(),
      right_eye: rightEyeReading !== "NA" ? parseInt(rightEyeReading) : null,
      left_eye: leftEyeReading !== "NA" ? parseInt(leftEyeReading) : null,
      notes: notes || null,
    };

    const { error } = await supabase
      .from("measurements")
      .insert([measurementData]);

    if (error) {
      console.error("Error saving measurement:", error);
      alert("Failed to save measurement. Please try again.");
      return;
    }

    setBaseIOP(null); // Reset for next measurement session
    navigate(`/patient-report/${selectedPatient}`, {
      state: { newMeasurement: measurementData },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Hello,&#10;Dr.Neeraj Kumar" />
      <DeviceStatus />
      <Navigation />

      <div className="p-6">
        <div className="border border-black rounded-[15px] p-6">
          <h2 className="text-2xl mb-6">Measure IOP</h2>

          <div className="bg-iop-gray rounded-[20px] p-6 mb-6">
            <h3 className="text-center sm:text-center text-left font-semibold mb-6">
              Measurement
              <br />
              Instructions
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 min-w-12 bg-iop-blue rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Position Patient</h4>
                  <p className="text-sm font-light">
                    Have patient look straight ahead
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 min-w-12 bg-iop-blue rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Align Device</h4>
                  <p className="text-sm font-light">
                    Hold the device ~10 cm from the eye. Use on-screen guide to
                    center.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 min-w-12 bg-iop-blue rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Start Measurement</h4>
                  <p className="text-sm font-light">
                    Tap Measure and keep device steady. Auto air puff + scan
                    will follow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-iop-light rounded-[10px] p-4 mb-6 shadow-lg ${!connected ? "opacity-30" : ""}`}>
            <div className="sm:hidden space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-20 flex-shrink-0">
                  Patient ID:
                </label>
                <div className="flex-1">
                  <select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full border border-black rounded px-2 py-1 text-sm bg-white"
                    disabled={!connected}
                  >
                    {patients
  .sort((a, b) => a.patient_id.localeCompare(b.patient_id))
  .map((patient) => (
    <option key={patient.id} value={patient.id}>
      {patient.patient_id}
    </option>
))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-20 flex-shrink-0">
                  Name:
                </label>
                <span className="text-sm font-medium">
                  {selectedPatientData?.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-20 flex-shrink-0">
                  Age:
                </label>
                <span className="text-sm font-medium">
                  {selectedPatientData?.age}
                </span>
              </div>
            </div>
            <div className="hidden sm:grid grid-cols-3 gap-4 text-lg">
              <div>
                <label className="block mb-2">Patient ID:</label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1 text-base"
                  disabled={!connected}
                >
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.patient_id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Patient Name:</label>
                <span className="text-base">{selectedPatientData?.name}</span>
              </div>
              <div>
                <label className="block mb-2">Age:</label>
                <span className="text-base">{selectedPatientData?.age}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center overflow-hidden">
              {showCamera ? (
                Capacitor.getPlatform() === 'web' ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-full"
                    autoPlay
                  />
                ) : (
                  <div 
                    id="cameraPreview"
                    className="w-14 h-14 bg-white-200 rounded-lg flex items-center justify-center"
                  />
                )
              ) : (
                <div className="w-14 h-14 bg-white-200 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    viewBox="0 0 57 57"
                    fill="none"
                  >
                    <path
                      d="M27.3125 19C33.25 19 38 23.75 38 29.6875C38 35.625 33.25 40.375 27.3125 40.375C21.375 40.375 16.625 35.625 16.625 29.6875C16.625 23.75 21.375 19 27.3125 19ZM27.3125 21.375C25.1079 21.375 22.9936 22.2508 21.4347 23.8097C19.8758 25.3686 19 27.4829 19 29.6875C19 31.8921 19.8758 34.0064 21.4347 35.5653C22.9936 37.1242 25.1079 38 27.3125 38C29.5171 38 31.6314 37.1242 33.1903 35.5653C34.7492 34.0064 35.625 31.8921 35.625 29.6875C35.625 27.4829 34.7492 25.3686 33.1903 23.8097C31.6314 22.2508 29.5171 21.375 27.3125 21.375ZM11.875 11.875H16.625L21.375 7.125H33.25L38 11.875H42.75C44.6397 11.875 46.4519 12.6257 47.7881 13.9619C49.1243 15.2981 49.875 17.1103 49.875 19V40.375C49.875 42.2647 49.1243 44.0769 47.7881 45.4131C46.4519 46.7493 44.6397 47.5 42.75 47.5H11.875C9.98533 47.5 8.17306 46.7493 6.83686 45.4131C5.50067 44.0769 4.75 42.2647 4.75 40.375V19C4.75 17.1103 5.50067 15.2981 6.83686 13.9619C8.17306 12.6257 9.98533 11.875 11.875 11.875ZM22.3487 9.5L17.5987 14.25H11.875C10.6152 14.25 9.40704 14.7504 8.51624 15.6412C7.62544 16.532 7.125 17.7402 7.125 19V40.375C7.125 41.6348 7.62544 42.843 8.51624 43.7338C9.40704 44.6246 10.6152 45.125 11.875 45.125H42.75C44.0098 45.125 45.218 44.6246 46.1088 43.7338C46.9996 42.843 47.5 41.6348 47.5 40.375V19C47.5 17.7402 46.9996 16.532 46.1088 15.6412C45.218 14.7504 44.0098 14.25 42.75 14.25H37.0262L32.2763 9.5H22.3487Z"
                      fill="currentColor"
                      fillOpacity="0.15"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={handleMeasureLeft}
              disabled={isLoadingLeft || isLoadingRight || !connected}
              className={`
                bg-iop-blue text-white px-6 py-3 rounded font-semibold text-sm
                flex flex-col items-center gap-1 min-w-[140px] justify-center
                ${isLoadingLeft ? "animate-pulse bg-iop-blue-dark" : ""}
                ${isLoadingLeft || isLoadingRight || !connected ? "opacity-30 cursor-not-allowed" : "hover:bg-iop-blue-dark hover:scale-105 active:scale-95"}
              `}
            >
              {isLoadingLeft ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Measuring...</span>
                </>
              ) : (
                <>
                  <span>Measure</span>
                  <span>Left</span>
                </>
              )}
            </button>
            <button
              onClick={handleMeasureRight}
              disabled={isLoadingLeft || isLoadingRight || !connected}
              className={`
                bg-iop-blue text-white px-6 py-3 rounded font-semibold text-sm
                flex flex-col items-center gap-1 min-w-[140px] justify-center
                ${isLoadingRight ? "animate-pulse bg-iop-blue-dark" : ""}
                ${isLoadingLeft || isLoadingRight || !connected ? "opacity-30 cursor-not-allowed" : "hover:bg-iop-blue-dark hover:scale-105 active:scale-95"}
              `}
            >
              {isLoadingRight ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Measuring...</span>
                </>
              ) : (
                <>
                  <span>Measure</span>
                  <span>Right</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-lg">Right Eye</span>
              <div className="flex items-center gap-2">
                {isLoadingRight ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-iop-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-500">Measuring...</span>
                  </div>
                ) : (
                  <span
                    className={`
                      text-lg font-bold transition-all duration-500
                      ${rightEyeAnimating ? "scale-125 animate-bounce" : "scale-100"}
                      ${getIOPRiskLevel(rightEyeReading).color}
                    `}
                  >
                    {rightEyeReading === "NA"
                      ? "NA"
                      : `${rightEyeReading} mmHg`}
                  </span>
                )}
                {rightEyeReading !== "NA" && !isLoadingRight && (
                  <div
                    className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${getIOPRiskLevel(rightEyeReading).level === "normal" ? "bg-iop-green animate-pulse" : ""}
                    ${getIOPRiskLevel(rightEyeReading).level === "borderline" ? "bg-iop-yellow animate-pulse" : ""}
                    ${getIOPRiskLevel(rightEyeReading).level === "at-risk" ? "bg-iop-red animate-pulse" : ""}
                  `}
                  ></div>
                )}
              </div>
            </div>
            <hr className="opacity-30" />
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-lg">Left Eye</span>
              <div className="flex items-center gap-2">
                {isLoadingLeft ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-iop-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-500">Measuring...</span>
                  </div>
                ) : (
                  <span
                    className={`
                      text-lg font-bold transition-all duration-500
                      ${leftEyeAnimating ? "scale-125 animate-bounce" : "scale-100"}
                      ${getIOPRiskLevel(leftEyeReading).color}
                    `}
                  >
                    {leftEyeReading === "NA" ? "NA" : `${leftEyeReading} mmHg`}
                  </span>
                )}
                {leftEyeReading !== "NA" && !isLoadingLeft && (
                  <div
                    className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${getIOPRiskLevel(leftEyeReading).level === "normal" ? "bg-iop-green animate-pulse" : ""}
                    ${getIOPRiskLevel(leftEyeReading).level === "borderline" ? "bg-iop-yellow animate-pulse" : ""}
                    ${getIOPRiskLevel(leftEyeReading).level === "at-risk" ? "bg-iop-red animate-pulse" : ""}
                  `}
                  ></div>
                )}
              </div>
            </div>
            <hr className="opacity-30" />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="write here..."
              className="w-full border border-black/30 rounded p-3 text-sm h-20 resize-none placeholder-black/50"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSave}
              disabled={!connected}
              className={`
                bg-iop-blue text-white px-8 py-3 rounded font-semibold text-sm flex items-center gap-2
                transition-all duration-300 shadow-lg
                ${!connected ? "opacity-30 cursor-not-allowed" : "hover:bg-iop-blue-dark hover:scale-105 active:scale-95"}
              `}
            >
              Save
              <svg className="w-4 h-4" viewBox="0 0 17 18" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.24999 1.5C3.87427 1.5 3.51394 1.65804 3.24826 1.93934C2.98258 2.22064 2.83333 2.60218 2.83333 3V15C2.83333 15.3978 2.98258 15.7794 3.24826 16.0607C3.51394 16.342 3.87427 16.5 4.24999 16.5H12.75C13.1257 16.5 13.4861 16.342 13.7517 16.0607C14.0174 15.7794 14.1667 15.3978 14.1667 15V4.8105C14.1666 4.41271 14.0173 4.03124 13.7516 3.75L12.0417 1.9395C11.776 1.65818 11.4158 1.50008 11.0401 1.5H4.24999ZM4.24999 3H11.0401L12.75 4.8105V15H4.24999V3ZM11.5019 8.09475C11.5696 8.02557 11.6235 7.94281 11.6606 7.8513C11.6978 7.7598 11.7173 7.66139 11.7181 7.5618C11.7189 7.46222 11.701 7.36346 11.6654 7.27129C11.6298 7.17911 11.5772 7.09537 11.5107 7.02495C11.4442 6.95453 11.3651 6.89884 11.278 6.86113C11.191 6.82342 11.0977 6.80445 11.0037 6.80531C10.9096 6.80618 10.8167 6.82687 10.7302 6.86617C10.6438 6.90548 10.5657 6.96262 10.5003 7.03425L7.49558 10.2165L6.49329 9.15525C6.35969 9.01863 6.18077 8.94304 5.99504 8.94474C5.80932 8.94645 5.63166 9.02533 5.50033 9.16439C5.369 9.30344 5.29451 9.49155 5.29289 9.6882C5.29128 9.88485 5.36267 10.0743 5.4917 10.2157L6.94379 11.754C7.01614 11.8306 7.10205 11.8915 7.19661 11.9329C7.29117 11.9744 7.39252 11.9958 7.49487 11.9958C7.59722 11.9958 7.69857 11.9744 7.79313 11.9329C7.88769 11.8915 7.9736 11.8306 8.04595 11.754L11.5019 8.09475Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
