'use client';
import {Box, Button, Container, IconButton, Typography} from "@mui/material";
import {shallow} from "zustand/shallow";
import useUserStore from "@/store/userStore";
import {getOrderIdAPI} from "@/app/api/siteAPI";
import React, {useEffect, useState} from "react";
import Orders from "@/app/user/Orders";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import {Reply} from "@mui/icons-material"; // Хранилище для корзины

export default function UserPage() {

	const [orders, setOrders] = useState()
	const id = useUserStore((state) => state.id, shallow);
	const mail = useUserStore((state) => state.mail, shallow);
	const name = useUserStore((state) => state.name, shallow);

	const getOrdersFunc = () => {
		if(id){
			getOrderIdAPI(id).then(data => {
				setOrders(data)
			})
		}
	}


	useEffect(() => {
		getOrdersFunc();
	},[id])


	return (
		<>
			<Container sx={{my:3}}>

				<Box>
					<Link href="/" passHref>
						<Button  sx={{mb: 2, color: "#49B884" }}>
							назад
						</Button>
					</Link>
				</Box>
				{id
					? <>
						<Typography variant="h5" component="p">
							Почта:  {mail}
						</Typography>


						<Box sx={{my:3}}>
							<Orders orders={orders} getOrdersFunc={getOrdersFunc} />
						</Box>
					</>
					: <>Вы не авторизованы</>
				}
			</Container>
		</>
	);
}
