import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha, createTheme, ThemeProvider } from '@mui/material/styles';

const dashTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8ed5ff', contrastText: '#00354a' },
    background: { default: '#0b1326', paper: '#171f33' },
    text: { primary: '#dae2fd', secondary: '#bdc8d1', disabled: '#87929a' },
    divider: '#3e484f',
  },
  typography: { fontFamily: '"Inter", sans-serif' },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#131b2e', borderBottom: '1px solid #3e484f', boxShadow: 'none', backgroundImage: 'none' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#0b1326', borderRight: '1px solid #3e484f', backgroundImage: 'none' },
      },
    },
    MuiDivider: { styleOverrides: { root: { borderColor: '#3e484f' } } },
    MuiButton: {
      styleOverrides: {
        outlinedInherit: {
          borderColor: '#3e484f',
          color: '#bdc8d1',
          '&:hover': { borderColor: '#8ed5ff', color: '#8ed5ff', backgroundColor: 'rgba(142, 213, 255, 0.05)' },
        },
      },
    },
  },
});
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArticleIcon from '@mui/icons-material/Article';

const drawerWidth = 240;
const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find(({ to }) => to === pathname)?.title ?? "Welcome";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={dashTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* App Bar */}
      {/* <AppBar position="fixed" open={open}> */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={open ? handleDrawerClose : handleDrawerOpen}
            onClick={handleDrawerOpen}
            edge="start"
            // sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
            sx={{ marginRight: 5, ...open }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {pageTitle}
          </Typography>
          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Drawer List */}
        <List>
          {dashboardNavItems.map(({ label, to, icon: NavIcon }) => (
            <ListItem key={to} disablePadding sx={{ display: "block", px: 1 }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2,
                  borderRadius: '8px',
                  justifyContent: open ? 'initial' : 'center',
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(142, 213, 255, 0.1)',
                    color: '#8ed5ff',
                    '& .MuiListItemIcon-root': { color: '#8ed5ff' },
                    '&:hover': { bgcolor: 'rgba(142, 213, 255, 0.15)' },
                  },
                  '&:hover': { bgcolor: 'rgba(218, 226, 253, 0.05)', color: 'text.primary' },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  <NavIcon />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <DrawerHeader />
        {/* Content */}
        <Outlet />
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default DashLayout;