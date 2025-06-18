import { Box, Pagination, PaginationItem } from '@mui/material'
import Img from '@components/CustomImage'
import RightArrowPaginationIcon from '@assets/icons/RightArrowPagination.svg'

const previous = () => <Img src={RightArrowPaginationIcon} style={{ transform: 'rotate(180deg)' }} />
const next = () => <Img src={RightArrowPaginationIcon} />

export interface PaginationOptions {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const CustomPagination = ({ currentPage, totalPages, onPageChange }: PaginationOptions) => {
  return (
    <Box display="flex" justifyContent="center" my={30}>
      <Pagination
        count={totalPages}
        page={currentPage + 1} // Si currentPage empieza en 0!
        onChange={(_event: unknown, newPage: number) => onPageChange(newPage)}
        color="primary"
        renderItem={item => <PaginationItem {...item} slots={{ previous, next }} />}
      />
    </Box>
  )
}

export default CustomPagination
