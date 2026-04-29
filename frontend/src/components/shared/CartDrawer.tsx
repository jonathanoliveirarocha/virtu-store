import { useTranslation } from "react-i18next";
import { useCartStore, CartItem } from "@/store/product";
import { formatBRL } from "@/utils/format";
import xIcon from "@/assets/icons/x.svg";
import cartIcon from "@/assets/icons/cart.svg";
import checkIcon from "@/assets/icons/check.svg";
import shieldIcon from "@/assets/icons/shield.svg";

interface CartDrawerProps {
  isOpen: boolean;
}

export default function CartDrawer({ isOpen }: CartDrawerProps) {
  const { t } = useTranslation();
  const { items, removeItem, changeQty, clearCart, closeCart, totalPrice } = useCartStore();
  const total = totalPrice();
  const count = items.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = () => {
    alert(t("cart.success_msg"));
    clearCart();
    closeCart();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside 
        className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-[95vw] bg-surface z-[300] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] border-l border-border ${isOpen ? "translate-x-0" : "translate-x-full"}`} 
        aria-label={t("cart.title")}
      >
        <div className="p-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold tracking-tight">{t("cart.title")}</h2>
            <span className="text-[13px] text-muted font-normal">{count} {count === 1 ? t("cart.item") : t("cart.items")}</span>
          </div>
          <button className="w-[34px] h-[34px] rounded-full border border-border bg-transparent flex items-center justify-center cursor-pointer transition-all hover:bg-bg" onClick={closeCart} aria-label="Fechar carrinho">
            <img src={xIcon} alt="" className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:px-6 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted py-12 px-6">
              <img src={cartIcon} alt="" className="w-12 h-12 opacity-30" />
              <p className="text-sm">{t("cart.empty")}</p>
            </div>
          ) : (
            items.map((item) => <CartItemRow key={item.product.id} item={item} onRemove={removeItem} onQty={changeQty} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 px-6 border-t border-border shrink-0">
            <div className="flex justify-between mb-1.5 text-sm text-text-secondary">
              <span>{t("cart.subtotal")}</span>
              <span>{formatBRL(total)}</span>
            </div>
            <div className="flex justify-between mb-1.5 text-sm text-text-secondary">
              <span>{t("cart.shipping")}</span>
              <span className="text-green-500 font-semibold">{t("cart.shipping_free")}</span>
            </div>
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-[15px] font-semibold">{t("cart.total")}</span>
              <span className="text-2xl font-bold tracking-tight">{formatBRL(total)}</span>
            </div>
            <button className="w-full bg-accent text-white border-none rounded-full p-4 text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 relative overflow-hidden hover:bg-accent-hover hover:-translate-y-[1px] active:translate-y-0 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.1)_100%)]" onClick={handleCheckout}>
              <img src={checkIcon} alt="" className="w-4 h-4 brightness-0 invert" />
              {t("cart.checkout")}
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-muted">
              <img src={shieldIcon} alt="" className="w-3 h-3" />
              {t("cart.secure_payment")}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItemRow({
  item,
  onRemove,
  onQty,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onQty: (id: string, delta: number) => void;
}) {
  const { product, qty } = item;
  return (
    <div className="flex gap-3 items-center p-3 rounded-[10px] border border-border transition-all animate-slide-in hover:border-[#d4d4d4]">
      <div className="w-16 h-16 rounded-[10px] bg-[#f5f5f5] overflow-hidden shrink-0 flex items-center justify-center">
        <img className="w-full h-full object-cover" src={product.image || ""} alt={product.name} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
        <p className="text-[13px] text-muted">{formatBRL(product.price)}</p>
      </div>
      <div className="flex items-center gap-2 border border-border rounded-full py-1 px-2">
        <button className="w-[22px] h-[22px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center text-base text-text-secondary transition-all hover:bg-bg hover:text-text-main" onClick={() => onQty(product.id, -1)} aria-label="Diminuir quantidade">−</button>
        <span className="text-[13px] font-semibold min-w-[16px] text-center">{qty}</span>
        <button className="w-[22px] h-[22px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center text-base text-text-secondary transition-all hover:bg-bg hover:text-text-main" onClick={() => onQty(product.id, +1)} aria-label="Aumentar quantidade">+</button>
      </div>
      <button className="bg-none border-none cursor-pointer text-muted p-1 rounded-md transition-all flex hover:text-red-500 hover:bg-red-50" onClick={() => onRemove(product.id)} aria-label="Remover item">
        <img src={xIcon} alt="" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
