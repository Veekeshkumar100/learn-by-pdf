import React from "react";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-emerald-500 text-white hover:bg-gradient-to-r from-emerald-400 to-emerald-700 focus:ring-emerald-500",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
  outline:
    "border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;





    //   <Button>Primary</Button>

    //   <Button variant="secondary">Secondary</Button>

    //   <Button variant="outline">Outline</Button>

    //   <Button variant="danger">Delete</Button>

    //   <Button variant="ghost">Ghost</Button>

    //   <Button size="sm">Small</Button>

    //   <Button size="lg">Large</Button>

    //   <Button loading>Loading</Button>

    //   <Button fullWidth>Full Width</Button>