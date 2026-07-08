import logo from "../assets/logo.jpg";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md h-20 flex items-center justify-between px-8">

      <div className="flex items-center gap-4">

        <img
          src={logo}
          alt="Mghetto Retailer"
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            MGHETTO RETAILER
          </h1>

          <p className="text-gray-500 text-sm">
            Smart Retail Management System
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          A
        </div>

        <div>
          <h2 className="text-base font-semibold">
            Administrator
          </h2>

          <p className="text-sm text-gray-500">
            Online
          </p>
        </div>

      </div>

    </header>
  );
}