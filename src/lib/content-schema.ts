import { z } from "zod";

export const guideFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reviewStatus: z.literal("reviewed"),
  category: z.enum(["보증", "계약", "대출", "금리"]).optional(),
  sources: z.array(z.string()).min(1),
  disclaimer: z.literal("financial-general"),
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;
