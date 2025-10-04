import * as React from "react"
import { cn } from "@/lib/utils"

const InputGroup = ({ label, type, name, value, placeholder, icon, inputright, className, ...props }) => {
  return (
    <div className="mb-4">
      {/* Label untuk input */}
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}

      {/* Kontainer untuk input dan ikon */}
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        
        {/* Bagian ikon atau teks tambahan (opsional) */}
        {icon && (
          <span className="px-3 text-gray-500 bg-gray-50 border-r border-gray-300 rounded-l-lg">
            {icon}
          </span>
        )}

        {/* Input utama */}
        <input
          type={type}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
            "focus-visible:border-ring focus-visible:ring-indigo-300/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />

        {inputright && (
          <span className="px-3 text-gray-500 bg-gray-50 border-l border-gray-300 rounded-r-lg">
            {inputright}
          </span>
        )}
      </div>
    </div>
  );
};

export { InputGroup }