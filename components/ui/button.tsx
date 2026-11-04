import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_0_rgb(255_107_44/0)] hover:shadow-[0_0_40px_-6px_rgb(255_107_44/0.55)]",
        // Botón secundario: vidrio claro sobre fondo oscuro
        white: "bg-white/[0.04] text-foreground ring-1 ring-inset ring-white/15 hover:bg-white/[0.08]",
        dark: "bg-background text-foreground hover:bg-secondary",
        outline: "border border-white/15 bg-transparent text-foreground hover:bg-white/5",
        ghost: "bg-transparent text-foreground hover:bg-white/5",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
      // Con flecha: el círculo va pegado al borde derecho, así que se achica ese relleno
      withArrow: {
        true: "pr-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      withArrow: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, withArrow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, withArrow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/**
 * Círculo con flecha que va al final de un botón (usar con `withArrow`).
 * `direction="down"` es para botones que bajan en la página en vez de abrir un enlace.
 */
function ButtonArrow({
  tone = "light",
  direction = "out",
}: {
  tone?: "light" | "dark" | "primary";
  direction?: "out" | "down";
}) {
  const Icon = direction === "down" ? ArrowDown : ArrowUpRight;
  return (
    <span
      className={cn(
        "ml-1 flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300",
        direction === "down" ? "group-hover/btn:translate-y-0.5" : "group-hover/btn:rotate-45",
        tone === "light" && "bg-primary-foreground text-primary",
        tone === "dark" && "bg-secondary text-foreground",
        tone === "primary" && "bg-primary text-primary-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

export { Button, ButtonArrow, buttonVariants };
