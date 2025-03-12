import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function Page() {
  const headersList = headers();
  // Получаем Accept-Language из заголовков. Если его нет, по умолчанию "ru"
  const acceptLanguage = headersList.get("accept-language") ;
  // Выбираем первый язык (например, "en" из "en-US,en;q=0.9,...")
  const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
  redirect(`/${preferredLocale}`);
  return null;
}