"use client"; // Делаем страницу клиентской

import Goods from "@/component/Goods";
import {Box, Container, Typography} from "@mui/material";
import ImgMain from "@/component/main/ImgMain";
import {useContext} from "react";
import {useLang} from "@/context/LangContext";

export default function Home() {
	const { translations } = useLang();

	return (
		<>
			<title>{translations.mainTitle}</title>
			<meta name="description" content={translations.mainDes} />
			<ImgMain />
			<Container>
				<Goods />
				<Box dangerouslySetInnerHTML={{ __html: translations.mainContent }} />
			</Container>
		</>
	);
}
