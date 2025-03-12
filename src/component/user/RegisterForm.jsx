import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { regUserAPI } from '@/component/api/siteAPI';
import useUserStore from "@/store/userStore";
import {useLang} from "@/context/LangContext";

const RegisterForm = ({ setNotification, setSnackbarOpen, setModalOpen }) => {

	const { translations } = useLang();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const { check } = useUserStore();

	const handleRegister = async () => {
		regUserAPI({ email, password: pass, lang:translations.lang })
			.then(data => {

				if (data.token) {
					localStorage.setItem('token', data.token);
					setNotification(translations.authInfo1);
					setSnackbarOpen(true);
					check();
					setModalOpen(false)
				}

			})
			.catch((err) => {
				setNotification(err.response?.data?.error || translations.authInfo2);
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
				{translations.authReg}
			</Typography>

			<TextField
				variant="filled"
				fullWidth
				label={translations.authFormEmail}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<TextField
				variant="filled"
				fullWidth
				label={translations.authFormPass}
				type="password"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<Button fullWidth variant="contained" onClick={handleRegister} size="large" disabled={email === '' || pass === ''}>
				{translations.authButton2}
			</Button>
		</Box>
	);
};

export default RegisterForm;
