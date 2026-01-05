"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const plantCategories = [
  { value: "", label: "None" },
  { value: "Indoor", label: "Indoor" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Succulent", label: "Succulent" },
  { value: "Flowering", label: "Flowering" },
  { value: "Herb", label: "Herb" },
  { value: "Fern", label: "Fern" },
  { value: "Tree", label: "Tree" },
  { value: "Shrub", label: "Shrub" },
];

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
//   const [values, setValues] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between"
        >
          {value
            ? plantCategories.find((catgories) => catgories.value === value)?.label
            : "Select catgories..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Search catgories..." className="h-9" />
          <CommandList>
            <CommandEmpty>No catgories found.</CommandEmpty>
            <CommandGroup>
              {plantCategories.map((catgories) => (
                <CommandItem
                  key={catgories.value}
                  value={catgories.value}
                  onSelect={(currentValue) => {
                   onChange(currentValue);
                    setOpen(false)
                  }}
                >
                  {catgories.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === catgories.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
