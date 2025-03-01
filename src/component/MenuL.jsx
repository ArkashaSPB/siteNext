import React, {useState} from 'react';
import {
	AppBar,
	Box,
	Button, Collapse,
	Drawer,
	IconButton,
	List,
	ListItem, ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography
} from "@mui/material";
import Link from "next/link";
import {menu} from "@/util/data";
import UserBlock from "@/component/UserBlock";
import MenuIcon from "@mui/icons-material/Menu";
import {ChevronRight, ExpandMore} from "@mui/icons-material";

const MenuL = ({open, setOpen}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleClick = (index) => {
		setOpen((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};

	return (
		<>
			<AppBar position="static" color="primary">
				<Toolbar>
					{/* Логотип */}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, cursor: 'pointer' }}
					>
						<Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
							Логотип
						</Link>
					</Typography>


					{/* Кнопки меню (для десктопа) */}
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'flex',
							},
							alignItems: 'center',
							flexGrow: 1,
							justifyContent: 'flex-end',
						}}
					>
						{menu.map((item, index) =>
							item.children ? (
								<div key={index}>
									<Button
										color="inherit"
										onClick={handleMenuOpen}
										aria-controls="services-menu"
										aria-haspopup="true"
									>
										{item.name}
									</Button>
									<Menu
										id="services-menu"
										anchorEl={anchorEl}
										open={Boolean(anchorEl)}
										onClose={handleMenuClose}
										MenuListProps={{
											'aria-labelledby': 'services-menu-button',
										}}

									>
										{item.children.map((subItem, subIndex) => (
											<Link href={subItem.url} key={subIndex} passHref>
												<MenuItem onClick={handleMenuClose}>{subItem.name}</MenuItem>
											</Link>
										))}
									</Menu>
								</div>
							) : (
								<Link  href={item.url} key={index} passHref>
									<Button color="secondary" variant="text">{item.name}</Button>
								</Link>


							)

						)}

						<UserBlock/>
					</Box>

					{/* Иконка меню для мобильной версии */}
					<IconButton
						color="inherit"
						aria-label="menu"
						edge="end"
						onClick={handleDrawerToggle}
						sx={{ display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Drawer для мобильной версии */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					width: '250px',
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: '250px',
						boxSizing: 'border-box',
					},
					display: { xs: 'block', sm: 'none' },
				}}
			>
				<List>
					{menu.map((item, index) => (
						<div key={index}>
							<ListItem  onClick={() => handleClick(index)}>
								{item.children ? (
									<>
										<ListItemText primary={item.name} />
										<IconButton>
											{open[index] ? <ExpandMore /> : <ChevronRight />}
										</IconButton>
									</>
								) : (
									<Link href={item.url} passHref>
										<ListItemText primary={item.name} />
									</Link>
								)}
							</ListItem>

							<Collapse in={open[index]} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{item.children &&
										item.children.map((subItem, subIndex) => (
											<ListItem  key={subIndex} sx={{ paddingLeft: '20px' }} onClick={handleDrawerToggle}>
												<Link href={subItem.url} passHref>
													<ListItemText primary={subItem.name} />
												</Link>
											</ListItem>
										))}
								</List>
							</Collapse>
						</div>
					))}
				</List>
				<UserBlock/>

			</Drawer>
		</>
	);
};

export default MenuL;