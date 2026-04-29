import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductOutput } from "@/schemas/productSchema";
import { formatBRL } from "@/utils/format";
import { useAddToCart } from "@/hooks/useAddToCart";
import plusIcon from "@/assets/icons/plus.svg";

interface ProductCardProps {
  product: ProductOutput;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const { addToCart, addedId } = useAddToCart();
  const isAdded = addedId === product.id;

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer relative group hover:-translate-y-1 hover:shadow-custom-lg hover:border-transparent">
      <Link to={`/app/products/${product.id}`} tabIndex={-1} aria-hidden="true" className="block">
        <div className="aspect-square bg-[#f5f5f5] overflow-hidden relative flex items-center justify-center">
          <img className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105" src={product.image || ""} alt={product.name || ""} loading="lazy" />
          <button
            className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 bg-[#171717e6] text-white border-none rounded-full py-2 px-5 text-xs font-semibold cursor-pointer whitespace-nowrap transition-all duration-250 backdrop-blur-sm group-hover:opacity-100 group-hover:translate-y-0"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            {t("product_card.add_to_cart")}
          </button>
        </div>
      </Link>

      <div className="p-4 pb-5">
        <Link to={`/app/products/${product.id}`} className="no-underline block">
          <p className="text-[15px] font-semibold text-text-main mb-1 leading-snug">{product.name}</p>
        </Link>
        <p className="text-[13px] text-muted mb-4 leading-relaxed line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-text-main">{formatBRL(product.price)}</span>
          </div>
          <button
            className={`w-[38px] h-[38px] rounded-full border border-border bg-surface flex items-center justify-center cursor-pointer transition-all shrink-0 hover:bg-accent hover:border-accent group/btn ${isAdded ? "animate-add-pop !bg-green-500 !border-green-500" : ""}`}
            onClick={() => addToCart(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <img src={plusIcon} alt="" className={`w-4 h-4 transition-all duration-200 group-hover/btn:brightness-0 group-hover/btn:invert ${isAdded ? "brightness-0 invert" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
