import React from "react";
import logoWhite from "@/assets/logo-white.svg";
import logoBlack from "@/assets/logo-black.svg";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
  variant?: "black" | "white" | "auto";
  background?: "light" | "dark";
}

export function Logo({ 
  size = "medium", 
  className = "", 
  variant = "auto",
  background = "light"
}: LogoProps) {
  const sizeMap = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  // Determine which logo to use based on variant and background
  const getLogo = () => {
    if (variant === "black") return logoBlack;
    if (variant === "white") return logoWhite;
    
    // Auto mode - choose based on background
    return background === "light" ? logoBlack : logoWhite;
  };

  return (
    <img 
      src={getLogo()} 
      alt="Schwarzes Schild" 
      className={`${sizeMap[size]} ${className} object-contain transition-all duration-300`}
    />
  );
}
