import { useForm } from "react-hook-form";

const useValidation = () => {
  const { getValues } = useForm();

  const emailValidationPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validatePasswordMatch = (value: string) => {
    const passwordValue = value;
    const confirmPasswordValue = getValues("confirmPassword");

    return passwordValue === confirmPasswordValue;
  };

  return { validatePasswordMatch, emailValidationPattern };
};

export default useValidation;
