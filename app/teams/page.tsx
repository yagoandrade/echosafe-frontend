"use client";
import { Button } from "@/components/button";
import useTokenVerifier from "@/hooks/useTokenVerifier";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { useCurrentUserStore } from "@/store/currentUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Card from "./components/Card";
import useTeams from "./hooks/useTeams";

const Teams: NextPage = () => {
  const {
    userData: { ownedSchools, schools, name },
  } = useCurrentUserStore();
  const { joinSchool, createSchool, verifyTeamRole } = useTeams();
  const { setCurrentSchoolId } = useCurrentSchoolStore();
  const [code, setCode] = useState("1OePqSR");
  const [_, setCookie, removeCookie] = useCookies();
  useTokenVerifier();

  useEffect(() => {
    removeCookie("persisted_id_school");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(schools);

  return (
    <div className="flex flex-col gap-8 p-8">
      <span>Meus ambientes</span>
      {ownedSchools?.map((school) => (
        <Card
          name={school.name}
          image={
            "https://img.freepik.com/free-vector/school-building-illustration_138676-2399.jpg"
          }
          key={school.id}
          onChooseSchool={() => {
            setCurrentSchoolId(school.id);
            verifyTeamRole(school.id);
            setCookie("persisted_id_school", school.id);
          }}
        />
      ))}

      <span className="mb-8">Ambientes que eu participo</span>
      <div className="flex flex-row gap-8">
        {schools?.map((school) => (
          <Card
            name={school.name}
            image={
              "https://img.freepik.com/free-vector/school-building-illustration_138676-2399.jpg"
            }
            key={school.id}
            onChooseSchool={() => {
              setCurrentSchoolId(school.id);
              verifyTeamRole(school.id);
              setCookie("persisted_id_school", school.id);
            }}
          />
        ))}
      </div>
      <Button onClick={() => joinSchool(code)}>entrar numa escola</Button>
      <Button onClick={() => createSchool("baatata")}>criar escola</Button>
    </div>
  );
};

export default Teams;
