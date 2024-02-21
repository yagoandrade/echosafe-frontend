import Sidemenu from "@/components/sidemenu";
import UserSettings from "./components/user_settings";

const Settings = () => {
  return (
    <div className="flex w-full justify-start">
      <Sidemenu />
      <div className="flex w-full flex-row gap-x-8">
        <UserSettings />
      </div>
    </div>
  );
};

export default Settings;
