"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  type Transition,
  type AnimatePresenceProps,
  type HTMLMotionProps,
} from "framer-motion";

import "./RotatingText.css";
import { cn } from "@/lib/utils";

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new (Intl as any).Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (segment: any) => segment.segment);
  }
  return Array.from(text);
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps
  extends Omit<HTMLMotionProps<"span">, "children" | "transition"> {
  texts: string[];
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines";
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 30, stiffness: 400 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0.025,
      staggerFrom = "last",
      loop = true,
      auto = true,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      onNext,
      ...rest
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const words = useMemo(() => {
      const text = texts[currentIndex] ?? "";
      return text.split(" ").map((word) => splitIntoCharacters(word));
    }, [texts, currentIndex]);

    const totalChars = useMemo(
      () => words.reduce((sum, word) => sum + word.length, 0),
      [words]
    );

    const getStaggerDelay = useCallback(
      (index: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (totalChars - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(totalChars / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (typeof staggerFrom === "number") {
          return Math.abs(staggerFrom - index) * staggerDuration;
        }
        return index * staggerDuration;
      },
      [staggerFrom, staggerDuration, totalChars]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const atEnd = currentIndex === texts.length - 1;
      const nextIndex = atEnd ? (loop ? 0 : currentIndex) : currentIndex + 1;
      if (nextIndex !== currentIndex) handleIndexChange(nextIndex);
    }, [currentIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const atStart = currentIndex === 0;
      const prevIndex = atStart ? (loop ? texts.length - 1 : currentIndex) : currentIndex - 1;
      if (prevIndex !== currentIndex) handleIndexChange(prevIndex);
    }, [currentIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const safeIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (safeIndex !== currentIndex) handleIndexChange(safeIndex);
      },
      [currentIndex, texts.length, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentIndex !== 0) handleIndexChange(0);
    }, [currentIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto) return;
      const interval = setInterval(next, rotationInterval);
      return () => clearInterval(interval);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn(
          "rotating-text-wrapper",
          mainClassName
        )}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentIndex}
            className={cn(
              "rotating-text-wrapper",
              splitLevelClassName
            )}
            layout
            aria-hidden="true"
          >
            {words.map((word, wordIndex) => {
              const previousCharsCount = words
                .slice(0, wordIndex)
                .reduce((sum, w) => sum + w.length, 0);
              return (
                <span
                  key={wordIndex}
                  className="rotating-text-word"
                >
                  {word.map((char, charIndex) => {
                    const overallIndex = previousCharsCount + charIndex;
                    return (
                      <motion.span
                        key={charIndex}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: getStaggerDelay(overallIndex),
                        }}
                        className={cn("rotating-text-char", elementLevelClassName)}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                  {wordIndex < words.length - 1 && (
                    <span className="rotating-text-char">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";

export default RotatingText;
