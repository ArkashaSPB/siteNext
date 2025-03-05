'use client';
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material'; // Используем MUI Box

const QuantityInput = ({ item, updateItemQuantity }) => {
	const [tempQuantity, setTempQuantity] = useState(item.quantity);
	const [timeoutId, setTimeoutId] = useState(null);

	const handleQuantityChange = (e) => {
		let value = e.target.value;

		// Если поле пустое — оставляем пустым на 2 сек
		if (value === "") {
			setTempQuantity("");
		} else {
			// Ограничиваем диапазон: минимум 1, максимум `item.available`
			value = Math.max(1, Math.min(item.available, parseInt(value, 10) || 1));
			setTempQuantity(value);
		}

		// Очистка предыдущего таймера
		if (timeoutId) clearTimeout(timeoutId);

		// Запуск таймера на 2 секунды
		const newTimeout = setTimeout(() => {
			if (value === "") {
				setTempQuantity(1);
				updateItemQuantity(item.id, 1);
			} else {
				updateItemQuantity(item.id, value);
			}
		}, 700);

		setTimeoutId(newTimeout);
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<TextField
				value={tempQuantity}

				onChange={handleQuantityChange}
				inputProps={{
					min: 1,
					max: item.available,
				}}
				size="small"
				sx={{
					maxWidth: "50px",
					mr: 1,
					"& .MuiInputBase-input": {
					padding: "4px 10px", // Внутренние отступы (верх-низ, лево-право)
						textAlign: "center",
				},
				}}
			/>
			{/*<Box component="span" sx={{ fontWeight: "bold" }}>шт</Box>*/}
		</Box>
	);
};

export default QuantityInput;
