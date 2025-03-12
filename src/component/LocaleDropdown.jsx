"use client";
import { useRouter, useParams, usePathname } from "next/navigation";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLang } from "@/context/LangContext";

export default function LocaleDropdown() {
	const router = useRouter();
	const pathname = usePathname();
	// Получаем locale из URL, но для выбора значения используем currentLang из контекста
	const { locale } = useParams();
	const { currentLang, changeLanguage, allLanguages } = useLang();

	const handleChange = (event) => {
		const newLocale = event.target.value;
		changeLanguage(newLocale);
		// Заменяем первую часть URL (например, "/ru") на новый язык, сохраняя остальной путь
		const newPath = pathname.replace(/^\/[^/]+/, `/${newLocale}`);
		router.push(newPath);
	};

	return (
		<Select
			value={currentLang} // currentLang из контекста, который изначально установлен из defaultLang (locale)
			onChange={handleChange}
			variant="outlined"
			size="small"
			sx={{ minWidth: 60, mr: 2 , p: 0}}
		>
			{allLanguages.map((lang) => (
				<MenuItem key={lang.id} value={lang.lang} sx={{ py: 0.4, px: 1 }}>
					{lang.lang.toUpperCase()}
				</MenuItem>
			))}
		</Select>
	);
}
