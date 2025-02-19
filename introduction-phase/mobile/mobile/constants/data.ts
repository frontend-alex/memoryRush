import icons from "./icons"

interface LoginInputsProps {
    name: string
    placeholder: string
    type: string
    icon: string
}

export const LoginInputs = (togglePassword: boolean): LoginInputsProps[] => [
    {
        name: "Username",
        placeholder: "Enter your username",
        type: "email",
        icon: icons.aLarge
    },
    {
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        icon: icons.email
    },
    {
        name: "password",
        placeholder: "Enter your password",
        type: togglePassword ? "text" : "password",
        icon: icons.lock
    },
    {
        name: "confirmPassword",
        placeholder: "Confirm Password",
        type: togglePassword ? "text" : "password",
        icon: icons.lock
    },
]