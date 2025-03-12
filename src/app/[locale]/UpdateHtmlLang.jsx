"use client";
import { useEffect } from "react";

export default function UpdateHtmlLang({ locale }) {
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return null;
}