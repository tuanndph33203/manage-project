import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ITable } from '@/interface/table'
import { flexRender } from '@tanstack/react-table'

const DataTableHead = ({ table }: ITable<any>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className='whitespace-nowrap'>
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHead
