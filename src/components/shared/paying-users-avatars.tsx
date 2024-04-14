import { Avatar, AvatarImage } from "../ui/avatar";

const PayingUsersAvatar = () => {
  const payingUsers = [
    {
      avatar: "https://github.com/yagoandrade.png",
    },
    {
      avatar: "https://github.com/clauds-macedo.png",
    },
    {
      avatar: "https://github.com/mauriciomateus02.png",
    },
    {
      avatar: "https://github.com/k8adev.png",
    },
    {
      avatar: "https://github.com/lucasmontano.png",
    },
    {
      avatar: "https://github.com/robson1872.png",
    },
    {
      avatar: "https://github.com/Arthurls7.png",
    },
    {
      avatar: "https://github.com/VicAlexandre.png",
    },
    {
      avatar: "https://github.com/NandoKstroNet.png",
    },
  ];

  return (
    <div className="flex -space-x-2">
      {payingUsers.map((user, index) => (
        <Avatar key={user.avatar} className="outline object-cover">
          <AvatarImage src={user.avatar} alt={`User ${index}`} className="object-cover" />
        </Avatar>
      ))}
    </div>
  );
};

export default PayingUsersAvatar;
