import { useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/product";
import CartDrawer from "./CartDrawer";
import LanguageSelector from "./LanguageSelector";
import searchIcon from "@/assets/icons/search.svg";
import cartIcon from "@/assets/icons/cart.svg";
import checkIcon from "@/assets/icons/check.svg";
import { MIN_TO_FREE_SHIPPING } from "@/components/const";

export default function Header() {
  const { t } = useTranslation();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const isOpen = useCartStore((s) => s.isOpen);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isProductsPage = location.pathname === "/app" || location.pathname === "/app/";

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`/app?search=${encodeURIComponent(search.trim())}`);
    },
    [search, navigate],
  );

  return (
    <>
      <div className="bg-accent text-white text-center py-2.5 text-xs font-medium tracking-wide">
        {t("header.promo", { price: MIN_TO_FREE_SHIPPING })}
        <button className="text-muted no-underline ml-2 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
          {t("header.see_more")}
        </button>
      </div>

      <header className="sticky top-0 z-50 bg-[#fafafad9] backdrop-blur-md border-b border-border px-5 md:px-16 h-16 flex items-center justify-between">
        <Link
          to="/app"
          className="text-lg font-bold tracking-tight text-text-main no-underline shrink-0"
        >
          Virtu <span className="text-muted font-normal hidden sm:inline">store</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end min-w-0">
          {isProductsPage && (
            <form
              className="flex items-center gap-2 bg-surface border border-border rounded-full py-[7px] px-[14px] text-[13px] transition-all shadow-sm focus-within:shadow-md w-full max-w-[250px] min-w-0"
              onSubmit={handleSearch}
            >
              <img src={searchIcon} alt="" className="w-3.5 h-3.5 shrink-0" />
              <input
                className="border-none bg-transparent outline-none text-[13px] text-text-main w-full font-inherit placeholder:text-muted"
                type="text"
                placeholder={t("header.search_placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label={t("header.search_placeholder")}
              />
            </form>
          )}

          <div className="shrink-0 flex items-center gap-2">
            <LanguageSelector />

            <button
              className="relative bg-surface border border-border rounded-full py-2 pr-2 sm:pr-4 pl-3 flex items-center gap-2 cursor-pointer text-sm font-medium text-text-main transition-all shadow-sm hover:bg-accent hover:text-white hover:border-accent group"
              onClick={openCart}
              aria-label={t("header.cart")}
            >
              <img src={cartIcon} alt="" className="w-4 h-4 transition-all group-hover:brightness-0 group-hover:invert" />
              <span className="hidden sm:inline">{t("header.cart")}</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-bg transition-transform duration-300 group-hover:scale-110"
                  id="cartBadge"
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isOpen} />

      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 translate-y-[80px] bg-accent text-white py-3 px-5 rounded-full text-[13px] font-medium z-[999] transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.25)] pointer-events-none data-[show=true]:translate-y-0"
        id="global-toast"
      >
        <img src={checkIcon} alt="" className="w-3.5 h-3.5" style={{ filter: 'invert(58%) sepia(85%) saturate(405%) hue-rotate(94deg) brightness(97%) contrast(87%)' }} />
        <span id="global-toast-msg" />
      </div>
    </>
  );
}
