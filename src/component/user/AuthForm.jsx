import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { authUserAPI } from '@/app/api/siteAPI';
import useUserStore from '@/store/userStore';
import ForgotPasswordForm from "@/component/user/ForgotPasswordForm";

const AuthForm = ({ setModalOpen, setNotification, setSnackbarOpen }) => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const { check } = useUserStore();
	const [getPassActive, setGetPassActive] = useState(false)

	const handleAuth = async () => {
		try {
			const data = await authUserAPI({ email, password: pass });
			if (data.token) {
				localStorage.setItem('token', data.token);
				setNotification('Успешно вошли в систему!');
				setSnackbarOpen(true);
				setModalOpen(false)
				await check();
			}
		} catch (err) {
			setNotification(err.response?.data?.error || 'Ошибка авторизации');
			setSnackbarOpen(true);
		}
	};

	return (
		<Box >
			<Box display={!getPassActive ? 'block' : 'none'} >
				<Typography component="div" sx={{
					fontSize: "24px",
					fontWeight: "700",
					fontStyle: "normal",
					textAlign: "center", mb: 2
				}}>

					Вход
				</Typography>
				<TextField
					fullWidth
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					sx={{ mb: 2 }}  disabled={getPassActive}
				/>
				<TextField
					disabled={getPassActive}
					fullWidth
					label="Пароль"
					type="password"
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<Button  disabled={getPassActive} fullWidth variant="contained" onClick={handleAuth} size="large">
					Войти
				</Button>
			</Box>


			<ForgotPasswordForm getPassActive={getPassActive} setGetPassActive={setGetPassActive} />
		</Box>
	);
};

export default AuthForm;
