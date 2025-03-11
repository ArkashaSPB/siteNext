'use client'
import React, {useContext, useEffect, useState} from 'react';
import useCartStore from '@/store/cartStore';
import { Box, Button, Drawer, Typography, IconButton, TextField, List, ListItem, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import useUserStore from "@/store/userStore";
import {
	addOplataAPI,
	addOrderAPI,
	editOplataAPI,
	getOrderOneIdAPI,
	getPromoAPI,
	getSettingAPI
} from "@/app/api/siteAPI";
import QuantityInput from "@/component/cart/QuantityInput";
import {useLang} from "@/context/LangContext";
const url = process.env.NEXT_PUBLIC_IMG;
const Cart = () => {

	// Получаем переводы из контекста
	const { translations } = useLang();



	const [open, setOpen] = useState(false);
	const [promo, setPromo] = useState('');
	const [message, setMessage] = useState(false);
	const [nameF, setNameF] = useState('');
	const [emailF, setEmailF] = useState('');
	const [orderId, setOrderId] = useState(0)
	const [tron, setTron] = useState(null)
	const [summa, setSumma] = useState(null)
	const [messagePromo, setMessagePromo] = useState('')
	const [tehEnd, setTehEnd] = useState(false)
	const [oplataId, setOplataId] = useState(0)

	const {items, totalQuantity, totalPrice, removeItem, updateItemQuantity, clearCart, initializeCart, applyPromo } = useCartStore();
	const id = useUserStore((state) => state.id);

	useEffect(() => {
		initializeCart();
	}, []);

	useEffect(() => {
		if (items.length > 0 && message) {
			setMessage(false);
		}
	}, [items]);

	useEffect(() => {
		if(orderId > 0){
			getOrderOneIdAPI(orderId).then(data => {
				setSumma(data.price)
				addOplataAPI(data.id).then(data => {
					data.id && setOplataId(data.id)
				})
			})

			getSettingAPI().then(data => setTron(data.tron) )
		}
	}, [orderId])

	const addOrder = () => {
		const orderData = { items, count: totalQuantity, price: totalPrice, user: id, mail: emailF, name: nameF };
		if (!id && !nameF && emailF) return;
		addOrderAPI(orderData).then(data => {
			if (data.success) {
				setOrderId(data.orderId)
				clearCart();
				setMessage(true);
			}
		});
	};

	const checkPromo = () => {
		getPromoAPI(promo).then(data => {
			if (data) {
				applyPromo(data);
				setMessagePromo(<span style={{ color: "green", fontSize: "0.7rem" }}>{translations.cartPromoInfo}</span>);
			} else {
				setMessagePromo(<span style={{ color: "red", fontSize: "0.7rem" }}>{translations.cartPromoInfo2}</span>);
			}
		});
	};

	const editOplataFunc = () => {
		if (orderId) {
			editOplataAPI(oplataId).then(data => {
				data.success && setTehEnd(true)
			})
		}
	}

	const closeFunc = () => {
		setOpen(false);
		setOrderId(0)
		setOplataId(0)
		setTehEnd(false)
		setMessagePromo('')
	}

	return (
		<>
			<Button variant="contained" onClick={() => setOpen(true)} sx={sxStyles.cartButton}>
				{totalQuantity > 0 && (
					<Box sx={sxStyles.cartCount}>{totalQuantity}</Box>
				)}
				<img src="/imaga/cart.svg" alt="ico" />
				<Typography component="span" sx={sxStyles.cartText}>{translations.cart}</Typography>
			</Button>

			<IconButton variant="contained" onClick={() => setOpen(true)} sx={sxStyles.cartButton2}>
				{totalQuantity > 0 && (
					<Box sx={sxStyles.cartCount}>{totalQuantity}</Box>
				)}
				<Box component="img" src="/imaga/cart.svg" alt="ico" sx={{height: '20px'}} />
			</IconButton>

			<Drawer anchor="right" open={open} onClose={closeFunc}>
				<Box sx={sxStyles.drawer}>
					<Box sx={sxStyles.drawerHeader}>
						<Typography variant="span" sx={{fontWeight: 700, fontSize:'32px'}}>{translations.cartZag}</Typography>
						<IconButton onClick={closeFunc}>
							<CloseIcon />
						</IconButton>
					</Box>
					{orderId && items.length === 0 ?
							<Box>
								{tehEnd ?
									<>
										<Alert>
											{translations.cartEndOplata}
										</Alert>
									</>
									:
									<>
										<p>{translations.cartOplataInfo}</p>
										<Box component="p"  sx={{fontWeight: "600", textTransform: 'uppercase', mt:1}}>{translations.cartOplataInfo2}</Box>

										<Box sx={{border: '1px solid white', borderRadius: '10px', p: 1, my:2}}>
											<p>{translations.cartOplataKoshel}:<br/>
												<span style={{fontSize: '1.2rem'}}>{tron}</span>
											</p>
											<p>{translations.cartOplataSumma}:  <span style={{fontSize: '1.2rem'}}>{summa} USDT</span></p>
										</Box>


										<Button  onClick={editOplataFunc} variant="contained">{translations.cartOplataButton}</Button>
									</>
								}
							</Box>

					: null}

					<Box sx={sxStyles.itemsContainer}>
						{items.length > 0 ? (
							items.map((item) => (
								<Box key={item.id} sx={sxStyles.itemBox}>
									<Box sx={sxStyles.itemHeader}>
										<Typography variant="h5" sx={sxStyles.title}>{item.title}</Typography>
										<QuantityInput item={item} updateItemQuantity={updateItemQuantity} />
										<Typography variant="body2" sx={sxStyles.priceText}>
											{item.price}$
											{item.oldPrice && (
												(<Box component="span" sx={sxStyles.oldPriceText}>{item.oldPrice}</Box>)
											)}
										</Typography>
										<IconButton color="error" onClick={() => removeItem(item.id)}>
											<DeleteIcon />
										</IconButton>
									</Box>

								</Box>
							))
						) : (
							<Typography variant="body1" align="center" color="textSecondary">
								{!orderId ? translations.cartNull : null}
							</Typography>
						)}
					</Box>

					{items.length > 0 && (
						<Box sx={sxStyles.footer}>
							<Box sx={sxStyles.infoAll}>
								<Typography variant="body1" sx={sxStyles.fl}>
									{translations.cartCount}: <Box component="span" sx={{ textAlign: "right", fontSize: '1.3rem' }}>{totalQuantity}{translations.cartCount2}</Box>
								</Typography>
								<Typography variant="body1" sx={sxStyles.fl}>
									{translations.cartItogo}: <Box component="span" sx={{ textAlign: "right",fontSize: '1.3rem' }}>{totalPrice}$</Box>
								</Typography>
							</Box>

							<Box sx={{mb:1}}>
								<Box sx={sxStyles.promoBox}>
									<TextField value={promo} onChange={e => setPromo(e.target.value)} placeholder={translations.cartPromokod} sx={{
										"& .MuiInputBase-input": {
										padding: "7px 12px", // Внутренние отступы (верх-низ, лево-право)
									},
									}} />
									<Box><Button  variant="contained" onClick={checkPromo}>{translations.cartPromoButton}</Button></Box>
								</Box>

								{messagePromo !== '' ?
									<Box component="p">{messagePromo}</Box>
									: null
								}
							</Box>
							{/*Очистка корзины*/}
							<Button color="error" fullWidth onClick={()=>{
								clearCart()
								setMessagePromo('')
							}} sx={sxStyles.clearCartButton}>
								<DeleteIcon /> {translations.cartClearBasket}
							</Button>
							{!id && <Box component="span" sx={sxStyles.messageInfo}>{translations.cartInfo}</Box>}
							<Button variant="contained" size="large" sx={sxStyles.orderButton} fullWidth onClick={addOrder} disabled={!id}>
								{translations.cartMainButton}
							</Button>
						</Box>
					)}
				</Box>
			</Drawer>
		</>
	);
};

// 🎨 Вынесенные стили
const sxStyles = {
	quantityInput: {maxWidth: '50px'},
	oldPriceText:{pl: 1, textDecoration: 'line-through', color: 'gray', fontSize: '0.8rem'},
	infoAll:{border:"1px solid #fff" , borderRadius:"10px", p: 2, my:2,  },
	fl: { display: "flex", justifyContent: "space-between", fontWeight: "bold"},
	messageInfo: {p: 2, fontSize: '0.8rem', display: 'block'},
	priceText: {fontSize: '1.2rem', fontWeight: 'bold'},
	itemFooter:  {display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2},
	quantityBox: {display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
	cartButton: { position: 'relative', display: {xs: 'none', md: 'block'} },
	cartButton2: { position: 'relative', display: {xs: 'block', md: 'none'} },
	cartCount: {
		position: 'absolute', top: -4, right: -12, backgroundColor: 'rgba(198,10,10,0.72)',
		borderRadius: '50%', fontSize: '12px', fontWeight: 'bold', color: 'white',
		width: '27px', height: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center',
	},
	cartText: { ml: 1, color: 'white', fontSize: '16px', fontWeight: 'bold' },
	drawer: { maxWidth: '500px', minWidth:'400px', p: 2, display: 'flex', flexDirection: 'column', height: '100%' },
	drawerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 },
	itemsContainer: { paddingTop: 2, overflow: 'auto' },
	itemBox: { mb: 2, pb: 1 },
	itemHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap: 1 },
	title:{flexGrow: 1, fontWeight: 'bold'},
	imageContainer: { position: 'relative', width: 30, height: 30, borderRadius: 10 },
	smallImage: { position: 'absolute', width: 19, height: 19, top: -9, right: -9, borderRadius: 10 },
	mainImage: { width: '100%', height: '100%' },
	footer: { },
	promoBox: { display: 'flex', gap: 2,justifyContent: 'space-between', alignItems: 'center'  },
	clearCartButton: { my: 0 },
	orderButton: { mt: 2, borderRadius: '10px' },
};

export default Cart;
