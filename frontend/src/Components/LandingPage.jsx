// src/components/LandingPage.jsx

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { TypeAnimation } from "react-type-animation";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gray-50">
      <Navbar />

      {/* Blob Background */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      <main className="container mx-auto flex-grow px-6 py-16 relative z-10">

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 items-center bg-white rounded-[30px] p-10 md:p-16 shadow-xl">

          {/* Left Content */}
          <div className="text-center md:text-left">

            <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
              Track & Budget Wisely
            </h1>

            <TypeAnimation
              sequence={[
                "Control your money...",
                2000,
                "Track your expenses...",
                2000,
                "Plan your future...",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-xl md:text-2xl font-medium text-gray-700 block mb-4"
            />

            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              Easily manage your daily expenses with smart visual insights.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">

              <button
                onClick={() => navigate("/login")}
                className="
                  px-8 py-3
                  rounded-full
                  bg-black
                  text-white
                  font-semibold
                  text-lg
                  shadow-lg
                  hover:scale-105
                  hover:bg-blue-600
                  transition-all
                  duration-300
                "
              >
                Get Started
              </button>

            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center mt-10 md:mt-0">
            <img
              src="./Finance-rafiki.svg"
              alt="Expense illustration"
              className="w-full max-w-md animate-bounce"
            />
          </div>
        </div>

       {/* Features Section */}
<section className="mt-20 bg-white rounded-3xl p-10 shadow-lg">

  <h2 className="text-3xl font-bold text-center mb-10">
    Why Choose This App?
  </h2>

  <div className="grid md:grid-cols-3 gap-10 text-center">

    {/* Feature 1 */}
    <div>
      <img src="./secure.svg" alt="Secure" className="w-20 mx-auto mb-4" />
      <h5 className="text-xl font-semibold mb-2">
        🔒 Secure Authentication
      </h5>
      <p className="text-gray-600">
        Your data is protected with JWT-based secure login system.
      </p>
    </div>

    {/* Feature 2 */}
    <div>
      <img src="./real-time.svg" alt="Real-time Data" className="w-20 mx-auto mb-4" />
      <h5 className="text-xl font-semibold mb-2">
        ⚡ Instant Updates
      </h5>
      <p className="text-gray-600">
        Expenses sync in real-time with your database automatically.
      </p>
    </div>

    {/* Feature 3 */}
    <div>
      <img src="./graph.svg" alt="Visualization" className="w-20 mx-auto mb-4" />
      <h5 className="text-xl font-semibold mb-2">
        📊 Smart Analytics
      </h5>
      <p className="text-gray-600">
        Visualize spending patterns with interactive charts.
      </p>
    </div>

  </div>
</section>

        {/* How It Works */}
<section className="mt-20 bg-white rounded-3xl p-10 shadow-lg">

  <h2 className="text-3xl font-bold text-center mb-10">
    How It Works
  </h2>

  <div className="grid md:grid-cols-3 gap-10 text-center">

    <div>
      <h5 className="text-xl font-semibold mb-3">
        1️⃣ Create Your Account
      </h5>
      <p className="text-gray-600">
        Sign up securely and get your personal expense dashboard.
      </p>
    </div>

    <div>
      <h5 className="text-xl font-semibold mb-3">
        2️⃣ Track Every Expense
      </h5>
      <p className="text-gray-600">
        Add daily expenses with categories like food, travel, and shopping.
      </p>
    </div>

    <div>
      <h5 className="text-xl font-semibold mb-3">
        3️⃣ Get Smart Insights
      </h5>
      <p className="text-gray-600">
        Visualize spending patterns and improve your financial habits.
      </p>
    </div>

  </div>
</section>

      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;