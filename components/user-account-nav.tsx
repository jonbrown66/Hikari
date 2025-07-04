'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types/main'
import Image from "next/image"
import { createClient } from '@/utils/supabase/client'; // Import your custom createClient
import { useEffect, useState } from "react";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    full_name: string;
    avatar_url: string | null; 
    email: string | null; 
  };
  key?: string;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const router = useRouter()
  const supabase = createClient()
  const [displayAvatarUrl, setDisplayAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user?.avatar_url) {
      setDisplayAvatarUrl(`${user.avatar_url}?t=${Date.now()}`);
    } else {
      setDisplayAvatarUrl("/Transhumans - Pilot.png");
    }
  }, [user?.avatar_url]);

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }


  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full"
      >
        {displayAvatarUrl && (
          <Image
            src={displayAvatarUrl}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full object-cover"
            unoptimized
          />
        )}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{user?.full_name || "My Account"}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/dashboard/settings" className="flex items-center w-full">
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/dashboard/support" className="flex items-center w-full">
          Support
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  )
}
