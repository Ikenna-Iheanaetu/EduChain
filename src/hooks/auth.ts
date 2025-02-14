import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { User } from "@/types/user";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,

    onSuccess: (data: { token: string; user: User }) => {
      toast.success("Account created successfully!");
      localStorage.removeItem("signUpData");
      navigate("/recover", {
        state: data.user.recovery_phrase,
      });
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create account. Please try again.";

      console.log(errorMessage);
      toast.error(errorMessage || "Failed to create account");
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data: { token: string; user: User }) => {
        console.log(data)
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create account. Please try again.";

      console.log(errorMessage);
      toast.error(errorMessage || "Failed to create account");
    },
  });
};
