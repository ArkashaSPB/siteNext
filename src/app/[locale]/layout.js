import { getAllLangAPI } from "@/app/api/siteAPI";
import { LangProvider } from "@/context/LangContext";
import ClientProviders from "@/component/ClientProviders";
import MenuL2 from "@/component/MenuL2";
import Footer from "@/component/Footer";
import { Box } from "@mui/material";
import "@/app/globals.css";

export default async function LocaleLayout(props) {
	// Ждем, когда params будут доступны (SSR)
	const params = await props.params;
	const locale = params.locale; // например, "ru" или "en"
	const langData = await getAllLangAPI();

	return (
		<html  suppressHydrationWarning>
		<head>
			<link rel="icon" type="image/png" href="/favicon.svg" />
		</head>
		<body>
		{/* Передаем выбранный язык (из URL) как defaultLang */}
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
		</body>
		</html>
	);
}
