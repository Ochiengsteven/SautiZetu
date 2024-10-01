"use client";

import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/signup");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-green-500 text-xl font-bold">SautiZetu</div>
      <div className="flex space-x-4">
        <a href="#home" className="text-gray-700 hover:text-green-400">
          Home
        </a>
        <a href="#features" className="text-gray-700 hover:text-green-400">
          About
        </a>
        <a href="#howitworks" className="text-gray-700 hover:text-green-400">
          How it Works
        </a>
      </div>
      <div className="flex space-x-2">
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button
          type="default"
          onClick={handleRegister}
          className="text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600 hover:border-green-600"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
