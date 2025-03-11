import { create } from "zustand";
import {getAllLangAPI} from "@/app/api/siteAPI";

export const useLangStore = create((set, get) => ({
	allLanguages: [], // Все языки с сервера
	currentLang: "ru", // Выбранный язык (по умолчанию "ru")
	translations: {}, // Текущие переводы
	isLoaded: false, // Флаг загрузки языков

	initLang: async (serverLangs = null, defaultLang = "ru") => {
		try {
			let data;

			if (serverLangs) {
				data = serverLangs; // Используем данные с сервера
			} else {
				const savedLang = typeof window !== "undefined" ? localStorage.getItem("selectedLang") || defaultLang : defaultLang;
				data = await getAllLangAPI(); // Получаем языки через API на клиенте
			}

			set({ allLanguages: data, isLoaded: true });
			const selectedLang = data.find(item => item.lang === defaultLang) || data[0] || {};
			set({ currentLang: selectedLang.lang, translations: selectedLang });
		} catch (error) {
			console.error("Ошибка загрузки языков:", error);
		}
	},

	waitForInit: async () => {
		if (!get().isLoaded) {
			await get().initLang();
		}
	},

	setLang: (lang) => {
		set((state) => {
			const selectedLang = state.allLanguages.find(item => item.lang === lang) || state.allLanguages[0] || {};
			if (typeof window !== "undefined") {
				localStorage.setItem("selectedLang", lang);
			}
			return { currentLang: selectedLang.lang, translations: selectedLang };
		});
	}
}));