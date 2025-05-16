"use client";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, signupSchema } from "@/lib/yupSchemas";
import { AuthFormData, AuthFormType } from "@/types/auth";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface AuthFormProps {
  formType: AuthFormType;
}

export default function AuthForm({ formType }: AuthFormProps) {
  const { login, signup, loading, error } = useAuth();
  const schema = formType === "login" ? loginSchema : signupSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuthFormData) => {
    if (formType === "login") {
      await login(data.email, data.password);
    } else if (formType === "signup") {
      await signup(data.email, data.password);
    }
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-gray-700">
          Email
        </label>
        <InputText
          id="email"
          {...register("email")}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <InputText
          id="password"
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {formType === "signup" && (
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <InputText
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full p-2 border rounded-md"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        label={formType === "login" ? "Login" : "Sign Up"}
        className="w-full p-button-raised p-button-primary"
        disabled={loading}
        loading={loading}
      />
    </form>
  );
}
