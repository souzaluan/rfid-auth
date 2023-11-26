import { LoginForm } from './components/form'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <LoginForm />

      <Link href="/registrar" className="text-center underline">
        Não possuo uma conta
      </Link>
    </>
  )
}
