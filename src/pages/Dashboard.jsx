import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState("Loading...");
  const [error, setError] = useState("");

  // ✅ Worker Data
  const worker =
    JSON.parse(localStorage.getItem("worker")) || {};

  const city = worker.city || "Hyderabad";
  const platform = worker.platform || "Swiggy";
  const name = worker.name || "Ravi";

  const earningPerHour = worker.avgEarningPerHour || 100;

  const API_KEY = "a13941edda98b0cabe4058b2eb17bbf7"

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(data.message);
          return;
        }
        setWeather(data);
        calculateRisk(data);
      })
      .catch(() => setError("API Error"));
  }, []);

  // ✅ Risk Calculation
  const calculateRisk = (data) => {
    const temp = data?.main?.temp || 0;
    const rain = data?.rain?.["1h"] || 0;

    let score = temp * 0.3 + rain * 10 * 0.7;

    if (score > 50) setRisk("HIGH");
    else if (score > 25) setRisk("MEDIUM");
    else setRisk("LOW");
  };

  // ✅ Loss Logic
  const hoursLost =
    risk === "HIGH" ? 5 :
    risk === "MEDIUM" ? 2 :
    0;

  // ✅ Insurance Calculation
  const rawPayout = earningPerHour * hoursLost;
  const coverageLimit = 1000;
  const payout = Math.min(rawPayout, coverageLimit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {name} ({platform}) 👋
        </h1>
        <p className="text-gray-500">City: {city}</p>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm mt-3">
  🔐 Worker ID: {worker.id} <br />
  ✔ Verified Account
</div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* WEATHER */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">🌡 Temperature</p>
          <h2 className="text-2xl font-bold">
            {weather?.main?.temp || "--"}°C
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">🌧 Rainfall</p>
          <h2 className="text-2xl font-bold">
            {weather?.rain?.["1h"] || 0} mm
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">⚠ Risk Level</p>
          <h2 className={`text-2xl font-bold ${
            risk === "HIGH"
              ? "text-red-500"
              : risk === "MEDIUM"
              ? "text-yellow-500"
              : "text-green-500"
          }`}>
            {risk}
          </h2>
        </div>
      </div>

      {/* INSURANCE */}
      <motion.div
        className="mt-8 bg-white p-6 rounded-2xl shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-2">Insurance Plan</h2>
        <p>₹29/week • Coverage ₹{coverageLimit}</p>

        <p className="text-sm text-gray-600 mt-2">
          Covers income loss due to weather disruptions.
        </p>

        <div className="mt-3 bg-blue-50 p-3 rounded-lg text-sm">
          ✔ Income loss covered  
          ❌ No health / vehicle claims
        </div>
      </motion.div>

      {/* LOW RISK */}
      {risk === "LOW" && (
        <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-xl">
          ✅ No income loss detected. Normal working conditions.
        </div>
      )}

      {/* HIGH RISK */}
      {risk === "HIGH" && (
        <motion.div
          className="mt-6 bg-red-50 border border-red-200 p-6 rounded-2xl shadow"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <h2 className="text-xl font-bold text-red-600 mb-2">
            🚨 Disruption Detected
          </h2>

          <p className="mb-2">
            Weather has disrupted delivery operations.
          </p>

          <div className="bg-white p-3 rounded mb-3">
            Estimated Loss: <b>₹{rawPayout}</b>
          </div>

          {/* 👇 CAP MESSAGE */}
          {rawPayout > coverageLimit && (
            <p className="text-sm text-orange-600 mb-2">
              ⚠ Capped to ₹{coverageLimit} (policy limit)
            </p>
          )}

          <p className="text-sm text-gray-600">
            ₹{earningPerHour}/hour × {hoursLost} hours lost
          </p>

          <div className="bg-green-100 text-green-700 p-3 rounded mt-3 font-semibold">
            💸 Payout: ₹{payout}
          </div>
        </motion.div>
      )}

      {/* SUMMARY */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">💸 Estimated Loss</p>
          <h2 className="text-2xl font-bold">₹{payout}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">⚡ Status</p>
          <h2 className={`text-xl font-bold ${
            risk === "HIGH" ? "text-green-600" : "text-gray-500"
          }`}>
            {risk === "HIGH" ? "Triggered ✅" : "Not Triggered"}
          </h2>
        </div>
      </div>

      {/* DEMO */}
      <div className="mt-6">
        <button
          onClick={() => setRisk("HIGH")}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
        >
          🔥 Simulate High Risk
        </button>
      </div>

    </div>
  );
}