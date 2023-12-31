'use client';

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
    children: React.ReactNode
}

export function Wrapper({ children }: WrapperProps) {
    const {collapsed} = useCreatorSidebar()
    return (
        <aside className={cn('fixed left-0 flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35]', collapsed && 'lg:w-[70px]')}>
            {children}
        </aside>
    )
}