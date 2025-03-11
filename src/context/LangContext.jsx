"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext({
	translations: {},
	currentLang: "ru",
	changeLanguage: () => {},
	allLanguages: []
});

export function LangProvider({ children, serverLangs = [], defaultLang = "ru" }) {
	// Вычисляем начальное значение синхронно для SSR
	const initialTranslation =
		serverLangs.length > 0
			? serverLangs.find(lang => lang.lang === defaultLang) || serverLangs[0]
			: {};
	const [translations, setTranslations] = useState(initialTranslation);
	const [currentLang, setCurrentLang] = useState(initialTranslation.lang || defaultLang);
	const [allLanguages, setAllLanguages] = useState(serverLangs);

	useEffect(() => {
		// На клиенте проверяем localStorage (если нужно менять язык по сохраненному значению)
		const savedLang = localStorage.getItem("selectedLang");
		if (serverLangs.length > 0 && savedLang && savedLang !== currentLang) {
			const selectedLang =
				serverLangs.find(lang => lang.lang === savedLang) ||
				serverLangs.find(lang => lang.lang === defaultLang) ||
				serverLangs[0];
			setCurrentLang(selectedLang.lang);
			setTranslations(selectedLang);
		}
	}, [serverLangs, defaultLang]);

	const changeLanguage = (lang) => {
		localStorage.setItem("selectedLang", lang);
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
