import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ProductOutput } from "@/schemas/productSchema";
import { useCartStore } from "@/store/product";
import { useToast } from "@/hooks/useToast";

export const useAddToCart = () => {
  const { t } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();
  const [addedId, setAddedId] = useState<string | null>(null);

  const addToCart = useCallback(
    (product: ProductOutput) => {
      addItem(product);
      showToast(`${product.name} ${t("toast.added")}`);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 600);
    },
    [addItem, showToast, t],
  );

  return { addToCart, addedId };
};
