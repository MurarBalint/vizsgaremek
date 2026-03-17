import type { PasswordResetVerifyAccount } from "../axios/Types"
import { Button } from "../ui/button"

export function PhaseSelectAccount({accounts,onSuccess}: {accounts: PasswordResetVerifyAccount[],onSuccess: (account: PasswordResetVerifyAccount) => void}) {

    return (
        <div>
            <h2 className="text-lg font-semibold">Válassz fiókot</h2>

            <div className="flex flex-col gap-2">
                {accounts.map(acc => (
                    <div key={acc.ID}>
                    <Button
                        key={acc.ID}
                        onClick={() => onSuccess(acc)}
                        className="flex items-center gap-2"
                    >
                        <img src={`${acc.avatar_url}`} className="w-6 h-6 rounded-full bg-white" />
                        {acc.username}
                    </Button>

                    </div>
                ))}
            </div>
        </div>
    )
}
