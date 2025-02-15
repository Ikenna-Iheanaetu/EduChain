import { mineApi } from "@/api/mine";
import { useMutation } from "@tanstack/react-query";

export const useMine = () => {
    return useMutation({
      mutationFn: mineApi.mineTheBlockchain,
    });
  };
  