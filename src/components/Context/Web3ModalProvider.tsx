'use client'

import Web3Modal from '@/utils/context/Web3Modal'

// import dynamic from 'next/dynamic'

// const Web3Modal = dynamic(() => import('@/utils/context/Web3Modal'), {
//     ssr: false,
// })

export default function Web3ModalProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <Web3Modal>{children}</Web3Modal>
}
