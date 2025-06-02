import * as Yup from "yup";

const containsUppercase = /(?=.*[A-Z])/;
const containsLowercase = /(?=.*[a-z])/;
const containsNumber = /(?=.*[0-9])/;
const containsSpecial = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;
const noConsecutiveChars = /(?!.*(.)\1{2})/;
const noCommonWords = /(?!password|123456|qwerty|admin).*/i;

const commonTypos: Record<string, string> = {
  "gmail.co": "gmail.com",
  "yaho.com": "yahoo.com",
  "gmal.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "hotmial.com": "hotmail.com",
};

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .trim()
    .lowercase()
    .test(
      "check-domain",
      "This email domain might contain a typo",
      function (value) {
        if (!value) return true;

        const domain = value.split("@")[1];
        if (!domain) return true;
        if (domain in commonTypos) {
          return this.createError({
            message: `Did you mean ${value.split("@")[0]}@${
              commonTypos[domain as keyof typeof commonTypos]
            }?`,
          });
        }

        return true;
      }
    )
    .max(100, "Email must be less than 100 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters")
    .test(
      "no-spaces",
      "Password should not contain spaces",
      (value) => !value || !/\s/.test(value)
    ),
});

export const signupSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .trim()
    .lowercase()
    .test(
      "check-domain",
      "This email domain might contain a typo",
      function (value) {
        if (!value) return true;

        const domain = value.split("@")[1];
        if (!domain) return true;
        if (domain in commonTypos) {
          return this.createError({
            message: `Did you mean ${value.split("@")[0]}@${
              commonTypos[domain as keyof typeof commonTypos]
            }?`,
          });
        }

        return true;
      }
    )
    .max(100, "Email must be less than 100 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters")
    .matches(
      containsUppercase,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      containsLowercase,
      "Password must contain at least one lowercase letter"
    )
    .matches(containsNumber, "Password must contain at least one number")
    .matches(
      containsSpecial,
      "Password must contain at least one special character"
    )
    .matches(
      noConsecutiveChars,
      "Password cannot contain more than 2 identical consecutive characters"
    )
    .matches(
      noCommonWords,
      "Password cannot contain common words like 'password' or '123456'"
    )
    .test(
      "no-spaces",
      "Password should not contain spaces",
      (value) => !value || !/\s/.test(value)
    )
    .test(
      "no-email-in-password",
      "Password should not contain your email",
      function (value) {
        const { email } = this.parent;
        if (!value || !email) return true;

        const emailUsername = email.split("@")[0];
        const valueLower = value.toLowerCase();

        if (
          emailUsername &&
          emailUsername.length > 2 &&
          valueLower.includes(emailUsername.toLowerCase())
        ) {
          return false;
        }

        return true;
      }
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const menuItemSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  availability: Yup.boolean().required(),
  category: Yup.string().required("Category is required"),
});

export const customerDetailsSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required(""),
  address: Yup.string().required("Address is required"),
  loyaltyPoints: Yup.number().required("Loyalty Points is required"),
});
