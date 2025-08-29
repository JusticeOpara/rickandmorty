import React from "react";
import { ChevronDown } from "lucide-react";


interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  selectedValue: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  disabled?: boolean;
}

const Dropdown = <T extends string>({
  selectedValue,
  onChange,
  options,
  disabled = false,
}: DropdownProps<T>) => {
  return (
    <div className="relative">
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
        className="appearance-none border border-slate-600 text-white px-4 py-2 pr-8 outline-none
        rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default Dropdown;
