import type { LucideIcon } from "lucide-react";

export type ToolCategoryId = "image" | "media" | "document" | "finance";
export type ToolStatus = "live" | "building" | "planned";

export type ToolDefinition = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: ToolCategoryId;
  status: ToolStatus;
  icon: LucideIcon;
  accent: "violet" | "blue" | "mint" | "orange" | "rose";
  keywords: string[];
  localProcessing: boolean;
  maxFileSizeMb?: number;
};

export type ToolCategory = {
  id: ToolCategoryId;
  name: string;
  shortDescription: string;
  icon: LucideIcon;
  accent: ToolDefinition["accent"];
};
