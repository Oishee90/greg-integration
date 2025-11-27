import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="text-red-500">
      <h1>Hello Dashboard</h1>
      <div className="relative inline-block mt-4 group rounded-full overflow-hidden">
        {/* Gradient Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#EA39EC] via-[#6E1EA3] to-[#000000] opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] z-0"></div>

        {/* Black Background Layer */}
        <div className="absolute inset-0 bg-black group-hover:opacity-0 transition-opacity duration-[1000ms] z-10"></div>

        {/* Text Button */}
        <button className="relative z-20 px-6 py-2 text-white rounded-full">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
