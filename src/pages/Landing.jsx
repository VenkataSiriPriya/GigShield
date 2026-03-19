import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 text-white flex flex-col justify-center items-center p-6">

      {/* APP NAME */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        GigShield
      </motion.h1>

      {/* TAGLINE */}
      <motion.p
        className="text-lg md:text-xl max-w-xl text-center mb-6 text-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Protect your daily earnings with smart, automated insurance
        for delivery partners.
      </motion.p>

      {/* DESCRIPTION */}
      <motion.p
        className="text-sm md:text-base max-w-lg text-center mb-8 text-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Built for Swiggy & Zomato partners. Get instant payouts during
        rain, extreme heat, and unexpected disruptions — no claims needed.
      </motion.p>

      {/* CTA BUTTON */}
      <motion.button
        onClick={() => navigate("/onboarding")}
        className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started →
      </motion.button>

      {/* SMALL TRUST LINE */}
      <p className="text-xs text-blue-200 mt-6">
        AI-driven • Instant payouts • No paperwork
      </p>

    </div>
  );
}