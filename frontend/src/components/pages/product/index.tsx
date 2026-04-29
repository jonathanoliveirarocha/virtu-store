import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductFetchById } from "@/hooks/useProducts";
import { useAddToCart } from "@/hooks/useAddToCart";
import { formatBRL } from "@/utils/format";
import chevronLeft from "@/assets/icons/chevron-left.svg";
import cartIcon from "@/assets/icons/cart.svg";

export default function Product() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProductFetchById(id ?? "");
  const { addToCart } = useAddToCart();

  if (isLoading) {
    return (
      <div className="max-w-[1100px] mx-auto my-12 px-4 md:px-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 bg-surface border border-border rounded-3xl p-6 md:p-12">
          <div className="bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer aspect-square rounded-2xl" />
          <div className="flex flex-col gap-4">
            <div className="h-10 w-[90%] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer rounded-sm" />
            <div className="h-4 w-[100%] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer rounded-sm" />
            <div className="h-4 w-[80%] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer rounded-sm" />
            <div className="h-4 w-[70%] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer rounded-sm mb-4" />
            <div className="h-11 w-[50%] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer rounded-sm" />
            <div className="h-[54px] w-[100%] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-10">
        <h2 className="text-3xl font-bold">{t("product.not_found.title")}</h2>
        <p className="text-muted text-[15px]">{t("product.not_found.desc")}</p>
        <button onClick={() => navigate("/app")} className="inline-flex items-center gap-2 bg-accent text-white rounded-full py-3 px-6 text-sm font-semibold border-none cursor-pointer mt-2 transition-colors hover:bg-accent-hover">
          {t("product.not_found.back")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto my-6 md:my-12 px-4 md:px-10 w-full animate-in fade-in duration-700">
      <button className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary no-underline mb-8 transition-colors bg-transparent border-none cursor-pointer p-0 hover:text-text-main group" onClick={() => navigate(-1)}>
        <img src={chevronLeft} alt="" className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        {t("product.back")}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 bg-surface border border-border rounded-3xl p-6 md:p-12 shadow-sm transition-shadow hover:shadow-md">
        <div className="bg-[#f5f5f5] rounded-2xl overflow-hidden aspect-square flex items-center justify-center group/img">
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" src={product.row.image || ""} alt={product.row.name || ""} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
            <h1 className="text-3xl md:text-[32px] font-bold tracking-tight text-text-main leading-[1.1] mt-2">{product.row.name || ""}</h1>
          </div>
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
            <p className="text-[15px] text-text-secondary leading-relaxed">{product.row.description || ""}</p>
          </div>
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-450 fill-mode-both">
            <p className="text-3xl md:text-4xl font-bold tracking-tight text-text-main mt-2">{formatBRL(product.row.price || 0)}</p>
          </div>

          <div className="flex items-center gap-3 mt-4 animate-in slide-in-from-bottom-4 duration-500 delay-600 fill-mode-both">
            <button
              className="flex-1 bg-accent text-white border-none rounded-full py-[15px] px-6 text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-accent-hover hover:-translate-y-[2px] shadow-lg shadow-black/5 active:translate-y-0"
              onClick={() => addToCart(product.row)}
            >
              <img src={cartIcon} alt="" className="w-[18px] h-[18px] brightness-0 invert" />
              {t("product.add_to_cart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
