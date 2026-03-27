import { Button } from "@/components/ui/button"
import { useState } from "react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useMutation } from "@tanstack/react-query"
import { SendVTCR } from "../axios/axiosClient"
import { Spinner } from "../ui/spinner"
import type { PasswordResetVerifyResponse } from "../axios/Types"


export function PhaseOTP({ email, onSuccess }: { email: string, onSuccess: (accounts: PasswordResetVerifyResponse) => void }) {
    const [code, setCode] = useState("")
    const { mutate: VTC, isPending } = useMutation({
        mutationFn: ({ email, verify_code }: { email: string; verify_code: string }) =>
            SendVTCR({ email, verify_code }),
        onSuccess: (response: { data: PasswordResetVerifyResponse }) => {
            onSuccess(response.data)
        }
    })
    async function check() {
        VTC({ email, verify_code: code })
    }
    if (isPending) return <Spinner/>
    return (
        <div className="space-y-4">

            <h2 className="text-lg font-semibold text-primary-700">
                Írd be a 6 jegyű kódot
            </h2>

            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={code}
                onChange={(value) => setCode(value)}
                className="flex justify-center"
            >
                <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                            key={i}
                            index={i}
                            className="
                                border-primary-400
                                focus:border-primary-600 
                                focus:ring-primary-500
                                bg-primary-50
                                rounded-md
                                text-lg
                                w-10 h-12
                                flex items-center justify-center
                                shadow-sm
                            "
                        />
                    ))}
                </InputOTPGroup>
            </InputOTP>

            <Button onClick={check}className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                Ellenőrzés
            </Button>
        </div>
    )
}
