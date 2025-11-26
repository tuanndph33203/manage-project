import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useState } from 'react'
import { columns } from './columns'
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import CategoryListHeader from './CategoryListHeader '

const CategoryList = () => {
    return (
    <div className="p-6 min-h-screen bg-gray-50">

      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select className="border px-3 py-2 rounded-lg bg-white">
          <option>Report Type</option>
          <option>Performance</option>
          <option>Error Rate</option>
          <option>Usage Statistics</option>
        </select>

        <select className="border px-3 py-2 rounded-lg bg-white">
          <option>Time Range</option>
          <option>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>

        <button className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Apply Filters
        </button>
      </div>


      {/* Metric cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="p-5 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Requests</p>
          <h2 className="text-2xl font-bold mt-2">184,302</h2>
        </div>

        <div className="p-5 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Success Rate</p>
          <h2 className="text-2xl font-bold mt-2 text-green-600">96.3%</h2>
        </div>

        <div className="p-5 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Avg Response Time</p>
          <h2 className="text-2xl font-bold mt-2 text-indigo-600">412ms</h2>
        </div>
      </div>


      {/* Chart Placeholder */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <p className="text-gray-500 mb-4 text-sm">Graph Preview</p>
        <div className="w-full h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-md"></div>
      </div>

    </div>
  );
}

export default CategoryList
