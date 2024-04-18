'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Error from 'next/error'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Insira o e-mail',
    })
    .email({
      message: 'E-mail inválido',
    }),
  password: z.string({
    required_error: 'Insira a senha',
    invalid_type_error: 'E-mail inválido',
  }),
})

type ILoginData = z.infer<typeof loginSchema>

async function loginRequest({ email, password }: ILoginData) {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  })

  if (result?.error) {
    throw new Error(result.error)
  }
}

export function LoginForm() {
  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<ILoginData>({
    resolver: zodResolver(loginSchema),
  })

  const { handleSubmit, control } = form

  async function handleLogin({ email, password }: ILoginData): Promise<void> {
    try {
      await loginRequest({ email, password })

      router.replace('/')
    } catch (error) {
      toast({ title: 'Erro', description: error?.message })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <FormField
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <FormItem className="space-y-1">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <FormItem className="space-y-1">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>

        <Button>Enviar</Button>
      </form>
    </Form>
  )
}
