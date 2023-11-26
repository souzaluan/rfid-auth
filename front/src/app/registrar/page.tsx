import Link from 'next/link'
import { RegisterForm } from './components/form'

export default function Register() {
  return (
    <main className="purple-gradient flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2 overflow-hidden rounded-md bg-white bg-opacity-60 p-12 backdrop-blur-lg">
        <h2 className="text-center text-2xl font-semibold text-violet-950">
          rfid
          <strong className="text-violet-600">.</strong>
          auth
        </h2>

        <RegisterForm />

        <Link href="/login" className="text-center underline">
          Já tenho uma conta
        </Link>
      </div>
    </main>
  )
}
