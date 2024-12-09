import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input">;


export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={`input w-full ${className}`} {...rest} />;
  }
);

