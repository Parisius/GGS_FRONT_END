import * as React from "react";
import { cn } from "@/lib/utils";
const FileInput = React.forwardRef(
  (
    {
      className,
      value,
      accept,
      hideFileName,
      placeholder,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => (
    <label
      ref={ref}
      className={cn(
        "flex h-10 w-full cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <input
        type="file"
        accept={accept}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.files?.[0])}
      />
      <span
        className={cn("line-clamp-1", {
          "text-muted-foreground": !value,
        })}
      >
        {!value?.name && placeholder}
        {!hideFileName && value?.name}
      </span>
    </label>
  ),
);
FileInput.displayName = "FileInput";
export { FileInput };
