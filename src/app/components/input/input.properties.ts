export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "datetime-local"
  | "textarea"
  | "select"
  | "hidden";

export type InputSize = "sm" | "md" | "lg";

export const inputBaseClass = [
  "bg-gray-50",
  "border",
  "border-gray-300",
  "rounded-lg",
  "focus:ring-primary-600",
  "focus:border-primary-600",
  "block",
  "w-full",
];

export const inputSizeClasses: Record<InputSize, string[]> = {
  sm: ["text-xs", "p-2"],
  md: ["text-sm", "p-2.5"],
  lg: ["text-md", "p-4"],
};
