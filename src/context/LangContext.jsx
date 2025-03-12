"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext({
	translations: {},
	currentLang: "ru",
	changeLanguage: () => {},
	allLanguages: []
});

export function LangProvider({ children, serverLangs = [], defaultLang = "ru" }) {
	// Вычисляем начальное значение для SSR
	const initialTranslation =
		serverLangs.length > 0
			? serverLangs.find(lang => lang.lang === defaultLang) || serverLangs[0]
			: {};

	const [translations, setTranslations] = useState(initialTranslation);
	const [currentLang, setCurrentLang] = useState(initialTranslation.lang || defaultLang);
	const [allLanguages, setAllLanguages] = useState(serverLangs);

	useEffect(() => {
		// Если доступные языки обновляются с сервера, обновляем состояние
		if (serverLangs.length > 0) {
			const selectedLang =
				serverLangs.find(lang => lang.lang === defaultLang) || serverLangs[0];
			setCurrentLang(selectedLang.lang);
			setTranslations(selectedLang);
		}
	}, [serverLangs, defaultLang]);

	const changeLanguage = (lang) => {
		// Меняем текущий язык и его переводы
		const selectedLang = allLanguages.find(item => item.lang === lang) || allLanguages[0];
		setCurrentLang(selectedLang.lang);
		setTranslations(selectedLang);
	};

	return (
		<LangContext.Provider value={{ translations, currentLang, changeLanguage, allLanguages }}>
			{children}
		</LangContext.Provider>
	);
}

export function useLang() {
	return useContext(LangContext);
}
