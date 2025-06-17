import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DeviceStatus from "@/components/DeviceStatus";
import Navigation from "@/components/Navigation";

export default function AddPatient() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the patient data
    console.log("Patient data:", formData);
    navigate("/view-patients");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <h2 className="text-2xl mb-6">Add Patient</h2>

          <div className="bg-iop-light rounded-[10px] p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-3 py-2 text-sm placeholder-black/50"
                  />
                  <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-iop-red text-xs">
                    *
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-3 py-2 text-sm placeholder-black/50"
                  />
                  <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-iop-red text-xs">
                    *
                  </span>
                </div>
              </div>

              {/* Second Row */}
              <div className="relative">
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-black px-3 py-2 text-sm placeholder-black/50"
                />
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-iop-red text-xs">
                  *
                </span>
              </div>

              {/* Third Row */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-black px-3 py-2 text-sm placeholder-black/50"
                />
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-iop-red text-xs">
                  *
                </span>
              </div>

              {/* Fourth Row */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-black px-3 py-2 text-sm placeholder-black/50"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-normal mb-2">
                  Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full border border-black px-3 py-2 text-sm h-20 resize-none"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-iop-blue text-white px-6 py-2 rounded-lg text-xs font-medium"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
