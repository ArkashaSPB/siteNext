"use client";
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
import { useLang } from "@/context/LangContext";
import {useParams} from "next/navigation"; // Импортируем контекст языка

const UserBlock = () => {
	const id = useUserStore((state) => state.id);
	const { mail, name, check, logout } = useUserStore();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);
	const [notification, setNotification] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	// Получаем переводы из контекста
	const { translations } = useLang();

	if (!translations || Object.keys(translations).length === 0) {
		// Пока перевод не загружен, можно вернуть null или загрузочный индикатор
		return null;
	}
	useEffect(() => {
		check();
	}, []);

	const handleSnackbarClose = () => setSnackbarOpen(false);
	const { locale } = useParams();
	return (
		<div>
			{id ? (
				<>
					<Link href={`/${locale}/user`} passHref>
						<IconButton color="success" sx={{ color: '#49B884' }}>
							<PersonIcon />
						</IconButton>
					</Link>
					<IconButton onClick={logout} color="error">
						<LogoutIcon />
					</IconButton>
				</>
			) : (
				<>
					<Button
						variant="contained"
						onClick={() => setModalOpen(true)}
						sx={{
							display: { xs: 'none', md: 'block' }
						}}
					>
						<img src="/imaga/people.svg" alt="ico" />
						<Typography component="span" sx={{
							ml: 1, color: 'white', fontSize: '16px', fontWeight: 'bold',
						}}>
							{translations.vhod}
						</Typography>
					</Button>
					<IconButton
						onClick={() => setModalOpen(true)}
						sx={{
							display: { xs: 'block', md: 'none' }
						}}
					>
						<Box component="img" sx={{ height: '20px' }} src="/imaga/people.svg" alt="ico" />
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
								display: "none",
							},
							"& .MuiTab-root": {
								color: "white",
								textTransform: "none",
								fontSize: "24px",
								fontWeight: "bolt",
								fontStyle: "normal",
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
													setNotification={setNotification} setSnackbarOpen={setSnackbarOpen} />
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
