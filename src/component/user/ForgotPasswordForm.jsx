import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getPassAPI} from '@/app/api/siteAPI';

const ForgotPasswordForm = ({ setTab, setNotification, setSnackbarOpen, getPassActive, setGetPassActive }) => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState({success: false, message: '' });

	const handleForgotPassword = async () => {
		if(email){
			getPassAPI({ email }).then(data => {
				setMessage(data)
			});
		}
	};

	return (
		<Box sx={{mt: 2}}>
			<Button sx={{display: !getPassActive ? 'block' : 'none'}} onClick={()=>setGetPassActive(!getPassActive)}  component="a">Забыли пароль?</Button>
			<Box sx={{display: getPassActive ? 'block' : 'none'}}>
				<Button onClick={()=>setGetPassActive(!getPassActive)}  component="a">Назад</Button>
				<TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
				<Button fullWidth variant="contained" onClick={handleForgotPassword}>Восстановить</Button>
				{message.message !== '' && <Box sx={{color: message.success ? 'green' : 'red', p: 2, textAlign: 'center'}}>
					{message.message}
				</Box>}
			</Box>

		</Box>
	);
};

export default ForgotPasswordForm;
