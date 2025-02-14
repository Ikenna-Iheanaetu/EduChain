import api from "../config/axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  avatar_number: number;
}

interface RecoveryDataProps {
  recovery_phrase: string;
  email: string;
  password: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post("/login", credentials);
    localStorage.setItem("token", data.token);
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post("/register", credentials);
    localStorage.setItem("token", data.token);
    return data;
  },

  recoverWallet: async (recoveryData: RecoveryDataProps) => {
    const { data } = await api.post("/recover-wallet", recoveryData);
    localStorage.setItem("token", data.token);
    return data;
  },
};
