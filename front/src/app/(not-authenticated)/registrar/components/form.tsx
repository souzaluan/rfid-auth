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

interface IRegisterData {
  email: string
  password: string
  tag: string
}

const registerSchema = z.object({
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
  tag: z.string({
    required_error: 'Aproxime a tag',
  }),
})

export function RegisterForm() {
  const form = useForm<IRegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const { handleSubmit, control } = form

  async function handleRegister({
    email,
    password,
    tag,
  }: IRegisterData): Promise<void> {
    Promise.resolve({ email, password, tag })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleRegister)}
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
          <FormField
            name="tag"
            control={control}
            disabled
            render={({ field }) => {
              return (
                <FormItem className="space-y-1">
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aproxime sua tag"
                      {...field}
                    />
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
