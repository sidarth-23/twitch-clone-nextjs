"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const matches = useMediaQuery("(max-width: 1024px)");
  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        "flex-1",
        collapsed ? "ml-[70px]" : "ml-[70x] lg:ml-60"
      )}
    >
      {children}
    </div>
  );
}
