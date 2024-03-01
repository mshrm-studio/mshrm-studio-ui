import { Locale } from '@/utils/enums/locale'
import Link from 'next/link'
import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <>
            <h1>{dict.signIn}</h1>

            <Link href="/auth/sso" className="flex items-center justify-center">
                <button type="button">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_3301_4796)">
                            <path d="M0 0H20V20H0V0Z" fill="#F3F3F3" />
                            <path
                                d="M0.869141 0.869568H9.56479V9.56522H0.869141V0.869568Z"
                                fill="#F35325"
                            />
                            <path
                                d="M10.4346 0.869568H19.1302V9.56522H10.4346V0.869568Z"
                                fill="#81BC06"
                            />
                            <path
                                d="M0.869141 10.4348H9.56479V19.1304H0.869141V10.4348Z"
                                fill="#05A6F0"
                            />
                            <path
                                d="M10.4346 10.4348H19.1302V19.1304H10.4346V10.4348Z"
                                fill="#FFBA08"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_3301_4796">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <span className="ml-3">Sign in with Microsoft</span>
                </button>
            </Link>
        </>
    )
}
