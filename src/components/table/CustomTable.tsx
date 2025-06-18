import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { ReactNode } from 'react'
import Pagination, { PaginationOptions } from './Pagination'

interface Props {
  columns: string[]
  children: ReactNode[]
  paginationOptions?: PaginationOptions
}

const CustomTable = ({ columns, children, paginationOptions }: Props) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index}>
              <Typography variant="h6">{column}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
    {paginationOptions && <Pagination {...paginationOptions} />}
  </TableContainer>
)

export default CustomTable
