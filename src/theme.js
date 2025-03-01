import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#49B884",
		},
		error: {
			main: "#e75555",
		},
		info: {
			main: "#2d805d",
		},
		secondary: {
			main: "#fff",
		},
		background: {
			default: "#000",
			paper: "#1e1e1e",
		},
		text: {
			primary: "#ffffff",
			secondary: "#aaaaaa",
		},
	},

	typography: {
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700, // Базовый вес шрифта
	},

	components: {
		MuiCssBaseline: {
			styleOverrides: `
    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Thin.ttf') format('truetype');
      font-weight: 100;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-ThinItalic.ttf') format('truetype');
      font-weight: 100;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-ExtraLight.ttf') format('truetype');
      font-weight: 200;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-ExtraLightItalic.ttf') format('truetype');
      font-weight: 200;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Light.ttf') format('truetype');
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-LightItalic.ttf') format('truetype');
      font-weight: 300;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Regular.ttf') format('truetype');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Italic.ttf') format('truetype');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Medium.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-MediumItalic.ttf') format('truetype');
      font-weight: 500;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-SemiBold.ttf') format('truetype');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-SemiBoldItalic.ttf') format('truetype');
      font-weight: 600;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Bold.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-BoldItalic.ttf') format('truetype');
      font-weight: 700;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-ExtraBold.ttf') format('truetype');
      font-weight: 800;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-ExtraBoldItalic.ttf') format('truetype');
      font-weight: 800;
      font-style: italic;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-Black.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
    }

    @font-face {
      font-family: 'Montserrat';
      src: url('/font/Montserrat-BlackItalic.ttf') format('truetype');
      font-weight: 900;
      font-style: italic;
    }

    * {
      font-family: 'Montserrat', sans-serif;
    }

    a {
      text-decoration: none !important;
    }
  `,
		},


		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "12px",
					textTransform: "none",
					fontWeight: 700, // Делаем текст жирным (можно 700)
				},
				label: {
					fontWeight: 700, // Применяем жирность к тексту внутри кнопки
				},
				containedPrimary: {
					color: "#fff",
					backgroundColor: "#49B884",
					"&:hover": {
						backgroundColor: "#3A9C6D",
					},
				},
				containedSecondary: {
					color: "#000",
					backgroundColor: "#fff",
					"&:hover": {
						backgroundColor: "#ddd",
					},
				},
			},
		},


		// ✅ Настраиваем `TextField` и `FilledInput`
		MuiTextField: {
			defaultProps: {
				variant: "filled", // По умолчанию все `TextField` будут `filled`
			},
		},

		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent", // Фон прозрачный
					borderRadius: "10px", // Закругление границ
					border: "1px solid white", // Белая рамка
					color: "white", // Цвет текста
					transition: "all 0.3s ease", // Плавная анимация

					"&:hover": {
						borderColor: "#49B884", // Изменение рамки при наведении
					},

					"&.Mui-focused": {
						borderColor: "#49B884", // Цвет рамки при фокусе
					},
				},

				// ✅ Стили для текста внутри input
				input: {
					padding: "20px", // Отступы внутри инпута
				},

				// ✅ Убираем нижнюю линию
				underline: {
					"&:before": {
						display: "none",
					},
					"&:after": {
						display: "none",
					},
				},
			},
		},

	},
});

export default theme;
