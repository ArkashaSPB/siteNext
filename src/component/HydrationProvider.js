"use client";
import { useEffect } from "react";
import { useLangStore } from "@/store/langStore";

export default function HydrationProvider({ children, serverLangs }) {
	const { initLang, isLoaded } = useLangStore();

	useEffect(() => {
		if (!isLoaded) {
			initLang(serverLangs);
		}
	}, [isLoaded, serverLangs]);

	return children;
}