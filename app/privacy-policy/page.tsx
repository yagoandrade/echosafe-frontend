import PrivacyPolicy from "./components/privacy_policy";

const Privacy = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex max-w-3xl flex-col gap-3 p-6 lg:py-6 lg:pr-6">
        <PrivacyPolicy />
      </div>
    </div>
  );
};

export default Privacy;
