import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductsFetch } from "@/hooks/useProducts";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import chevronRight from "@/assets/icons/chevron-right.svg";
import { PRODUCTS_PER_PAGE } from "@/components/const";
import { CategoryEnum } from "@/components/enum/category"
import ProductSkeleton from "@/components/shared/ProductSkeleton";
import type { ProductOutput } from "@/schemas/productSchema";

const Products = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");

  const searchFromUrl = searchParams.get("search") ?? "";

  useEffect(() => {
    setPage(1);
  }, [searchFromUrl, category]);

  const { data, isLoading, isError } = useProductsFetch({
    page,
    search: searchFromUrl,
    category: category || CategoryEnum.ALL,
  });

  const products = data?.rows ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearchParams(searchFromUrl ? { search: searchFromUrl } : {});
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="px-4 md:px-10 mt-4 md:mt-8">
        <div className="bg-[linear-gradient(135deg,#1a1a1a_0%,#2d2d2d_50%,#1a1a1a_100%)] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative gap-10 md:gap-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.04)_0%,transparent_60%)]">
          <div className="relative z-10 w-full md:w-auto text-center md:text-left">
            <p className="text-[10px] md:text-[11px] font-semibold tracking-[2px] uppercase text-muted mb-4">{t("products.hero.eyebrow")}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-[-1.5px] mb-4">
              {t("products.hero.title_part1")}
              <br className="hidden md:block" />
              <em className="not-italic text-[#a3a3a3]"> {t("products.hero.title_em")}</em> {t("products.hero.title_part2")}
            </h1>
            <p className="text-sm md:text-base text-[#737373] max-w-[380px] leading-relaxed mb-8 mx-auto md:mx-0">{t("products.hero.desc")}</p>
            <button className="inline-flex items-center gap-2 bg-white text-[#171717] border-none rounded-full py-3 px-6 text-sm font-semibold cursor-pointer transition-all hover:bg-[#e5e5e5] hover:scale-105 active:scale-95" onClick={scrollToProducts}>
              {t("products.hero.cta")}
              <img src={chevronRight} alt="" className="w-3.5 h-3.5 brightness-0" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 relative z-10 w-full md:w-auto">
            {[
              { num: `8+`, lbl: t("products.hero.chips.products") },
              { num: t("products.hero.chips.delivery_val"), lbl: t("products.hero.chips.delivery") },
              { num: "100%", lbl: t("products.hero.chips.secure") },
              { num: "4.9★", lbl: t("products.hero.chips.rating") },
            ].map((chip) => (
              <div key={chip.lbl} className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl py-4 px-5 text-white">
                <div className="text-2xl font-bold tracking-tight">{chip.num}</div>
                <div className="text-[11px] text-[#737373] mt-0.5">{chip.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 pb-20 w-full" id="products">
        <div className="flex items-center justify-between mb-8 mt-12 gap-4">
          <h2 className="text-[20px] md:text-[22px] font-bold tracking-tight">{t("products.title")}</h2>
          <span className="text-[12px] md:text-[13px] text-muted whitespace-nowrap">
            {isLoading ? t("products.loading") : `${total} ${total === 1 ? t("cart.item") : t("cart.items")}`}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {Object.values(CategoryEnum).map((thisCategory) => {
            const label = t(`categories.${thisCategory}`);

            return (
              <button
                key={thisCategory}
                className={` py-1.5 px-4 rounded-full border border-border text-[13px] font-medium transition-all cursor-pointer hover:bg-accent hover:text-white hover:border-accent ${category === thisCategory ? "bg-accent text-white border-accent" : "bg-surface text-text-secondary"} `}
                onClick={() => handleCategoryChange(thisCategory)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center p-10">
            <h2 className="text-2xl font-bold">{t("products.error.title")}</h2>
            <p className="text-muted text-[15px]">{t("products.error.desc")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              {isLoading
                ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => <ProductSkeleton key={i} />)
                : products?.map((product: ProductOutput) => <ProductCard key={product.id} product={product} />)}
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>
    </>
  );
};

export default Products;
