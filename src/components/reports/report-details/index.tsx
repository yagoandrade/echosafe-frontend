"use client";

interface ReportDetailsProps {
  id: string;
}

const ReportDetails = ({ id }: ReportDetailsProps) => {
  return <div className="grid grid-cols-12 lg:gap-x-12">{id}</div>;
};

export default ReportDetails;
