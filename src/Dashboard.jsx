import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState("Loading...");
  const [error, setError] = useState("");

  const API_KEY = "a13941edda98b0cabe4058b2eb17bbf7";
  const CITY = "Hyderabad";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError("API Error: " + data.message);
          return;
        }
        setWeather(data);
        calculateRisk(data);
      })
      .catch(() => setError("Failed to fetch weather data"));
  }, []);

  const calculateRisk = (data) => {
    const temp = data?.main?.temp || 0;
    const rain = data?.rain?.["1h"] || 0;

    let score = temp * 0.3 + rain * 10 * 0.7;

    if (score > 50) setRisk("HIGH");
    else if (score > 25) setRisk("MEDIUM");
    else setRisk("LOW");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Gig Insurance Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Protect your earnings from weather disruptions
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <p className="text-gray-500">🌡 Temperature</p>
          <h2 className="text-3xl font-bold mt-2">
            {weather?.main?.temp ? `${weather.main.temp}°C` : "--"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <p className="text-gray-500">🌧 Rainfall</p>
          <h2 className="text-3xl font-bold mt-2">
            {weather?.rain?.["1h"] ? `${weather.rain["1h"]} mm` : "0 mm"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <p className="text-gray-500">⚠ Risk Level</p>
          <h2
            className={`text-3xl font-bold mt-2 ${
              risk === "HIGH"
                ? "text-red-500"
                : risk === "MEDIUM"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {risk}
          </h2>
        </div>
      </div>

      {/* INSURANCE CARD */}
      <motion.div
        className="mt-8 bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-semibold mb-2">Your Plan</h2>
          <p className="text-gray-600">₹29/week • Coverage ₹1000</p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Activate Policy
        </button>
      </motion.div>

      {/* BOTTOM SECTION */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-gray-500">💸 Estimated Loss Today</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{risk === "HIGH" ? 500 : risk === "MEDIUM" ? 250 : 50}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-gray-500">⚡ Auto Payout</p>
          <h2
            className={`text-2xl font-bold mt-2 ${
              risk === "HIGH" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {risk === "HIGH" ? "Triggered ✅" : "Not Triggered"}
          </h2>
        </div>

      </div>

    </div>
  );
}