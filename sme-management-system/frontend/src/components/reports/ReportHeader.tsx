import {
  FileText,
  FileSpreadsheet,
  Printer,
} from "lucide-react";

export default function ReportHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Business Reports
          </h1>

          <p className="text-gray-500 mt-1">
            Track sales, expenses and inventory performance.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-xl">

            <FileText size={18} />

            PDF

          </button>

          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition text-white px-5 py-3 rounded-xl">

            <FileSpreadsheet size={18} />

            Excel

          </button>

          <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 transition px-5 py-3 rounded-xl">

            <Printer size={18} />

            Print

          </button>

        </div>

      </div>

    </div>
  );
}