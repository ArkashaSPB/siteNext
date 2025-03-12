'use client'
import React, {useContext} from 'react';
import { Box, Typography } from "@mui/material";
import {useLang} from "@/context/LangContext";

const img = [
	{ img: '/ico/ym.svg', alt: 'ym' },
	{ img: '/ico/gmail.svg', alt: 'gmail' },
	{ img: '/ico/insta.svg', alt: 'Instagram' },
	{ img: '/ico/mmm.svg', alt: 'mesenger' },
	// { img: '/ico/pbx.svg', alt: 'Pbx' },
	{ img: '/ico/skype.svg', alt: 'skype' },
	{ img: '/ico/telega.svg', alt: 'Telegram' },
	{ img: '/ico/ttt.svg', alt: 'ttt' },
	{ img: '/ico/vk.svg', alt: 'vk' },
	{ img: '/ico/you.svg', alt: 'you' },
];

const img2 = [
	{ img: '/ico/netflix.svg', alt: 'netflix' },
	{ img: '/ico/badoo.svg', alt: 'badoo' },
	{ img: '/ico/1x.svg', alt: '1x' },
];



const ImgMain = () => {

	const { translations } = useLang();

	return (
		<Box sx={styles.container}>
			<Box sx={styles.leftBlur}></Box>
			<Box sx={styles.rightBlur}></Box>

			<Box sx={styles.iconRow}>
				{img.map((item, index) => (
					<Box component="img" src={item.img} key={index} alt={item.alt} sx={styles.icon} />
				))}
			</Box>

			<Typography component="p" variant="h1" sx={styles.mainTitle}>{translations.zagolovok1}</Typography>

			<Typography component="p" variant="p" sx={styles.subTitle}>{translations.zagolovok2}</Typography>

			<Typography component="p" variant="p" sx={styles.tagline}>{translations.zagolovok3}</Typography>

			<Box sx={styles.largeIconRow}>
				{img2.map((item, index) => (
					<Box component="img" src={item.img} key={index} alt={item.alt} sx={styles.largeIcon} />
				))}
			</Box>
		</Box>
	);
};

// 🔹 Вынесенные стили для удобства
const styles = {
	container: {
		position: 'relative',
		overflowY: 'visible',
		background: 'url("/Rectangle.png") no-repeat',
		backgroundSize: 'cover',
	},

	leftBlur: {
		position: 'absolute',
		width: {xs : '200px', md : '451px'} ,
		left: '0',
		top: '0%',
		height: '100%',
		background: 'rgba(73, 184, 132, 0.2)',
		filter: 'blur(400px)',
		borderRadius: '50%',
	},

	rightBlur: {
		position: 'absolute',
		width: {xs : '200px', md : '451px'} ,
		right: '0',
		top: '0%',
		height: '100%',
		background: 'rgba(255,255,255,0.2)',
		filter: 'blur(400px)',
		borderRadius: '50%',
	},

	iconRow: {
		pt: 5,
		gap: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

	},

	icon: {
		height: { xs: '25px', md: '50px' }, // xs - мобильные, md - десктоп
	},

	mainTitle: {
		textAlign: "center",
		fontSize: { xs: '16px', md: '45px' },
		mt: 3,
		textTransform: "uppercase",
		fontWeight: 800,
	},

	subTitle: {
		textAlign: "center",
		fontSize: { xs: '16px', md: '45px' },
		fontWeight: '600',
		fontStyle: "italic",
		textTransform: "uppercase",
		mb: 1,
	},

	tagline: {
		textAlign: "center",
		fontSize: { xs: '12px', md: '16px' },
		fontWeight: 500,
		color: '#49B884',
	},

	largeIconRow: {
		gap: 3,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	largeIcon: {
		height: { xs: '50px', md: '120px' },
		width: 'auto',
		maxWidth: '400px',
		objectFit: 'contain',
		aspectRatio: '1 / 1',
	},
};

export default ImgMain;
