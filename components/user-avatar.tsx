import { AvatarProps } from '@radix-ui/react-avatar';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/main';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'avatar_url' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.avatar_url ? (
        <AvatarImage alt="Picture" src={`${user.avatar_url}?t=${Date.now()}`} className="object-cover" />
      ) : (
        <AvatarImage alt="Default Avatar" src="/Transhumans - Pilot.png" className="object-cover" />
      )}
    </Avatar>
  );
}
