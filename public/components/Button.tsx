import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps): ReactNode => {
  return <button>{children}</button>;
};

export default Button;
