import Header from "@/components/Header";
import DeviceStatus from "@/components/DeviceStatus";
import Navigation from "@/components/Navigation";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header
        title="Hello,&#10;Dr. XYZ"
      />
      <DeviceStatus />
      <Navigation />

      {/* Main Content */}
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl text-gray-600 mb-4">
            Welcome to IOP Measurement System
          </h2>
          <p className="text-gray-500">Select an option above to get started</p>
        </div>
      </div>
    </div>
  );
}
