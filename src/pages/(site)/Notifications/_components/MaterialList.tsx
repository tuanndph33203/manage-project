import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useState } from 'react'
import { columns } from './columns'
import { useMultipleMaterialQuery } from '@/hooks/querys/useMaterialQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import MaterialListHeader from './MaterialListHeader '

const MaterialList = () => {
   const notifications = [
    { message: "New project assigned to you", time: "10 mins ago", unread: true },
    { message: "System auto healed 3 broken locators", time: "1 hour ago", unread: false },
    { message: "Weekly performance report generated", time: "Yesterday", unread: false },
    { message: "2 locators failed in last run", time: "2 days ago", unread: true }
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      <div className="space-y-3">

        {notifications.map((n,i) => (
          <div key={i}
            className={`
              p-4 border rounded-lg flex justify-between items-center cursor-pointer 
              hover:bg-gray-100 transition
              ${n.unread ? "bg-purple-50 border-purple-200" : "bg-white"}
            `}
          >
            <div>
              <p className={`font-medium ${n.unread ? "text-purple-700" : ""}`}>{n.message}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>

            {n.unread && <span className="w-2 h-2 bg-purple-600 rounded-full"></span>}
          </div>
        ))}

      </div>

    </div>
  );
}

export default MaterialList
