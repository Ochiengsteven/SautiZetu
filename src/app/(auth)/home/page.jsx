/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Navbar from "./Navbar";
import HowItWorks from "./Howitworks";
import Features from "./Features";
import SautizetuIntro from "./SautizetuIntro";
import WhySautiZetu from "./WhySautiZetu";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/signup");
  };
  return (
    <div>
      <Navbar />
      <div
        className="max-w-[600px] px-8 mx-auto mt-10 lg:mt-20 text-center"
        id="home"
      >
        <h3 className="text-black text-3xl lg:text-4xl mb-3 font-semibold">
          Empowering <span className="text-green-500">Voices</span> and Driving
          <span className="text-green-500"> Change</span>
        </h3>
        <p className="text-gray-500">
          Connect, mobilize, and make a difference in Kenya&apos;s future. Join
          our platform to stay informed, engage in meaningful discussions, and
          take action against injustice.
        </p>
        <button
          onClick={handleRegister}
          class="px-4 mt-4 py-2 bg-green-500 text-white border border-green-500 border-opacity-20 rounded-lg shadow-lg hover:bg-opacity-60 transition duration-300 ease-in-out"
        >
          Get Involved
        </button>
      </div>
      <div id="howitworks" className="mt-10">
        <HowItWorks />
      </div>
      <div id="features" className="mt-10">
        <Features />
      </div>
      <div className="mt-10">
        <SautizetuIntro />
      </div>
      <div className="mt-10">
        <WhySautiZetu />
      </div>
    </div>
  );
};

export default page;
