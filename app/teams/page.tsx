"use client";
import useTokenVerifier from "@/hooks/useTokenVerifier";
import { useCurrentSchoolStore } from "@/store/currentSchool";
import { School, useCurrentUserStore } from "@/store/currentUser";
import { NextPage } from "next";
import { useEffect } from "react";
import { useReportStore } from "../hooks/reports/store";
import Card from "./components/Card";
import SchoolDialog from "./components/Dialog";
import SchoolManagement from "./components/SchoolManagement";
import useTeams from "./hooks/useTeams";

const Teams: NextPage = () => {
  const {
    userData: { ownedSchools, schoolRoles, role, id },
  } = useCurrentUserStore();
  const { joinSchool, createSchool, verifyTeamRole } = useTeams();
  const { setCurrentSchoolId } = useCurrentSchoolStore();
  const { setComplaints } = useReportStore();

  useTokenVerifier();

  const schools = Array.from(
    new Set(schoolRoles?.map((schoolRole) => schoolRole.school))
  );

  const cleanUpData = () => {
    localStorage.removeItem("persisted_id_school");
    localStorage.removeItem("is_collaborator");
    localStorage.removeItem("currentSchool-storage");
    localStorage.removeItem("complaints-storage");
    localStorage.removeItem("collaborator-storage");
    setComplaints([]);
    setCurrentSchoolId("");
  };

  useEffect(() => {
    const hasValue = localStorage.getItem("firstLoginWorkaround");

    if (!hasValue) {
      localStorage.setItem("firstLoginWorkaround", "done");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    cleanUpData();
  }, [id]);

  const renderSchoolCards = (
    schoolList: School[],
    variant: "create" | "join"
  ) => (
    <>
      {schoolList?.map((school, index) => (
        <Card
          name={school.name}
          image="https://img.freepik.com/free-vector/school-building-illustration_138676-2399.jpg"
          key={index}
          onChooseSchool={() => {
            setCurrentSchoolId(school.id);
            verifyTeamRole(school.id);
            localStorage.setItem("persisted_id_school", school.id);
          }}
        />
      ))}
      {role === "student" && variant === "create" ? null : (
        <SchoolDialog
          variant={variant}
          onSubmit={
            variant === "create"
              ? (code) => createSchool(code)
              : (code) => joinSchool(code)
          }
          trigger={<SchoolManagement variant={variant} />}
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col p-8" key={id}>
      {role === "collaborator" && (
        <span className="mb-2 text-xl font-semibold">Meus ambientes</span>
      )}
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
