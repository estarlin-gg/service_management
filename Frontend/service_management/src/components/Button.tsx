import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = ({
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`btn capitalize ${className}`} {...rest}>
      {children}
    </button>
  );
};