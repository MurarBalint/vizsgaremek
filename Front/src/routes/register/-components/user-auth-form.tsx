"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createUser } from "@/components/axios/axiosClient" 
import { useNavigate } from "@tanstack/react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type formSchema = z.infer<typeof formSchema>
const formSchema = z.object({
  username: z.string().min(2, "Túl rövid").max(50),
  email: z.string().email("Érvénytelen email"),
  password: z.string().min(6, "Legalább 6 karakter"),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}



export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();

  const { mutate: create,isPending} = useMutation({
    mutationFn: ({ user }: { user: formSchema }) => createUser({ user }),
  })


  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })


  


  function onSubmit(values: formSchema) {
    console.log("Elküldött értékek:", values);
    create({user:values});
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid}>Mentés</Button>
          </form>
        </Form>
          </div>
        </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isPending}>
        {isPending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}

