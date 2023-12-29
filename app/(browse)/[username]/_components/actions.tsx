"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { use, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string
}

export function Actions({isFollowing, userId}: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
      .then((data) => {toast.success(`You are now following ${data?.following.username}!`)})
      .catch(() => {toast.error("Failed to follow the user!")})
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
      .then((data) => {toast.success(`You have unfollowed ${data?.following.username}!`)})
      .catch(() => {toast.error("Failed to follow the user!")})
    });
  };

  const onClick = isFollowing ? handleUnfollow : handleFollow;

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="primary"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
