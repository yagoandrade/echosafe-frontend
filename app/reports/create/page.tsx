import Sidemenu from "@/components/sidemenu";
import { type NextPage } from "next";
import ComplaintForm from "./components/complaint-form";
import { Breadcrumbs } from "@/components/breadcrumbs";

const Create: NextPage = () => {
  return (
    <div className="flex size-full pb-8 pr-8">
      <Sidemenu />
      <div className="flex w-full flex-col gap-3 p-6 lg:py-6 lg:pr-6">
        <Breadcrumbs />

        <section className="flex flex-col">
          <h2 className="mb-4 text-3xl font-bold">
            Denunciar um caso de bullying
          </h2>
          <p className="mb-8 font-light">
            Seu relato será feito de forma 100% anônima e os professores,
            coordenação, diretoria e outros colegas de sala não saberão que foi
            você que fez essa denúncia pela plataforma.
          </p>
          <ComplaintForm />
        </section>
      </div>
    </div>
  );
};

export default Create;
