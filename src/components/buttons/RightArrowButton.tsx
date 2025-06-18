import IconButton, { ButtonProps } from './IconButton'
import RightArrowIcon from '@assets/icons/rightArrow.svg'

type Props = Omit<ButtonProps, 'icon'>

const RightArrowButton = ({ text, onClick, color, isLoading, disabled }: Props) => (
  <IconButton
    isLoading={isLoading}
    text={text}
    onClick={onClick}
    color={color}
    icon={<RightArrowIcon />}
    disabled={disabled}
  />
)

export default RightArrowButton
