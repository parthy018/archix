import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick = () => {},
  className = "",
  disabled = false,
  ...props
}) => {
  // Define base styles
  const baseStyles = `inline-flex items-center justify-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150`;

  // Define variant styles
  const variantStyles = {
    primary: `bg-sky-500 border border-sky-500 text-white hover:bg-blue-500  ring-0 `,
    secondary: `bg-transparent border border-slate-600 text-gray-500  hover:bg-gray-600 hover:text-white ring-0`,
    error:
      "bg-transparent border border-[#f49d0c] text-[#f49d0c] hover:bg-[#f49d0c] hover:text-white ring-0",
    danger: `bg-transparent border border-red-400 text-red-500   hover:text-white hover:bg-[#f87171]  ring-0`,
    success: `bg-transparent border border-green-500 text-green-500 hover:bg-green-600 hover:text-white ring-0`,
  };

  // Define size styles
  const sizeStyles = {
    sm: `px-3 py-1.5 text-sm`,
    md: `py-2 px-6 text-base`,
    lg: `px-5 py-3 text-lg`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${variantStyles[variant] || variantStyles.primary} 
        ${sizeStyles[size] || sizeStyles.md} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "outline",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
