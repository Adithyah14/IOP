import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DeviceStatus from "@/components/DeviceStatus";
import Navigation from "@/components/Navigation";

interface Patient {
  id: string;
  name: string;
  age: number;
  patientId: string;
  lastVisited: string;
  rightEye: number;
  leftEye: number;
  status: "NORMAL" | "BORDERLINE" | "AT RISK";
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Rajendra Kapoor",
    age: 65,
    patientId: "P001",
    lastVisited: "01-06-2025",
    rightEye: 15,
    leftEye: 17,
    status: "NORMAL",
  },
  {
    id: "2",
    name: "Sundar Ramaswamy",
    age: 67,
    patientId: "P002",
    lastVisited: "01-06-2025",
    rightEye: 21,
    leftEye: 22,
    status: "BORDERLINE",
  },
  {
    id: "3",
    name: "Vimala Deshmukh",
    age: 72,
    patientId: "P003",
    lastVisited: "01-06-2025",
    rightEye: 26,
    leftEye: 25,
    status: "AT RISK",
  },
  {
    id: "4",
    name: "Mohanlal Joshi",
    age: 66,
    patientId: "P004",
    lastVisited: "01-06-2025",
    rightEye: 18,
    leftEye: 19,
    status: "NORMAL",
  },
  {
    id: "5",
    name: "Suresh Sharma",
    age: 70,
    patientId: "P005",
    lastVisited: "01-06-2025",
    rightEye: 25,
    leftEye: 23,
    status: "AT RISK",
  },
];

export default function ViewPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NORMAL":
        return "bg-iop-green";
      case "BORDERLINE":
        return "bg-iop-yellow";
      case "AT RISK":
        return "bg-iop-red";
      default:
        return "bg-gray-400";
    }
  };

  const getPatientCardBgColor = (status: string) => {
    switch (status) {
      case "NORMAL":
        return "bg-iop-green/15";
      case "BORDERLINE":
        return "bg-iop-yellow/15";
      case "AT RISK":
        return "bg-iop-red/15";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        title="Hello,&#10;Dr.Neeraj Kumar"
      />
      <DeviceStatus />
      <Navigation />

      {/* Main Content */}
      <div className="p-6">
        <div className="border border-black rounded-[15px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Patients</h2>
            <button
              onClick={() => navigate("/add-patient")}
              className="bg-iop-blue text-white px-4 py-2 rounded-lg text-xs font-medium"
            >
              Add Patient
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="border border-black rounded-full p-3 flex items-center">
              <svg
                className="w-6 h-6 text-black mr-3"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 16.5C14.0376 16.5 16.5 14.0376 16.5 11C16.5 7.96243 14.0376 5.5 11 5.5C7.96243 5.5 5.5 7.96243 5.5 11C5.5 14.0376 7.96243 16.5 11 16.5Z"
                  stroke="black"
                />
                <path
                  d="M15 15L19 19"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* Patient List */}
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`${getPatientCardBgColor(
                  patient.status,
                )} rounded-lg p-4 shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow`}
                onClick={() => navigate(`/patient-report/${patient.id}`)}
              >
                <div className="flex flex-row items-start justify-between">
                  {/* Patient Info Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-1">
                      <span className="font-medium text-sm">
                        {patient.name}
                      </span>
                      <span className="text-sm">Age: {patient.age}</span>
                    </div>
                    <div className="text-sm mb-1">
                      Patient ID: {patient.patientId}
                    </div>
                    <div className="text-sm mb-2">
                      Last Visited: {patient.lastVisited}
                    </div>

                    {/* Mobile IOP Values and Status */}
                    <div className="sm:hidden flex flex-col gap-1">
                      <div className="text-sm font-medium text-gray-700">
                        R: {patient.rightEye} L: {patient.leftEye} mmHg
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`${getStatusColor(patient.status)} rounded-full px-2 py-1`}
                        >
                          <span className="text-white text-xs font-bold">
                            {patient.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop IOP Values and Status */}
                  <div className="hidden sm:flex flex-col items-end gap-2">
                    <div className="text-sm font-medium text-gray-700">
                      R: {patient.rightEye} L: {patient.leftEye} mmHg
                    </div>
                    <div
                      className={`${getStatusColor(patient.status)} rounded-full px-3 py-1`}
                    >
                      <span className="text-white text-xs font-bold">
                        {patient.status}
                      </span>
                    </div>
                  </div>

                  {/* Chart Icon */}
                  <svg
                    className="w-5 h-5 ml-4 mt-1 flex-shrink-0"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <path
                      d="M8.90625 11.875H10.0938V14.25H8.90625V11.875ZM11.875 10.6875H13.0625V14.25H11.875V10.6875ZM5.9375 8.3125H7.125V14.25H5.9375V8.3125Z"
                      fill="#1E1E1E"
                    />
                    <path
                      d="M14.8438 2.96875H13.0625V2.375C13.0625 2.06006 12.9374 1.75801 12.7147 1.53531C12.492 1.31261 12.1899 1.1875 11.875 1.1875H7.125C6.81006 1.1875 6.50801 1.31261 6.28531 1.53531C6.06261 1.75801 5.9375 2.06006 5.9375 2.375V2.96875H4.15625C3.84131 2.96875 3.53926 3.09386 3.31656 3.31656C3.09386 3.53926 2.96875 3.84131 2.96875 4.15625V16.625C2.96875 16.9399 3.09386 17.242 3.31656 17.4647C3.53926 17.6874 3.84131 17.8125 4.15625 17.8125H14.8438C15.1587 17.8125 15.4607 17.6874 15.6834 17.4647C15.9061 17.242 16.0312 16.9399 16.0312 16.625V4.15625C16.0312 3.84131 15.9061 3.53926 15.6834 3.31656C15.4607 3.09386 15.1587 2.96875 14.8438 2.96875ZM7.125 2.375H11.875V4.75H7.125V2.375ZM14.8438 16.625H4.15625V4.15625H5.9375V5.9375H13.0625V4.15625H14.8438V16.625Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
