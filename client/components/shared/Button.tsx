import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  title: string;
  bg: string;
}

const Button = ({ title, bg, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${bg} px-6 py-2.5 font-semibold rounded-lg`}>
      {title}
    </button>
  );
};

export default Button;
