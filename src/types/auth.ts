export type AuthFormType = "login" | "signup";

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}
