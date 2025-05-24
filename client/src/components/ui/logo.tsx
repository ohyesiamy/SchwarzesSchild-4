import React from "react";
import newLogo from "@/assets/schwarzes-schild-logo.png";

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
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  return (
    <img 
      src={newLogo} 
      alt="Schwarzes Schild" 
      className={`${sizeMap[size]} ${className} object-contain transition-all duration-300`}
    />
  );
}
