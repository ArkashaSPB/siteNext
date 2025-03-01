'use client';
import {Box, Container, Typography} from "@mui/material";
import {shallow} from "zustand/shallow";
import useUserStore from "@/store/userStore";
import {getOrderIdAPI} from "@/app/api/siteAPI";
import {useEffect, useState} from "react";
import Orders from "@/app/user/Orders"; // Хранилище для корзины

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
				{id
					? <>
						<Typography variant="h5" component="p">
							Почта:  {mail}
						</Typography>
						<Typography variant="h5" component="p">
							Имя: {name}
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
