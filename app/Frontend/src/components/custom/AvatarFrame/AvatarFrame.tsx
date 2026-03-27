import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { getuserByid } from "../../axios/axiosClient"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useNavigate } from "@tanstack/react-router"
import type { ProfileData, UserWithProfile } from "@/components/axios/Types"


export function AvatarFrame({ userid, className, userData }: { userid?: number, className?: string, userData?: UserWithProfile }) {
    const nav = useNavigate()
    const { data: User, isLoading } = useQuery<{ user: ProfileData["user"]; profil: ProfileData }>({
        queryKey: ['avatar', userid],
        queryFn: () => getuserByid(`${userid}`),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !userData,
        gcTime: 3000,
    })
    if (isLoading) {
        return <Spinner />
    }
    if (!userData) {
        return (
            <HoverCard>
                <HoverCardTrigger onClick={() => nav({ to: "/profil/$profilId", params: { profilId: `${userid}` } })} className="cursor-pointer">
                    <Card key={userid} className={`bg-primary-200 rounded-none rounded-l-3xl hover:bg-primary-600 hover:text-white ${className}`}>
                        <CardContent className="p-0 flex">
                            <Avatar className="p-0 border-2 border-primary-500 ">
                                <AvatarImage src={`${User?.profil.avatar_url}`} />
                                <AvatarFallback>{User?.profil.first_name} {User?.profil.last_name}</AvatarFallback>
                            </Avatar>
                            <h3 className="scroll-m-20 text-xs font-semibold tracking-tight p-2">
                                {User?.profil.first_name} {User?.profil.last_name}
                            </h3>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 bg-brand-bg text-white border border-brand-border shadow-xl">
                    <button
                        className="absolute top-[6px] right-[6px] h-7 w-7 rounded-full bg-brand hover:bg-brand-hover flex items-center justify-center text-white text-sm cursor-pointer z-70"
                        onClick={() => nav({ to: "/profil/$profilId", params: { profilId: `${userid}` } })}>
                        ›
                    </button>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-brand">
                            <AvatarImage src={`${User?.profil.avatar_url}`} />
                            <AvatarFallback>
                                {User?.profil.first_name?.[0]}
                                {User?.profil.last_name?.[0]}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="text-lg font-bold text-brand">
                                {User?.profil.first_name} {User?.profil.last_name}
                            </p>

                            <p className="text-xs text-gray-400">
                                @{User?.user.username}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-300 space-y-1">
                        <p>Email: {User?.user.email}</p>
                        <p>Csatlakozott: {User?.user.created_at?.slice(0, 10)}</p>
                    </div>

                    <div className="mt-4 p-2 rounded bg-brand-inset border border-brand-border">
                        <p className="text-xs text-brand font-semibold mb-1">
                            Rövid bemutatkozás
                        </p>
                        <p className="text-xs text-gray-300">
                            {User?.profil.bio || "Nincs megadva."}
                        </p>
                    </div>
                </HoverCardContent>

            </HoverCard>
        )
    }
    else {
        return (
            <HoverCard>
                <HoverCardTrigger onClick={() => nav({ to: "/profil/$profilId", params: { profilId: `${userData.ID}` } })} className="cursor-pointer">
                    <Card key={userid} className={`bg-primary-200 rounded-none rounded-l-3xl hover:bg-primary-600 hover:text-white ${className}`}>
                        <CardContent className="p-0 flex">
                            <Avatar className="p-0 border-2 border-primary-500 ">
                                <AvatarImage src={`${userData.profile?.avatar_url}`} />
                                <AvatarFallback>{userData?.profile?.first_name} {userData?.profile?.last_name}</AvatarFallback>
                            </Avatar>
                            <h3 className="scroll-m-20 text-xs font-semibold tracking-tight p-2">
                                {userData?.profile?.first_name} {userData?.profile?.last_name}
                            </h3>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 bg-brand-bg text-white border border-brand-border shadow-xl">
                    <button
                        className="absolute top-[6px] right-[6px] h-7 w-7 rounded-full bg-brand hover:bg-brand-hover flex items-center justify-center text-white text-sm cursor-pointer z-70"
                        onClick={() => nav({ to: "/profil/$profilId", params: { profilId: `${userData.ID}` } })}>
                        ›
                    </button>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-brand">
                            <AvatarImage src={`${userData?.profile?.avatar_url}`} />
                            <AvatarFallback>
                                {userData?.profile?.first_name?.[0]}
                                {userData?.profile?.last_name?.[0]}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="text-lg font-bold text-brand">
                                {userData?.profile?.first_name} {userData?.profile?.last_name}
                            </p>

                            <p className="text-xs text-gray-400">
                                @{userData?.username}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-300 space-y-1">
                        <p>Email: {userData?.email}</p>
                        <p>Csatlakozott: {userData?.created_at?.slice(0, 10)}</p>
                    </div>

                    <div className="mt-4 p-2 rounded bg-brand-inset border border-brand-border">
                        <p className="text-xs text-brand font-semibold mb-1">
                            Rövid bemutatkozás
                        </p>
                        <p className="text-xs text-gray-300">
                            {userData?.profile?.bio || "Nincs megadva."}
                        </p>
                    </div>
                </HoverCardContent>

            </HoverCard>
        )
    }


}


