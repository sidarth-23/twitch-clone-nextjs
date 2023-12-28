import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LiveBadge } from "@/components/live-badge";

const avatarSize = cva("", {
  variants: {
    size: {
      default: "w-8 h-8",
      lg: "w-14 h-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSize> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export function UserAvatar({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSize({ size })
        )}
      >
        <AvatarImage src={imageUrl} alt={username} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

interface UserItemSkeletonProps extends VariantProps<typeof avatarSize> {}

export function UserAvatarSkeleton({ size }: UserItemSkeletonProps) {
  return <Skeleton className={cn("rounded-full", avatarSize({ size }))} />;
}
