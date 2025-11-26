import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { useReviewByProductIdQuery } from '@/hooks/querys/useReviewQuery'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useDataTable } from '@/hooks/useDataTable'
import { columns } from './columns'

const ProductInfomationReview = ({ id }: any) => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)

  const { data, isLoading, isError, refetch } = useReviewByProductIdQuery(id, pagination)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })
  return (
    <div>
      <h2 className='text-[24px] font-semibold dark:text-gray-100'>Danh sách bình luận</h2>
      <div className='w-full mt-5 rounded-xl bg-white dark:bg-gray-800 p-4'>
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </div>
  )
}

export default ProductInfomationReview
