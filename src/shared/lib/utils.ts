import type { Column, FilterFn } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

// Utility function for combining class names

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPinningStyles = <T>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export const dateFilterFn = <T, K extends keyof T>(
  columnId: K
): FilterFn<T> => {
  return (row, _, value: { from: Date; to: Date }) => {
    const rowDate = row.getValue(columnId as string) as Date;
    const { from, to } = value;

    if (from && to) {
      return rowDate >= from && rowDate <= to;
    }

    return rowDate >= from;
  };
};

export function getInitials(firstName?: string, lastName?: string): string {
  const firstInitial = firstName?.trim()?.charAt(0).toUpperCase();
  const lastInitial = lastName?.trim()?.charAt(0).toUpperCase();

  if (firstInitial || lastInitial) {
    return `${firstInitial ?? ""}${lastInitial ?? ""}`;
  }

  return "A";
}
