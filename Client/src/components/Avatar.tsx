export const Avatar = ({size = "sm", src, border = false, className = ""} : {size?: "sm" | "md" | "lg", src: string, border?: boolean, className?: string}) => {
    const style = {
        "sm": " w-10 h-10",
        "md": " w-14 h-14",
        "lg": " w-20 h-20",
    }
    return (
        <div className={`overflow-hidden rounded-full ${border && "border-2 border-white"} ${style[size]} ${className}`}>
            <img className="h-full w-full object-cover" src={src}/>
        </div>
    )
}