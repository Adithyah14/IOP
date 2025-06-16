import Patient_Header from "@/components/Patient_Header";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

export default function PatientDashboard() {
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
      <Patient_Header title="Hello, Patient 1" />
      <div className="border border-white rounded-[10px] m-4 p-4">
        <div className="mb-6">
          <div className="mb-6">
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
          <button className="bg-iop-blue text-white px-4 py-2 rounded-lg text-xs font-medium">
            View Old Records
          </button>
        </div>
      </div>
    </div>
  );
}