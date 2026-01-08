// components/ui/category-select.tsx
"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

export function CategorySelect({
  value,
  onChange,
  options,
  placeholder = "Select category...",
  className,
}: CategorySelectProps) {
  // Handle string | null (shadcn/ui Select uses null, not undefined)
  const handleValueChange = (newValue: string | null) => {
    // Convert null to empty string
    onChange(newValue || "")
  }

  return (
    <Select value={value || ""} onValueChange={handleValueChange}>
      <SelectTrigger className={`w-[200px] ${className}`}>
        <SelectValue>
          {/* Render placeholder manually if SelectValue doesn't support placeholder prop */}
          {value ? (
            options.find(opt => opt.value === value)?.label || value
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All categories</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}