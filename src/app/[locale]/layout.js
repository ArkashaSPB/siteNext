import { getAllLangAPI } from "@/component/api/siteAPI";
import { LangProvider } from "@/context/LangContext";
import ClientProviders from "@/component/ClientProviders";
import MenuL2 from "@/component/MenuL2";
import Footer from "@/component/Footer";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import "@/app/globals.css";

export default async function LocaleLayout(props) {
	// Получаем params (SSR)
	const params = await props.params;
	const locale = params.locale || "ru"; // например, "ru" или "en"

	// Получаем список языков из API
	const langData = await getAllLangAPI();

	// Если в списке языков нет нужного locale, перенаправляем на /ru
	const languageExists = langData.some(lang => lang.lang === locale);
	if (!languageExists) {
		redirect("/ru");
	}

	// Здесь мы НЕ включаем тег <head>, так как он уже задан в корневом layout или через head.js
	return (
		<>
			<LangProvider serverLangs={langData} defaultLang={locale}>
				<ClientProviders>
					<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
						<Box sx={{ flexGrow: 1 }}>
							<MenuL2 />
							{props.children}
						</Box>
						<Footer />
					</Box>
				</ClientProviders>
			</LangProvider>
		</>
	);
}
