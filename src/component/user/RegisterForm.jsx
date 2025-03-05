import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { regUserAPI } from '@/app/api/siteAPI';

const RegisterForm = ({ setTab, setNotification, setSnackbarOpen }) => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const handleRegister = async () => {
		try {
			await regUserAPI({ email, password: pass });
			setNotification('Регистрация успешна! Теперь войдите.');
			setSnackbarOpen(true);
		} catch (err) {
			setNotification(err.response?.data?.error || 'Ошибка регистрации');
			setSnackbarOpen(true);
		}
	};

	return (
		<Box >
			<Typography component="div" sx={{
				fontSize: "24px",
				fontWeight: "700",
				fontStyle: "normal",
				textAlign: "center", mb: 2
			}}>
				Регистрация
			</Typography>

			<TextField
				variant="filled"
				fullWidth
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<TextField
				variant="filled"
				fullWidth
				label="Пароль"
				type="password"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<Button fullWidth variant="contained" onClick={handleRegister} size="large">
				Зарегистрироваться
			</Button>
		</Box>
	);
};

export default RegisterForm;
