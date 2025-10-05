import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>

const CreateUser = ({ user }: { user: FormSchema }) => {
  const validateRequest = formSchema.parse(user)
  console.log({validateRequest});
  const Response = axios.post("http://localhost:2069/api/user", user);
  return Response;
}


export function CreatUserForm() {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    const { mutate: create, isPending: userIsPending } = useMutation({
    mutationFn: ({ user }: { user: FormSchema }) => CreateUser({ user }),
    onSuccess() {
            queryClient.refetchQueries({
                queryKey: ["users"]
            })
    },
  })

        // 1. Define your form.
    const form = useForm<FormSchema>({
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        
    })
      
          // 2. Define a submit handler.
    function onSubmit(values: FormSchema) {
        
        console.log(values)
        create({user: values})
        nav({to:"/users"})
    }

    if(userIsPending){
        return (<p>Toltes...</p>)
    }
    return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Új felhasználó</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Új felhasználó létrehozása</DialogTitle>
            <DialogDescription>
                Add meg a felhasználó adatait, majd kattints a Mentés gombra.
            </DialogDescription>
            </DialogHeader>

            {/* Ide kerül a form */}
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>Felhasználó neve</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>Email cím</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Jelszó</FormLabel>
                    <FormControl>
                        <Input placeholder="Jelszó" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Jelszó</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Mégse</Button>
                </DialogClose>
                <Button type="submit" disabled={!form.formState.isValid}>Mentés</Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}