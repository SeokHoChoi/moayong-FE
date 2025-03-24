import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMe, refresh } from "src/_api/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useAuth = () => {
  const router = useRouter();
  const {
    data: user,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
  });

  useEffect(() => {
    if (isError) {
      handleError(error as AxiosError);
    }
  }, [isError, error]);

  const handleError = async (error: AxiosError) => {
    if (isError) {
      const statusCode = error.response?.status;
      const errorCode = (error.response?.data as { code?: string })?.code;

      if (statusCode === 401 && errorCode === "UNAUTHORIZED") {
        alert("로그인이 필요해요.");
        router.push("/login");
      }
      router.push("/login");
    }
  };
  return { user };
};
