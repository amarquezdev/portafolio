"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface CardTransformedProps extends React.HTMLAttributes<HTMLDivElement> {
  rotate?: number;
}

export function CardTransformed({
  className,
  rotate = -2,
  children,
  ...props
}: CardTransformedProps) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      whileHover={{ rotate, scale: 1.02, y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-xl border border-border bg-card shadow-lg",
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
