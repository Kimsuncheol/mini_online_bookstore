import { Avatar, Badge } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'

interface UserAvatarProps {
  name: string
  avatar?: string
  verified?: boolean
  size?: number
}

export default function UserAvatar({ name, avatar, verified = false, size = 56 }: UserAvatarProps) {
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const AvatarComponent = (
    <Avatar
      src={avatar}
      sx={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: size * 0.4,
        fontWeight: 700,
      }}
    >
      {getInitials(name)}
    </Avatar>
  )

  if (verified) {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <VerifiedIcon
            sx={{
              fontSize: size * 0.35,
              color: '#10b981',
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          />
        }
      >
        {AvatarComponent}
      </Badge>
    )
  }

  return AvatarComponent
}
