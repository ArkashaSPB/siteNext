'use client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Typography,
   Box,
} from '@mui/material';
import '@/app/globals.css';

import theme from '../theme';
import MenuL2 from "@/component/MenuL2";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
    <head>
      <link rel="icon" type="image/png" href="/favicon.svg" />
    </head>
    <body>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}
      >
        <Box sx={{flexGrow: 1}}>
          {/*<MenuL open={open} setOpen={setOpen}/>*/}
         <MenuL2/>
          <main>{children}</main>
        </Box>
        <Box
          sx ={{
            paddingY: 3
          }}
        >
          <Box component='footer' textAlign="center">
            <Typography  >
              smsretail2025@protonmail.com
            </Typography>
            <Typography variant="body2" sx={{ my: '1rem' }}>
              © 2025 AcSale. Все права защищены.
            </Typography>
            <Typography align="center" component="a" sx={{color: 'white', textDecoration: 'underline !important'}} href="/file.docx">Лицензионное соглашение</Typography>
          </Box>
        </Box>
      </Box>
      <div>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}
