import React, {useContext, useRef, useState} from 'react';
import {TextField} from "@mui/material";
import useGoodsStore from "@/store/goodsStore";
import {useLang} from "@/context/LangContext";

const QuantityInputGoods = ({ selectedProduct, setSelectedProduct }) => {

	const [quantity, setQuantity] = useState(selectedProduct ? selectedProduct.quantity : 1);
	const timeoutRef = useRef(null);


	const { translations } = useLang();
	const handleQuantityChange = (e) => {

		let value = e.target.value.trim(); // Убираем пробелы

		// Очистка предыдущего таймера
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// Если поле пустое, даем 1 секунду перед установкой 1
		if (value === '') {
			setQuantity('');
			timeoutRef.current = setTimeout(() => setQuantity(1), 1000);
			return;
		}

		// Преобразуем в число и ограничиваем диапазон
		let numberValue = parseInt(value, 10) || 1;
		const maxValue = selectedProduct ? selectedProduct.available : 1;
		if (numberValue > maxValue) numberValue = maxValue;
		if (numberValue < 1) numberValue = 1;
		setQuantity(numberValue);
		if (selectedProduct) {
			useGoodsStore.getState().updateItemQuantity(selectedProduct.id, numberValue);
			setSelectedProduct((prev) => ({ ...prev, quantity: numberValue }));
		}
	};

	return (
		<TextField
			label={translations.goodCol}
			type="number"
			value={quantity}
			onChange={handleQuantityChange}
			fullWidth
			sx={{
				minWidth: 120,
				"& .MuiInputBase-input": { padding: "16px 16px" },
				"& .MuiInputLabel-root": {
					fontFamily: "'Montserrat', sans-serif",
					fontWeight: 700,
					fontSize: "12px",
					color: "white",
				},
			}}
		/>
	);
};

export default QuantityInputGoods;