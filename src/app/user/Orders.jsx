import React, {useEffect, useState} from 'react';
import {
	Alert,
	Box, Button,
	Card,
	CardContent,
	CardMedia,
	Collapse, Dialog, DialogContent, DialogContentText, DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@mui/material";
const url = process.env.NEXT_PUBLIC_IMG;
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {addOplataAPI, editOplataAPI, getSettingAPI} from "@/app/api/siteAPI";

const Orders = ({orders,getOrdersFunc}) => {

	const [expandedOrders, setExpandedOrders] = useState({});

	const [tron, setTron] = useState(null)

	const [summa, setSumma] = useState(0)
	const [id, setId] = useState(0)

	const [open, setOpen] = useState(false)

	const [oplataId, setOplataId] = useState(null)

	const [tehEnd, setTehEnd] = useState(false)


	const handleToggleOrder = (orderId) => {
		setExpandedOrders((prevState) => ({
			...prevState,
			[orderId]: !prevState[orderId],
		}));
	};

	const getSettingFunc  = () => {
		getSettingAPI().then(data => setTron(data.tron) )
	}

	useEffect(() => {
		getSettingFunc()
	})

	const addOplata = (oId) => {

		addOplataAPI(oId).then(data => {
			data.id && setOplataId(data.id)
		} )

	}


	const editOplataFunc = () => {
		if (oplataId) {
			editOplataAPI(oplataId).then(data => {
				getOrdersFunc()
				data.success && setTehEnd(true)
			})
		}
	}

	const clickB = (oPrice,oId) => {
		setOpen(true)
		setSumma(oPrice)
		setId(oId)
		addOplata(oId)
	}


	const closeM = () => {
		setOpen(false)
		setTehEnd(false)
	}


	return (
		<div>
			{orders && orders.length > 0 ? (
				orders.map((order) => (
					<Card key={order.id} sx={{ mb: 3 }}>
						<CardContent>
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6">Заказ #{order.id}</Typography>
								<IconButton onClick={() => handleToggleOrder(order.id)}>
									<ExpandMoreIcon />
								</IconButton>
							</Box>
							<Typography variant="body2" color="textSecondary">
								Оплата: {order.oplata === 0 ? 'Не оплачен' :  'Оплачен'}
							</Typography>
							<Typography  variant="body2" color="textSecondary">
								Статус: <span style={{color:order.status ? '#58d104': '#bc9a03' }} >{!order.status ? 'Обрабатывается' : 'Выполнен'}</span>
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Дата: {new Date(order.date).toLocaleString()}
							</Typography>
							<Typography variant="h6">Сумма: ${order.price}</Typography>
							{!order.oplata && (new Date() - new Date(order.date) <= 60 * 60 * 1000) ? (
								<Button sx={{ my: 2 }} variant="contained"
												onClick={() => clickB(order.price, order.id)}>
									Оплатить
								</Button>
							) : null}
						</CardContent>

						<Collapse in={expandedOrders[order.id]} timeout="auto" unmountOnExit>
							<Box sx={{ padding: 2 }}>
								<Typography variant="subtitle1">Товары:</Typography>
								<List>
									{order.items.map((item) => (
										<ListItem key={item.id}>
											<Box display="flex" alignItems="center" gap={3}>

												<Box sx={{
													width: 40, height: 40, borderRadius: 100, overflow: 'hidden',
												}}>
													<CardMedia
														component="img"
														alt={item.title}
														height="30"
														image={url+item.img1}
														sx={{width: '100%',
															height: '100%',
															objectFit: 'cover',
															objectPosition: 'center'}}
													/>
												</Box>
												<Box sx={{width: 40, height: 40, borderRadius: 100, overflow: 'hidden',}}>
													<CardMedia
														component="img"
														alt={item.title}
														height="30"
														image={url+item.img2}
														sx={{width: '100%',
															height: '100%',
															objectFit: 'cover',
															objectPosition: 'center'}}
													/>
												</Box>

												<Box>
													<ListItemText
														primary={item.title}
														secondary={`Цена: $${item.price} x ${item.count}`}
													/>
												</Box>
											</Box>
										</ListItem>
									))}
								</List>
							</Box>
						</Collapse>
					</Card>
				))
			) : (
				<Typography variant="body1" color="textSecondary">У пользователя нет заказов.</Typography>
			)}


			<Dialog
				open={open}
				onClose={closeM}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Оплата
				</DialogTitle>
				<DialogContent>

					{tehEnd ?
							<>
								<Alert>
									Отлично, после проверки статус заказа автоматически сменится
								</Alert>
							</>
					:
						<>
							<p>Переведите указанную сумму на кошелек через Tron</p>
							<p>Кошелек: <span style={{fontSize: '1.2rem'}}>{tron}</span></p>
							<p>Сумма:  <span style={{fontSize: '1.2rem'}}>{summa} USDT</span></p>
							<Button disabled={!oplataId} onClick={editOplataFunc} variant="contained">Оплатил</Button>
						</>

					}

				</DialogContent>

			</Dialog>
		</div>
	);
};

export default Orders;