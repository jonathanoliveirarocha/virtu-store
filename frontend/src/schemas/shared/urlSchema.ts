import { z } from "zod";
import i18next from "i18next";

export const urlSchema = z
  .string()
  .optional()
  .nullable()
  .refine(
    (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: i18next.t("validation.invalid_url"),
    },
  );

export type url = z.input<typeof urlSchema>;
export type UrlInterface = z.infer<typeof urlSchema>;
