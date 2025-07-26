import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface props {
  userImage: string;
  userName: string;
}

export default function AvatarCustom({ userName, userImage }: props) {

    const fName = userName.split(' ')[0][0]
    const profileLogoName = fName.toUpperCase()

    return (
        <Avatar className="w-6 h-6">
            <AvatarImage src={userImage} />
            <AvatarFallback>PK</AvatarFallback>
        </Avatar>
    );
}
