"use client";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { School, useCurrentUserStore } from "@/store/currentUser";
import { NextPage } from "next";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Card from "./components/Card";
import SchoolDialog from "./components/Dialog";
import SchoolManagement from "./components/SchoolManagement";
import useTeams from "./hooks/useTeams";

const Teams: NextPage = () => {
  const {
    userData: { ownedSchools, schoolRoles },
  } = useCurrentUserStore();
  const { joinSchool, createSchool, verifyTeamRole } = useTeams();
  const { setCurrentSchoolId } = useCurrentSchoolStore();
  const [_, setCookie, removeCookie] = useCookies();

  const schools = Array.from(
    new Set(schoolRoles?.map((schoolRole) => schoolRole.school))
  );

  console.log(schools, "schoshcoshocshochso");
  useEffect(() => {
    removeCookie("persisted_id_school");
  }, []);

  const renderSchoolCards = (
    schoolList: School[],
    variant: "create" | "join"
  ) => (
    <>
      {schoolList?.map((school) => (
        <Card
          name={school.name}
          image="https://img.freepik.com/free-vector/school-building-illustration_138676-2399.jpg"
          key={school.id}
          onChooseSchool={() => {
            setCurrentSchoolId(school.id);
            verifyTeamRole(school.id);
            setCookie("persisted_id_school", school.id, { path: "/" });
          }}
        />
      ))}
      <SchoolDialog
        variant={variant}
        onSubmit={
          variant === "create"
            ? (code) => createSchool(code)
            : (code) => joinSchool(code)
        }
        trigger={<SchoolManagement variant={variant} />}
      />
    </>
  );

  return (
    <div className="flex flex-col p-8">
      <span className="mb-2 text-xl font-semibold">Meus ambientes</span>
      <section className="flex flex-row flex-wrap gap-8">
        {renderSchoolCards(ownedSchools, "create")}
      </section>

      <span className="mb-2 text-xl font-semibold">
        Ambientes que eu participo
      </span>
      <section className="flex flex-row flex-wrap gap-8">
        {renderSchoolCards(schools, "join")}
      </section>
    </div>
  );
};

export default Teams;
