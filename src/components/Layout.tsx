import { DeviceStatusProvider } from "@/components/DeviceStatusContext";
import DeviceStatus from "@/components/DeviceStatus";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <DeviceStatusProvider>
    <DeviceStatus />
    <Outlet />
  </DeviceStatusProvider>
);

export default Layout;