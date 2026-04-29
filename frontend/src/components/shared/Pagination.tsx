import chevronLeft from "@/assets/icons/chevron-left.svg";
import chevronRight from "@/assets/icons/chevron-right.svg";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        className="w-9 h-9 rounded-full border border-border bg-surface flex items-center justify-center cursor-pointer text-[13px] font-medium text-text-secondary transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:bg-accent hover:not-disabled:border-accent hover:not-disabled:text-white"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        <img src={chevronLeft} alt="" className="w-3.5 h-3.5" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`w-9 h-9 rounded-full border border-border flex items-center justify-center cursor-pointer text-[13px] font-medium transition-all hover:bg-accent hover:border-accent hover:text-white ${p === page ? "bg-accent border-accent text-white" : "bg-surface text-text-secondary"}`}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className="w-9 h-9 rounded-full border border-border bg-surface flex items-center justify-center cursor-pointer text-[13px] font-medium text-text-secondary transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:bg-accent hover:not-disabled:border-accent hover:not-disabled:text-white"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Próxima página"
      >
        <img src={chevronRight} alt="" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
