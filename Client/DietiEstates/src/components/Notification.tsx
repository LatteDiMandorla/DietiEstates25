import { Avatar } from "./Avatar"

interface NotificationProps {
    title: string,
    text: string,
    avatar?: string,
    date?: string,
}
export const Notification = ({ title, text, avatar, date = "" } : NotificationProps) => {

    return (
        <div className="h-24 rounded-md hover:bg-blue-200/20 flex w-full items-center px-2">
            {avatar && <Avatar src={avatar} />}
            <div className="flex-1 flex flex-col items-start px-3">
                <p className="font-bold text-lg">{title}</p>
                <p className="w-full text-left">{text}</p>
                <div className="w-full flex text-gray-300 text-sm">
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}