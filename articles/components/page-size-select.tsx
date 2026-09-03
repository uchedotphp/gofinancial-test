"use client";

import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PageSizeSelectProps = {
  pageSize: number;
  sizes: number[];
  hrefBySize: Record<string, string>;
};

export function PageSizeSelect({
  pageSize,
  sizes,
  hrefBySize,
}: PageSizeSelectProps) {
  const router = useRouter();

  function handlePageSizeChange(value: string) {
    const href = hrefBySize[value];
    if (!href) return;
    router.push(href);
  }

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="rows-per-page" className="text-muted font-normal">
        Rows per page
      </Label>
      <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
        <SelectTrigger id="rows-per-page" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          {sizes.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
