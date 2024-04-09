/* TODO: Rebuild this page */

"use client";

type Institutions = {
  id: number;
  name: string;
  location: string;
  code: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}[];

/* interface ManageActiveInstitutionProps {
  institutions: Institutions;
} */

const ManageActiveInstitution = () =>
  /*   {
    institutions
  }: ManageActiveInstitutionProps, */
  {
    return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    /* const [activeInstitutionId, activeInstitution, setActiveInstitutionId] =
    useActiveInstitution(institutions);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(
    activeInstitution?.name ?? null,
  );

  const { update } = useSession();

  useEffect(() => {
    setSelectedInstitution(activeInstitution?.name ?? null);
  }, [activeInstitution]); */

    <div className="text-end">
      <p className="text-xs font-light uppercase text-muted-foreground">
        Managing
      </p>

      {/* <Select
        value={selectedInstitution ?? ""}
        onValueChange={(value) => {
          const foundInstitution = institutions.find(
            (institution) => institution.name === value,
          );
          setActiveInstitutionId(foundInstitution?.id.toString() ?? null);
          setSelectedInstitution(value);
        }}
      >
        <SelectTrigger id="status" aria-label="Select Institution">
          <SelectValue placeholder="Select Institution" />
        </SelectTrigger>
        <SelectContent>
          {institutions.map((institution) => (
            <SelectItem value={institution.name} key={institution.id}>
              {institution.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </div>;
  };

export default ManageActiveInstitution;
