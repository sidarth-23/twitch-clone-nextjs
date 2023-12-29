'use server';

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

export async function onFollow (id: string) {
    try {
        const followedUser = await followUser(id)
        revalidatePath('/')

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`)
        }
        return followedUser
    } catch {
        console.log('Internal Error')
    }
}

export async function onUnfollow (id: string) {
    try {
        const unfollowedUser = await unfollowUser(id)
        revalidatePath('/')

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`)
        }
        return unfollowedUser
    } catch {

    }
}