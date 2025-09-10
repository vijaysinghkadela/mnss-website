import { Container } from "./ui/Container";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-8 bg-gray-50">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-1">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Marut Narayan Sewa Sansthan. All rights
            reserved.
          </div>
          <div className="text-sm text-gray-500">
            {t("contact")}: marutnarayan7181@gmail.com
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/donate"
            className="inline-flex items-center px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow"
          >
            {t('donate')}
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
