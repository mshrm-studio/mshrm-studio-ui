type Props = {
    children: React.ReactNode
}

const HeaderAuthMenuContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className="absolute z-[998] top-full right-0 bg-white border border-[#D9D9D9] dark:bg-black">
            {children}
        </div>
    )
}

export default HeaderAuthMenuContainer
