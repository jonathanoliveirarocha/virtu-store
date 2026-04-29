import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-10">
      <h2 className="text-3xl font-bold">{t("notfound.title")}</h2>
      <p className="text-muted text-[15px]">
        {t("notfound.desc")}
      </p>
      <Link
        to="/app"
        className="inline-flex items-center gap-2 bg-accent text-white rounded-full py-3 px-6 text-sm font-semibold no-underline mt-2 transition-colors hover:bg-accent-hover"
      >
        {t("notfound.back")}
      </Link>
    </div>
  );
};

export default NotFound;
