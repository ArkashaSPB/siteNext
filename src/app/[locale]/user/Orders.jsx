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
import {useLang} from "@/context/LangContext";

const Orders = ({orders,getOrdersFunc}) => {


	const { translations } = useLang();

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
								<Typography variant="h6">{translations.userZakaz} #{order.id}</Typography>
								<IconButton onClick={() => handleToggleOrder(order.id)}>
									<ExpandMoreIcon />
								</IconButton>
							</Box>
							<Typography variant="body2" color="textSecondary">
								{translations.userOplata}: {order.oplata === 0 ? translations.userOplataStatus :  translations.userOplataStatus2}
							</Typography>
							<Typography  variant="body2" color="textSecondary">
								{translations.userGoodsStatus}: <span style={{color:order.status ? '#58d104': '#bc9a03' }} >{!order.status ? translations.userGoodsStatusInfo : translations.userGoodsStatusInfo2}</span>
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{translations.userDate}: {new Date(order.date).toLocaleString()}
							</Typography>
							<Typography variant="h6">{translations.userSumma}: ${order.price}</Typography>
							{!order.oplata && (new Date() - new Date(order.date) <= 60 * 60 * 1000) ? (
								<Button sx={{ my: 2 }} variant="contained"
												onClick={() => clickB(order.price, order.id)}>
									{translations.userGoodsButton}
								</Button>
							) : null}
						</CardContent>

						<Collapse in={expandedOrders[order.id]} timeout="auto" unmountOnExit>
							<Box sx={{ padding: 2 }}>
								<Typography variant="subtitle1">{translations.userGoods}:</Typography>
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

												<Box>
													<ListItemText
														primary={item.title}
														secondary={`${translations.userGoodsPrice}: $${item.price} x ${item.count}`}
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
				<Typography variant="body1" color="textSecondary">{translations.userInfoNoneOrder}</Typography>
			)}


			<Dialog
				open={open}
				onClose={closeM}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{translations.userOplata}
				</DialogTitle>
				<DialogContent>

					{tehEnd ?
							<>
								<Alert>
									{translations.cartEndOplata}
								</Alert>
							</>
					:
						<>
							<p>{translations.cartOplataInfo} </p>
							<Box component="p"  sx={{fontWeight: "600", textTransform: 'uppercase', mt:1}}>{translations.cartOplataInfo2}</Box>
							<Box sx={{border: '1px solid white', borderRadius: '10px', p: 1, my:2}}>
							<p>{translations.cartOplataKoshel}: <span style={{fontSize: '1.2rem'}}>{tron}</span></p>
							<p>{translations.cartOplataSumma}:  <span style={{fontSize: '1.2rem'}}>{summa} USDT</span></p>
							</Box>
							<Button disabled={!oplataId} onClick={editOplataFunc} variant="contained">{translations.cartOplataButton}</Button>
						</>
					}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Orders;