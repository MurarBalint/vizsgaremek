import { createFileRoute } from '@tanstack/react-router'
import { UserAuthForm } from './-components/user-auth-form'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="md:hidden">

      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img className="mr-2 h-6 w-6" src="https://ckik.hu/_next/image?url=https%3A%2F%2Fceg-kozgazdasagi.cms.intezmeny.edir.hu%2Fuploads%2Fthumbnail_ckik_logo1_5ddb5979c8.png&w=256&q=90" alt="Ckik Logo" />
            DavidBalintVizsgaRemek
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Minden új találkozás egy új történet kezdete lehet.&rdquo;
              </p>
              <footer className="text-sm">ChatGpt</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Hozd létre a fiókód
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
