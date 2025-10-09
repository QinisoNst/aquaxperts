import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean; // ✅ Add fullWidth support
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-5 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500";
      break;
    case "secondary":
      variantStyles =
        "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500";
      break;
    case "outline":
      variantStyles =
        "border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500";
      break;
    default:
      variantStyles = "bg-cyan-600 text-white";
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
