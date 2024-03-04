import { db } from "@/config/firebase";
import useAxios from "@/hooks/useAxios";
import { useCurrentUserStore } from "@/store/currentUser";
import { useCollaboratorStore } from "@/store/currentUserRoles";
import { ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useTeams = () => {
  const { axios } = useAxios();
  const { userData } = useCurrentUserStore();
  const { setIsCollaborator } = useCollaboratorStore();
  const { refresh } = useRouter();

  const joinSchool = async (
    code: string,
    role: string | undefined = "student"
  ) => {
    const { status } = await axios.post("/school/join", {
      userId: userData.id,
      code,
      role,
    });

    if (status !== 201) {
      toast.info("Ocorreu um erro!");
      return;
    }
    toast.info("Cadastrado na escola com sucesso!");
    setTimeout(() => {
      refresh();
    }, 1000);
  };

  const createSchool = async (name: string) => {
    const { status, data } = await axios.post("/school", {
      userId: userData.id,
      name,
      owner: userData,
    });

    // cria escola no firebase
    update(ref(db, "schools"), {
      [data.code]: {
        ...data,
      },
    });

    if (status !== 201) {
      toast.info("Ocorreu um erro!");
      return;
    }
    toast.info("Nova escola criada com sucesso!");
    setTimeout(() => {
      refresh();
    }, 1000);
  };

  const verifyTeamRole = (id: string) => {
    console.log(id, "iddd");
    const foundSchool = userData.schools.find((school) => school.id === id);
    console.log("iscoll", foundSchool);
    if (!foundSchool) {
      return;
    }
    setIsCollaborator(
      userData.schoolRoles.some(
        ({ id, role, school }) =>
          foundSchool.id === school.id && role === "collaborator"
      )
    );
  };

  return { joinSchool, createSchool, verifyTeamRole };
};

export default useTeams;
