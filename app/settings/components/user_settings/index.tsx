"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrivacyInfoCard } from "@/components/privacy_info_card";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { useCollaboratorStore } from "@/store/currentUserRoles";
import ChangeUserAvatar from "../change_user_avatar";
import ChangeUserInformation from "../change_user_information";

const UserSettings = () => {
  const { userData } = useCurrentUserStore();
  const {
    currentSchool: { code },
  } = useCurrentSchoolStore();
  const { isCollaborator } = useCollaboratorStore();
  return (
    <div className="flex w-full flex-col gap-3 p-6 lg:py-6 lg:pr-6">
      <Breadcrumbs />
      {isCollaborator && <p>{code}</p>}
      <h1 className="text-3xl font-bold">Configurações</h1>
      <div className="grid grid-cols-12 lg:gap-x-12">
        <div className="col-span-12 flex w-full flex-col gap-16 lg:col-span-8 2xl:flex-row">
          <ChangeUserAvatar />
          {userData ? <ChangeUserInformation /> : <p>loading</p>}
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <PrivacyInfoCard />
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
