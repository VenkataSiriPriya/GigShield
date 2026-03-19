import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [platform, setPlatform] = useState("");
  const [earning, setEarning] = useState("");
  const [hours, setHours] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    // ✅ Basic validation
    if (!name || !city || !platform || !earning || !hours) {
      alert("Please fill all fields");
      return;
    }

    if (earning <= 0 || hours <= 0) {
      alert("Earnings and hours must be greater than 0");
      return;
    }

    // ✅ Create worker identity (SIMULATED SECURITY)
    const worker = {
      id: "WRK" + Date.now(), // unique ID
      verified: true, // simulated verification
      name,
      city,
      platform,
      avgEarningPerHour: Number(earning),
      workingHours: Number(hours),
    };

    // ✅ Store securely (for demo)
    localStorage.setItem("worker", JSON.stringify(worker));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-gray-100 p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-2 text-center">
          👤 Setup Your Profile
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Your details are used to calculate accurate income protection
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full p-3 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CITY */}
        <input
          type="text"
          placeholder="Enter City (e.g. Hyderabad)"
          className="w-full p-3 border rounded mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* PLATFORM */}
        <select
          className="w-full p-3 border rounded mb-4"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Select Platform</option>
          <option value="Swiggy">Swiggy</option>
          <option value="Zomato">Zomato</option>
        </select>

        {/* EARNINGS */}
        <input
          type="number"
          placeholder="Avg Earnings per Hour (₹)"
          className="w-full p-3 border rounded mb-4"
          value={earning}
          onChange={(e) => setEarning(e.target.value)}
        />

        {/* HOURS */}
        <input
          type="number"
          placeholder="Working Hours per Day"
          className="w-full p-3 border rounded mb-6"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Continue →
        </button>

        {/* SECURITY NOTE */}
        <div className="mt-4 bg-gray-100 p-3 rounded text-sm text-gray-600">
          🔐 Worker identity will be verified via platform integration (simulated)
        </div>

      </div>
    </div>
  );
}