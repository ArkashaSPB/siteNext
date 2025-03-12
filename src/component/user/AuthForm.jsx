import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { authUserAPI } from '@/component/api/siteAPI';
import useUserStore from '@/store/userStore';
import ForgotPasswordForm from "@/component/user/ForgotPasswordForm";
import {useLang} from "@/context/LangContext";

const AuthForm = ({ setModalOpen, setNotification, setSnackbarOpen }) => {

	const { translations } = useLang();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const { check } = useUserStore();
	const [getPassActive, setGetPassActive] = useState(false)

	const handleAuth = async () => {
		try {
			const data = await authUserAPI({ email, password: pass });
			if (data.token) {
				localStorage.setItem('token', data.token);
				setNotification(translations.authInfo1);
				setSnackbarOpen(true);
				setModalOpen(false)
				await check();
			}
		} catch (err) {
			setNotification(err.response?.data?.error || translations.authInfo2);
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

					{translations.authVhod}
				</Typography>
				<TextField
					fullWidth
					label={translations.authFormEmail}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					sx={{ mb: 2 }}  disabled={getPassActive}
				/>
				<TextField
					disabled={getPassActive}
					fullWidth
					label={translations.authFormPass}
					type="password"
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<Button  disabled={getPassActive || email === '' || pass === ''} fullWidth variant="contained" onClick={handleAuth} size="large"
				>
					{translations.authButton1}
				</Button>
			</Box>


			<ForgotPasswordForm getPassActive={getPassActive} setGetPassActive={setGetPassActive} />
		</Box>
	);
};

export default AuthForm;
