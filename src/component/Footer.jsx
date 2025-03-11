"use client";
import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import {useLang} from "@/context/LangContext";

const Footer = () => {
	
	const { translations } = useLang();
	return (
		<Box sx={{ paddingY: 3 }}>
			<Box component="footer" textAlign="center">
				<Typography>{translations.footer1}</Typography> {/* Исправлен закрывающий тег */}
				<Typography variant="body2" sx={{ my: "1rem" }}>
					{translations.footer2}
				</Typography>
				<Typography
					align="center"
					component="a"
					sx={{ color: "white", textDecoration: "underline" }}
					href="/file.docx"
				>
					{translations.footer3}
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
