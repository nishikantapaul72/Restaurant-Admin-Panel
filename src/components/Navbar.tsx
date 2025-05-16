"use client";
import { Button } from "primereact/button";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
    
      <h1 className="text-xl font-bold">Restaurant Admin</h1>
      <Button
        label="Logout"
        className="p-button-text p-button-danger"
        onClick={handleLogout}
      />
    </div>
  );
}