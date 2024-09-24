import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils";
import { IconType } from "react-icons";

const buttonVariants = cva(
  "inline-flex items-center w-full  justify-center whitespace-nowrap  text-pure-white rounded-button-border-radius",
  {
    variants: {
      variant: {
        default: "bg-app-green",
      },
      btnColor: {
        green: "bg-app-green",
        purple: "bg-app-purple",
        blue: "bg-app-blue",
        orange: "bg-gradient-to-r from-orange-shade-left to-orange-shade-right",
        plainOrange: "bg-app-orange",
        transparent: "bg-transparent text-heading",
      },
      size: {
        xs: "px-6 py-8",
        sm: "px-10 py-[12px]",
        default: "px-10 py-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      btnColor: "green",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  btnType?: string;
  Icon?: IconType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      href,
      variant,
      size,
      btnColor,
      btnType,
      Icon,
      ...props
    },
    ref
  ) => {
    if (btnType === "withIcon") {
      return (
        <button
          className={cn(buttonVariants({ variant, btnColor, size, className }))}
          ref={ref}
          {...props}
        >
          <span className="flex gap-4 w-full justify-center items-center">
            <span> {children}</span>
            <span>
              {btnType === "withIcon" && Icon && React.createElement(Icon)}
            </span>
          </span>
        </button>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, btnColor, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
