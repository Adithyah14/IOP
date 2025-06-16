import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PatientReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [doctorNotes, setDoctorNotes] = useState("");

  const chartData = [
    { date: "Apr-10", rightEye: 17, leftEye: 16 },
    { date: "Apr-20", rightEye: 19, leftEye: 18 },
    { date: "Apr-30", rightEye: 20, leftEye: 19 },
    { date: "May-10", rightEye: 22, leftEye: 20 },
    { date: "May-20", rightEye: 21, leftEye: 19 },
    { date: "May-30", rightEye: 20, leftEye: 19 },
    { date: "Jun-09", rightEye: 18, leftEye: 17 },
  ];

  const newMeasurement = location.state?.newMeasurement;

  const safeParseIOP = (value, defaultValue) => {
    if (!value || value === "NA") return defaultValue;
    const parsed = parseInt(value);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const patientData = {
    name: "Patient 1",
    age: 39,
    patientId: "P001",
    lastVisited: newMeasurement?.date || "01-06-2025",
    rightEye: safeParseIOP(newMeasurement?.rightEye, 15),
    leftEye: safeParseIOP(newMeasurement?.leftEye, 16),
    status: "NORMAL",
  };

  const getPatientStatus = () => {
    if (!patientData) return { status: "NORMAL", color: "bg-iop-green" };
    const rightValue = patientData.rightEye || 0;
    const leftValue = patientData.leftEye || 0;
    const maxValue = Math.max(rightValue, leftValue);
    if (maxValue <= 15) return { status: "NORMAL", color: "bg-iop-green" };
    if (maxValue <= 20) return { status: "BORDERLINE", color: "bg-iop-yellow" };
    return { status: "AT RISK", color: "bg-iop-red" };
  };

  const patientStatus = getPatientStatus();

  useEffect(() => {
    if (newMeasurement?.notes) {
      setDoctorNotes(newMeasurement.notes);
    }
  }, [newMeasurement]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border border-black rounded-[10px] m-4 p-4">
        <button onClick={() => navigate("/view-patients")} className="mb-4">
          <svg className="w-5 h-5" viewBox="0 0 25 25" fill="none">
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

        <h1 className="text-xl font-normal mb-4">Patient Report</h1>

        
          <div className="mb-6">
  <div className="mb-6">
  <h2 className="text-lg text-iop-blue font-semibold text-center mb-4">
    IOP Trend
  </h2>
  <div className="h-64 sm:h-80 bg-gray-50 border border-gray-300 rounded-lg px-2 sm:px-4 py-2">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          fontSize={10}
          angle={-45}
          textAnchor="end"
          height={50}
        />
        <YAxis
          domain={[14, 24]}
          tick={{ fontSize: 10 }}
          label={{
            value: "IOP (mmHg)",
            angle: -90,
            position: "Left",
            fontSize: 10,
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: "12px" }}
          labelStyle={{ fontWeight: "bold" }}
        />
        <Legend
          verticalAlign="top"
          height={30}
          iconSize={10}
          wrapperStyle={{ fontSize: "12px" }}
        />
        <Line
          type="monotone"
          dataKey="rightEye"
          name="Right Eye"
          stroke="#2563EB"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="leftEye"
          name="Left Eye"
          stroke="#93C5FD"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

        </div>

        <div className="bg-iop-light rounded-lg p-3 shadow-lg mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{patientData?.name || "Unknown Patient"}</span>
              <div className="flex items-center gap-2">
                <div className={`${patientStatus?.color || "bg-iop-green"} rounded-full px-2 py-1`}>
                  <span className="text-white text-xs font-bold">{patientStatus?.status || "NORMAL"}</span>
                </div>
                {newMeasurement && (
                  <div className="bg-iop-blue rounded-full px-2 py-1">
                    <span className="text-white text-xs font-bold">NEW</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs">Age: {patientData?.age || "N/A"}</div>
            <div className="text-xs">Patient ID: {patientData?.patientId || "N/A"}</div>
            <div className="text-xs">Last Visited: {patientData?.lastVisited || "N/A"}</div>
            <div className="text-iop-blue font-bold text-xs">
              R: {patientData.rightEye} L: {patientData.leftEye} mmHg
            </div>
            {newMeasurement && (
              <div className="text-xs text-iop-blue">Updated {newMeasurement.date}</div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-normal mb-2">
            Doctor's Notes
            {newMeasurement?.notes && (
              <span className="text-iop-blue text-xs ml-2">● New notes added</span>
            )}
          </h3>
          <div className="border border-black rounded-lg p-3 h-28 bg-white">
            <textarea
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Add doctor's notes here..."
              className={`w-full h-full resize-none outline-none text-xs placeholder-gray-400 ${
                newMeasurement?.notes ? "border-l-4 border-iop-blue pl-2" : ""
              }`}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/measure-iop")}
            className="bg-iop-blue text-white px-4 py-2 rounded-lg text-xs font-medium"
          >
            Measure<br />IOP
          </button>
        </div>
      </div>
    </div>
  );
}