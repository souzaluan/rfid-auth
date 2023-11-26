import Link from 'next/link'
import { LoginForm } from './components/form'

export default function Login() {
  return (
    <main className="purple-gradient flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2 overflow-hidden rounded-md bg-white bg-opacity-60 p-12 backdrop-blur-lg">
        <h2 className="text-center text-2xl font-semibold text-violet-950">
          rfid
          <strong className="text-violet-600">.</strong>
          auth
        </h2>

        <LoginForm />

        <Link href="/registrar" className="text-center underline">
          Não possuo uma conta
        </Link>
      </div>
    </main>
  )
}
