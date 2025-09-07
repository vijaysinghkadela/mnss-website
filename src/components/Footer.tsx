import { Container } from "./ui/Container";
import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="py-8 bg-gray-50">
      <Container className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Marut Narayan Sewa Sansthan. All rights reserved.</div>
        <div className="mt-3 md:mt-0 text-sm text-gray-500">{t('contact')}: marutnarayan7181@gmail.com</div>
      </Container>
    </footer>
  );
}

export default Footer;
