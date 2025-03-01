'use client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Typography,
   Box,
} from '@mui/material';
import '@/app/globals.css';

import theme from '../theme';
import Cart from "@/component/Cart";
import MenuL2 from "@/component/MenuL2";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
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

          <footer>
            <Typography  align="center">
              Silencewin@yandex.ru
            </Typography>
            <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
              © 2025 AcSale. Все права защищены.
            </Typography>
          </footer>
        </Box>
      </Box>
      <div>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}
