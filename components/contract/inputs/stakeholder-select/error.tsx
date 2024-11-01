"use client";
import { ErrorBoundary } from "react-error-boundary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";
export function StakeholderSelectErrorBoundary({ children, className }) {
  const ErrorComponent = useCallback(
    ({ resetErrorBoundary }) => (
      <Select>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Sélectionner une catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            disabled
            value="__error__"
            className="cursor-pointer text-destructive"
            onSelect={resetErrorBoundary}
          >
            Erreur lors du chargement
          </SelectItem>
        </SelectContent>
      </Select>
    ),
    [className],
  );
  return (
    <ErrorBoundary fallbackRender={ErrorComponent}>{children}</ErrorBoundary>
  );
}
