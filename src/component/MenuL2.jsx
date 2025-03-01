'use client'
import React from 'react';
import {
	Box, Container,
	Typography
} from "@mui/material";

import UserBlock from "@/component/UserBlock";
import Cart from "@/component/Cart";
import Link from "next/link";

const MenuL = () => {
	return (
		<Container sx={{py: 3}}>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<UserBlock/>
					<Box>
						<Link href="/" passHref>
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