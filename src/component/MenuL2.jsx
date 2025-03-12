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
		<Container sx={{ py: 3 }}>
			<Box
				sx={{
					display: {xs: 'flex', md: 'grid'},
					gridTemplateColumns:'1fr auto 1fr', // Три колонки: левая, центр, правая
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{/* Левая часть */}
				<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Box>
						<LocaleDropdown />
					</Box>
					<UserBlock />
				</Box>

				{/* Центр */}
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Link href={`/${locale}`} passHref>
						<Typography
							variant="h6"
							component="div"
							sx={{
								color: 'white',
								textDecoration: 'none',
								fontWeight: '700',
								fontSize: {xs: '16px', sm: '24px'},
								cursor: 'pointer',
							}}
						>
							Accounts4u
						</Typography>
					</Link>
				</Box>

				{/* Правая часть */}
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Cart />
				</Box>
			</Box>
		</Container>

	);
};

export default MenuL;