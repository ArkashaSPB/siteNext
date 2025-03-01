'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, TextField } from '@mui/material';
import useGoodsStore from '../store/goodsStore';
import useCartStore from '../store/cartStore';
import { shallow } from 'zustand/shallow';

const url = process.env.NEXT_PUBLIC_IMG;

const Goods = () => {
	const goods = useGoodsStore((state) => state.goods, shallow);
	const categories = useGoodsStore((state) => state.categories, shallow);
	const countries = useGoodsStore((state) => state.countries, shallow);
	const loadGoods = useGoodsStore((state) => state.loadGoods);
	const addItemToCart = useCartStore((state) => state.addItem);

	const [selectedCategory, setSelectedCategory] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		if (!goods.length) {
			loadGoods();
		}
	}, [loadGoods, goods.length]);

	useEffect(() => {
		if (categories.length > 0 && !selectedCategory) {
			setSelectedCategory(categories[0].kod);
			setCategoryName(categories[0]);
		}
	}, [categories]);

	useEffect(() => {
		if (filteredProducts.length > 0) {
			setSelectedProduct(filteredProducts[0]); // Выбираем первый товар
			setSelectedCountry(filteredProducts[0].country); // Устанавливаем страну
		}
	}, [selectedCategory, goods]);

	let filteredProducts = selectedCategory
		? goods.filter((product) => product.category === selectedCategory)
		: [];

	if (searchQuery) {
		filteredProducts = filteredProducts.filter((product) =>
			product.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	const handleCategoryChange = (category) => {
		setSelectedCategory(category.kod);
		setSelectedProduct(null);
		setSelectedCountry('');
		setCategoryName(category);
		setSearchQuery('');
	};

	const handleProductChange = (event) => {
		const product = filteredProducts.find((p) => p.id === event.target.value);
		setSelectedProduct(product);
		setSelectedCountry(product ? product.country : '');
	};
	console.log(selectedProduct)

	return (
		<Box>
			<Box sx={styles.container}>

				<Typography variant="h4" sx={styles.title}>Сервисы</Typography>

				<Box sx={styles.gridContainer}>
					<TextField
						fullWidth
						placeholder="Поиск по названию..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						sx={styles.searchField}
					/>

					{categories
						.filter((category) =>
							category.name.toLowerCase().includes(searchQuery.toLowerCase())
						)
						.map((category) => (
							<Box
								key={category.kod}
								onClick={() => handleCategoryChange(category)}
								sx={{
									...styles.categoryBox,
									backgroundColor: selectedCategory === category.kod ? 'white' : null,
									color: selectedCategory === category.kod ? 'black' : null,
								}}
							>
								<img src={url + category.img} style={styles.categoryImage} />
								<Box component="span">{category.name}</Box>
							</Box>
						))}
				</Box>
			</Box>

			{selectedCategory && (
				<Box sx={styles.productContainer}>
					<Box sx={styles.productHeader}>
							{/*<img src={url + categoryName.img} height={22} style={{ marginRight: 10 }} />*/}
							<Box component="span" sx={{fontSize:'36px', fontWeight: '600'}}>{categoryName.name}</Box>
						<Box component="span" fontSize={'20px'} sx={styles.rightT}>Цена: {selectedProduct && selectedProduct.price}$</Box>
					</Box>

					<Box sx={styles.productControls}>
						<Box sx={styles.flexItem}>
							<Box component="span" sx={styles.infoSpan}>Страна:</Box>
							<Select
								value={selectedProduct ? selectedProduct.id : ''}
								onChange={handleProductChange}
								fullWidth
								variant="outlined"
								sx={styles.selectS}
							>
								{filteredProducts.map((product) => {
									const countryName = countries.find((c) => c.kod === product.country)?.name || product.country;
									return (
										<MenuItem key={product.id} value={product.id}>
											{countryName}
										</MenuItem>
									);
								})}
							</Select>
						</Box>

						<Box sx={styles.flexItem}>
							<Box component="span" sx={styles.infoSpan}>Доступно: {selectedProduct && selectedProduct.available}шт</Box>

							<TextField
								label="Количество"
								type="number"
								value={selectedProduct ? selectedProduct.quantity : 1}
								onChange={(e) => {
									let value = parseInt(e.target.value, 10) || 1;
									const maxValue = selectedProduct ? selectedProduct.available : 1;
									if (value > maxValue) value = maxValue;
									if (value < 1) value = 1;
									if (selectedProduct) {
										useGoodsStore.getState().updateItemQuantity(selectedProduct.id, value);
										setSelectedProduct((prev) => ({ ...prev, quantity: value }));
									}
								}}
								fullWidth
								sx={{
									minWidth: 120,
									"& .MuiInputBase-input": {
										padding: "16px 16px",
									},
									"& .MuiInputLabel-root": {
										fontFamily: "'Montserrat', sans-serif", // Меняем шрифт
										fontWeight: 700, // Делаем жирным
										fontSize: "12px", // Устанавливаем размер шрифта
										color: "white", // Цвет текста
									},
								}}
							/>

						</Box>

						<Box sx={styles.buyButtonContainer}>
							<Box component="span" sx={styles.infoSpan}>Итого: {selectedProduct && selectedProduct.price * selectedProduct.quantity}$</Box>
							<Button
								variant="contained"
								disabled={!selectedProduct}
								size="large"
								sx={{ minWidth: 150, padding: {xs:"10px 12px", md: "16px 12px" } ,width: { xs: "100%", md: "auto" }, }}
								onClick={() => {
									if (!selectedProduct) return;
									useCartStore.getState().addItem({
										id: selectedProduct.id,
										title: selectedProduct.title,
										img1: selectedProduct.img1,
										price: selectedProduct.price,
										img2: selectedProduct.img2,
										available: selectedProduct.available,
										quantity: selectedProduct.quantity,
									});
								}}
							>
								Купить
							</Button>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

// 🔥 Вынесенные стили
const styles = {
	rightT:{
		fontWeight: '700',
		display: "flex",
		justifyContent:{
			xs: "flex-end",
			md: "flex-start",
		}
	},
	selectS:{ minWidth: 200,
		borderRadius: "10px",
		"& .MuiOutlinedInput-notchedOutline": {
			borderColor: "white", // Белая рамка
		},
		"&:hover .MuiOutlinedInput-notchedOutline": {
			borderColor: "#49B884", // При наведении — зеленая рамка
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#49B884", // При фокусе — зеленая рамка
		}},
	infoSpan:{fontSize: '20px', fontWeight: 'bold', mb: 1, display: 'block'},
	container: {
		margin: 'auto',
		padding: 3,
		border: '1px solid white',
		borderRadius: '25px',
	},

	title: {
		fontSize: '20px',
		fontWeight: '700',
		mb: 3,
	},

	gridContainer: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
		gap: 2,
		marginBottom: 3,
	},

	searchField: {
		borderRadius: '8px',
		mb: 2,
		display: { xs: 'block', md: 'none' },
		"& .MuiInputBase-input": { padding: "12px 12px" },
	},

	categoryBox: {
		borderRadius: '12px',
		height: '50px',
		border: '1px solid white',
		cursor: 'pointer',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		paddingLeft: '20px',
	},

	categoryImage: {
		height: 36,
		marginRight: 10,
	},

	productContainer: {
		marginBottom: 3,
		border: '1px solid white',
		borderRadius: '25px',
		p: 3,
		mt: 3,
	},

	productHeader: {
		display: 'grid',
		gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
		alignItems: 'center',
	},

	productTitle: {
		fontSize: '20px',
		fontWeight: '700',
		mb: 3,
	},

	productControls: {
		display: 'flex',
		alignItems: 'end',
		flexDirection: { xs: 'column', md: 'row' },
		justifyContent: 'space-between',
		gap: 3,
		width: '100%',
	},

	flexItem: { flexGrow: 1, width: '100%' },

	buyButtonContainer: {
		flexGrow: 1,
		width: '100%',
		textAlign: 'right',
	},
};

export default Goods;
