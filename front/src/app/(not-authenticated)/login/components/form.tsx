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

interface ILoginData {
  email: string
  password: string
}

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

export function LoginForm() {
  const form = useForm<ILoginData>({
    resolver: zodResolver(loginSchema),
  })

  const { handleSubmit, control } = form

  async function handleLogin({ email, password }: ILoginData): Promise<void> {
    Promise.resolve({ email, password })
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
