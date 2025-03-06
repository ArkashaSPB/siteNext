'use client';

import React, { useEffect, useState } from 'react';
import useUserStore from '@/store/userStore';
import { Box, Button, TextField, Modal, Tab, Tabs, Typography, IconButton, Snackbar } from '@mui/material';
import { authUserAPI, regUserAPI } from '@/app/api/siteAPI';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import theme from "@/theme";
import RegisterForm from "@/component/user/RegisterForm";
import AuthForm from "@/component/user/AuthForm";

const UserBlock = () => {

	const id = useUserStore((state) => state.id);

	const {  mail, name, check, logout } = useUserStore();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const [modalOpen, setModalOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);
	const [notification, setNotification] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);


	useEffect(() => {
		check();
	}, []);

	const handleSnackbarClose = () => setSnackbarOpen(false);

	const handleAuth = async () => {
		try {
			const data = await authUserAPI({ email, password: pass });

			if (data.token) {
				localStorage.setItem('token', data.token);
				setNotification('Успешно вошли в систему!');
				setSnackbarOpen(true);
				await check(); // Дожидаемся обновления пользователя
				setModalOpen(false);
			}
		} catch (err) {
			setNotification(err.response?.data?.error || 'Ошибка авторизации');
			setSnackbarOpen(true);
		}
	};

	const handleRegister = () => {
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
		<div>
			{id ? (
				<>
				<Link href="/user" passHref>
					<IconButton  color="success" sx={{color: '#49B884'}}>
						<PersonIcon />
					</IconButton>
				</Link>
					<IconButton  onClick={logout} color="error">
						<LogoutIcon />
					</IconButton>
				</>
			) : (
				<>
					<Button
						variant="contained"
						onClick={() => setModalOpen(true)}
						sx={{
							display: {xs: 'none', md: 'block'}
						}}
					>
						<img  src="/imaga/people.svg" alt="ico" />
						<Typography component="span" sx={{
							ml: 1, color: 'white', fontSize: '16px', fontWeight: 'bold',
						}}>Войти</Typography>
					</Button>
					<IconButton
						onClick={() => setModalOpen(true)}
						sx={{
							display: {xs: 'block', md: 'none'}
						}}
					>
						<Box component="img" sx={{height: '20px'}}  src="/imaga/people.svg" alt="ico"  />
					</IconButton>
				</>

			)}

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 500,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}
				>
					<Tabs
						value={tabValue}
						onChange={(e, newValue) => setTabValue(newValue)}
						centered
						sx={{
							"& .MuiTabs-indicator": {
								display: "none", // Убираем подчеркивание
							},
							"& .MuiTab-root": {
								color: "white", // Цвет неактивного таба
								textTransform: "none", // Убираем все заглавные буквы
								fontSize: "24px", // Размер шрифта 24px
								fontWeight: "bolt", // Обычный вес шрифта
								fontStyle: "normal", // Убираем курсив
							},
							"& .Mui-selected": {
								color: theme.palette.primary.main,
							},
						}}
					>
						<Tab label="Авторизация" />
						<Tab label="Регистрация" />
					</Tabs>


					{tabValue === 0 && (
						<AuthForm setModalOpen={setModalOpen} setNotification={setNotification} setSnackbarOpen={setSnackbarOpen} />
					)}

					{tabValue === 1 && (
						<RegisterForm setModalOpen={setModalOpen}
													setNotification={setNotification} setSnackbarOpen={setSnackbarOpen}/>
					)}
				</Box>
			</Modal>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message={notification}
			/>
		</div>
	);
};

export default UserBlock;
