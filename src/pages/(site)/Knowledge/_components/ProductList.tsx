import { Search } from "lucide-react";

const ProductList = () => {
   const data = [
    {
      oldLocator: `//div[contains(text(), 'old_1')]`,
      newLocator: `//div[contains(text(), 'new_1')]`,
      success: 98,
      repair: 235,
      lastSuccess: "2023-10-26 14:30:15",
      lastFail: "2023-10-22 09:15:00",
      type: "UI Test",
      badge: "blue"
    },
    {
      oldLocator: `{"data-testid":"login-button-old"}`,
      newLocator: `{"data-testid":"submit-credentials"}`,
      success: 45,
      repair: 1050,
      lastSuccess: "2023-10-21 11:00:05",
      lastFail: "2023-10-26 18:45:10",
      type: "API Test",
      badge: "green"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-5">Healing Knowledge Base</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="flex items-center bg-white rounded-lg px-4 py-2 border w-[280px]">
          <Search size={16} className="mr-2 text-gray-500" />
          <input
            placeholder="Search by locator name, value, or type…"
            className="outline-none w-full text-sm"
          />
        </div>

        <select className="border px-3 py-2 rounded-lg bg-white">
          <option>Source Type: All</option>
          <option>UI Test</option>
          <option>API Test</option>
        </select>

        <select className="border px-3 py-2 rounded-lg bg-white">
          <option>Success Rate ≥</option>
          <option>90%</option>
          <option>50%</option>
          <option>10%</option>
        </select>

        <select className="border px-3 py-2 rounded-lg bg-white">
          <option>Last Updated</option>
        </select>

        <select className="border px-3 py-2 rounded-lg bg-white">
          <option>App Version: All</option>
        </select>

        <button className="px-5 py-2 rounded-lg bg-purple-600 text-white ml-auto hover:bg-purple-700">
          Clear Filters
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-3">OLD LOCATOR / NEW LOCATOR</th>
            <th className="text-left py-3">SUCCESS RATE</th>
            <th className="text-left py-3">AVG REPAIR TIME</th>
            <th className="text-left py-3">LAST SUCCESS / LAST FAILURE</th>
            <th className="text-left py-3">SOURCE</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b hover:bg-slate-500 hover:text-white transition cursor-pointer"
            >
              <td className="py-4">
                <pre className="font-mono bg-gray-100 p-1 rounded text-sm">{row.oldLocator}</pre>
                <pre className="font-mono bg-gray-100 p-1 rounded mt-1 text-sm">{row.newLocator}</pre>
              </td>

              {/* SUCCESS RATE BAR */}
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${row.success}%`,
                        background: row.success > 60 ? "green" : "red"
                      }}
                    ></div>
                  </div>
                  <span>{row.success}%</span>
                </div>
              </td>

              <td className="py-4">{row.repair}ms</td>

              <td className="py-4">
                <p>{row.lastSuccess}</p>
                <p className="text-xs opacity-70">{row.lastFail}</p>
              </td>

              {/* BADGE */}
              <td className="py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${row.type === "UI Test" ? "bg-blue-100 text-blue-600" :
                    row.type === "API Test" ? "bg-green-100 text-green-700" :
                    "bg-gray-200"}
                  `}
                >
                  {row.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex items-center gap-2 mt-5 text-sm">
        <button className="px-2 border rounded hover:bg-gray-100">&lt;</button>
        <button className="px-3 py-1 bg-black text-white rounded">1</button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded">2</button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded">3</button>
        <span className="px-3">...</span>
        <button className="px-3 py-1 hover:bg-gray-100 rounded">8</button>
        <button className="px-2 border rounded hover:bg-gray-100">&gt;</button>
      </div>
    </div>
  );
}

export default ProductList
