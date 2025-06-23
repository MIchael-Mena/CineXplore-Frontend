import DownArrowIcon from '@assets/icons/downArrow.svg'
import Img from '@components/CustomImage'

const RotatableDownArrow = ({ rotate }: { rotate: number }) => (
  <Img src={DownArrowIcon} mt={1} sx={{ transform: `rotate(${rotate}deg)` }} />
)

export default RotatableDownArrow
