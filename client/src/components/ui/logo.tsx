import React from "react";
import schwarzesLogo from "@assets/9.png";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Logo({ size = "medium", className = "" }: LogoProps) {
  const sizeMap = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  return (
    <img 
      src={schwarzesLogo} 
      alt="Schwarzes Schild" 
      className={`${sizeMap[size]} ${className} object-contain`}
    />
  );
}
