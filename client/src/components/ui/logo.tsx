import React from "react";
import newLogo from "../../assets/schwarzes-schild-logo.png";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
  variant?: "black" | "white" | "auto"; // Maintained for API compatibility
  background?: "light" | "dark"; // Maintained for API compatibility
}

export function Logo({ 
  size = "medium", 
  className = "", 
  variant = "auto", // Not used with new logo
  background = "light" // Not used with new logo
}: LogoProps) {
  const sizeMap = {
    small: "w-14 h-14",
    medium: "w-20 h-20",
    large: "w-32 h-32",
  };

  return (
    <img 
      src={newLogo} 
      alt="Schwarzes Schild" 
      className={`${sizeMap[size]} ${className} object-contain transition-all duration-300`}
    />
  );
}
