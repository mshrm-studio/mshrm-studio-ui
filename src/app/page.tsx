import Link from 'next/link'

export default function Page() {
    return (
        <>
            <h1>Hello, Home page!</h1>

            <Link href="/auth/sign-in">Sign in</Link>
        </>
    )
}
