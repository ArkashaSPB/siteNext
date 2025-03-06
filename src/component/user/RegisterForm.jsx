import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { regUserAPI } from '@/app/api/siteAPI';
import useUserStore from "@/store/userStore";

const RegisterForm = ({ setTab, setNotification, setSnackbarOpen, setModalOpen }) => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const { check } = useUserStore();

	const handleRegister = async () => {
		regUserAPI({ email, password: pass})
			.then(data => {
				setNotification('Регистрация успешна! Теперь вы можете авторизоваться.');
				setSnackbarOpen(true);

				if (data.token) {
					localStorage.setItem('token', data.token);
					setNotification('Успешно вошли в систему!');
					setSnackbarOpen(true);
					check();
					setModalOpen(false)
				}

			})
			.catch((err) => {
				setNotification(err.response?.data?.error || 'Ошибка регистрации');
				setSnackbarOpen(true);
			});
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
