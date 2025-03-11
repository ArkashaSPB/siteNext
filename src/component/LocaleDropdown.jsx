"use client";
import { useRouter, useParams, usePathname } from "next/navigation";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLang } from "@/context/LangContext";

export default function LocaleDropdown() {
	const router = useRouter();
	const pathname = usePathname();
	const { locale } = useParams();
	const { currentLang, changeLanguage, allLanguages } = useLang();

	const handleChange = (event) => {
		const newLocale = event.target.value;
		changeLanguage(newLocale);
		// Заменяем первую часть URL (например, "/ru") на новый язык, сохраняя остальную часть пути
		const newPath = pathname.replace(/^\/[^/]+/, `/${newLocale}`);
		router.push(newPath);
	};

	return (
		<Select
			value={currentLang}
			onChange={handleChange}
			variant="outlined"
			size="small"
			sx={{ minWidth: 80, mr: 2 }}
		>
			{allLanguages.map((lang) => (
				<MenuItem key={lang.id} value={lang.lang}>
					{lang.lang.toUpperCase()}
				</MenuItem>
			))}
		</Select>
	);
}
