import { useParams, useRouter } from "next/navigation";

const useRouterHandler = () => {
  const router = useRouter();
  const params = useParams();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return { navigateTo, params };
};

export default useRouterHandler;
