import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getPassAPI} from '@/component/api/siteAPI';
import {useLang} from "@/context/LangContext";

const ForgotPasswordForm = ({  getPassActive, setGetPassActive }) => {


	const { translations } = useLang();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState({success: false, message: '' });

	const handleForgotPassword = async () => {
		if(email){
			getPassAPI({ email, lang:translations.lang }).then(data => {
				setMessage(data)
			});
		}
	};

	return (
		<Box sx={{mt: 2}}>
			<Button sx={{display: !getPassActive ? 'block' : 'none'}} onClick={()=>setGetPassActive(!getPassActive)}  component="a">{translations.authButton5}</Button>
			<Box sx={{display: getPassActive ? 'block' : 'none'}}>
				<Button onClick={()=>setGetPassActive(!getPassActive)}  component="a">{translations.authButton3}</Button>
				<TextField fullWidth label={translations.authFormEmail} value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />

				<Button disabled={email === ''} fullWidth variant="contained" onClick={handleForgotPassword}>{translations.authButton4}</Button>

				{message.message !== '' && <Box sx={{color: message.success ? 'green' : 'red', p: 2, textAlign: 'center'}}>
					{message.message}
				</Box>}
			</Box>

		</Box>
	);
};

export default ForgotPasswordForm;
