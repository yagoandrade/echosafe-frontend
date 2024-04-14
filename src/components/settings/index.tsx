import React from "react";
import ChangeUserAvatar from "../shared/change-user-avatar";
import PrivacyInfoCard from "./privacy-info-card";

const Settings = async () => {
  return (
    <div className="grid grid-cols-12 lg:gap-x-12">
      <div className="col-span-12 flex w-full flex-col gap-16 lg:col-span-8 2xl:flex-row">
        <ChangeUserAvatar />
      </div>
      <div className="hidden xl:col-span-4 xl:block">
        <PrivacyInfoCard />
      </div>
    </div>
  );
};

export default Settings;
