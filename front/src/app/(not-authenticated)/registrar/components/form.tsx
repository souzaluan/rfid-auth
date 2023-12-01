'use client'

import { useEffect } from 'react'

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

import io from 'socket.io-client'
import { alovaInstance } from '@/services/alova-instance'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

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

type IRegisterData = z.infer<typeof registerSchema>

function createUserRequest(data: IRegisterData) {
  return alovaInstance.Post('/users', data).send()
}

export function RegisterForm() {
  const router = useRouter()

  const { toast } = useToast()

  const form = useForm<IRegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      tag: '',
    },
  })

  const { handleSubmit, control, setValue } = form

  async function handleRegister({
    email,
    password,
    tag,
  }: IRegisterData): Promise<void> {
    try {
      await createUserRequest({ email, password, tag })

      router.replace('/painel')
    } catch {
      toast({
        title: 'Erro',
        description: 'Ops! Não foi possível concluir seu cadastro.',
        duration: 5000,
      })
    }
  }

  useEffect(() => {
    const socket = io('http://localhost:3001')

    socket.on('received-id', (data) => setValue('tag', data))

    return () => {
      socket.disconnect()
    }
  }, [])

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
                  <Input
                    type="password"
                    placeholder="Aproxime sua tag"
                    {...field}
                  />
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
