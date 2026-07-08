"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function NavigationTransition() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          key="nav-progress"
          className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-primary"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "0% 50%" }}
        />
      )}
    </AnimatePresence>
  );
}
