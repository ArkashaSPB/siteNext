'use client'
import React from 'react';
import {
	Box, Container,
	Typography
} from "@mui/material";

import UserBlock from "@/component/UserBlock";
import Cart from "@/component/Cart";
import Link from "next/link";
import {useParams} from "next/navigation";
import LocaleDropdown from "@/component/LocaleDropdown";

const MenuL = () => {

	const { locale } = useParams();

	return (
		<Container sx={{py: 3}}>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<Box sx={{display: 'flex', }}>
						<LocaleDropdown/>
						<UserBlock/>
					</Box>


					<Box>
						<Link href={`/${locale}`} passHref>
						<Typography variant="h6" component="div" sx={{ color: 'white', textDecoration: 'none',  flexGrow: 1, cursor: 'pointer', fontWeight: '700', fontSize: '24px' }}>
							Accounts4u
						</Typography>
						</Link>
					</Box>
					<Cart  />
				</Box>
		</Container>
	);
};

export default MenuL;