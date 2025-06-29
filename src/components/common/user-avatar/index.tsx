import { Avatar, type AvatarProps, Tooltip } from '@mui/material';
import { stringAvatar } from '../../../utils/util';

interface UserAvatarProps {
  imageUrl: string;
  username: string;
  tooltipPlacement?: 'bottom' | 'top' | 'left' | 'right';
}

export const UserAvatar = ({
  imageUrl,
  username,
  tooltipPlacement = 'bottom',
  ...rest
}: UserAvatarProps & AvatarProps) => {
  const isValidUrl = (value: string) => {
    if (typeof value !== 'string' || !value) {
      return false;
    }
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Tooltip title={username} placement={tooltipPlacement} arrow>
      {isValidUrl(imageUrl) ? (
        <Avatar alt={username} src={imageUrl} {...rest} />
      ) : (
        <Avatar {...stringAvatar(username)} {...rest} />
      )}
    </Tooltip>
  );
};
