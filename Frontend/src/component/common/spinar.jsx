import React from "react";
import clsx from "clsx";

const sizeStyles = {
  xs: "w-4 h-4 border-2",
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-4",
  lg: "w-16 h-16 border-4",
  xl: "w-24 h-24 border-[6px]",
};

const colorStyles = {
  primary: "border-emerald-500 border-t-transparent",
  secondary: "border-blue-500 border-t-transparent",
  danger: "border-red-500 border-t-transparent",
  white: "border-white border-t-transparent",
  dark: "border-gray-800 border-t-transparent",
};

const Spinner = ({
  size = "md",
  color = "primary",
  fullscreen = false,
  className,
}) => {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        "animate-spin rounded-full",
        sizeStyles[size],
        colorStyles[color],
        className
      )}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;