import { useAccountQueryLimited } from '@/hooks/querys/useAccountQuery'
import { columns } from './components/columns'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { useState } from 'react'

const AccountPage = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const { data, isLoading, isError, refetch } = useAccountQueryLimited(pagination)

  const { table } = useDataTable({
    columns: columns,
    data: data?.data || [],
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })
  return (
    <>
      <h1 className='text-[32px] font-semibold dark:text-gray-100'>Danh sách tài khoản người dùng</h1>
      <div className='w-full mt-5 bg-white dark:bg-gray-800 rounded-xl p-4'>
        <DataTableCustom table={table} columns={columns} isLoading={isLoading} isError={isError} refetch={refetch} />
      </div>
    </>
  )
}

export default AccountPage
