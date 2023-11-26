import { RegisterForm } from './components/form'

import Link from 'next/link'

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />

      <Link href="/login" className="text-center underline">
        Já possuo uma conta
      </Link>
    </>
  )
}
