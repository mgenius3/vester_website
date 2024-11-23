import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainListItems from "../listItems";
import Head from "next/head";
import FetchApiClient from "../../../../fetch_api_clients/api";

import AllDriversInformation from "./info";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

// import React from "react";
import { Grid, Card, CardContent, CardActionArea } from "@mui/material";
import { Avatar, Chip } from "@mui/material";
import { DirectionsBike } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { ArrowBack } from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://vester.com.ng">
        vester.com.ng
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const [stats, setStats] = React.useState([]);
  const [singleStatsData, setSingleStatsData] = React.useState(null);

  const [token] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken");
    }
  });

  const api = new FetchApiClient("/admin", token);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const fetchStats = async () => {
    try {
      let { error, response } = await api.get("/all_stats");
      console.log(response);
      if (error) throw new Error(error);
      else setStats(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCardClick = (uid) => {
    let data = stats.find((item) => item.uid === uid);
    setSingleStatsData(data);
    // router.push(`/admin/dashboard/stats/${uid}`); // Navigate to the detail page
  };

  React.useEffect(() => {
    try {
      let decoded = jwtDecode(token);
      setUser(decoded);
      fetchStats();
    } catch (err) {
      console.log(err);
      router.push("/admin/login");
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Vester</title>
        <link rel="icon" href="/images/icon.png" />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {user?.name} - Admin Dashboard (Stats)
              </Typography>
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems />
              <Divider sx={{ my: 1 }} />
              {/* {secondaryListItems} */}
            </List>
          </Drawer>
          {!singleStatsData ? (
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Box
                sx={{
                  padding: 4,
                  background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
                  minHeight: "100vh",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: 3,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#1976d2",
                  }}
                >
                  Transit List
                </Typography>

                <Grid container spacing={3}>
                  {stats.map((transit) => (
                    <Grid item xs={12} sm={6} md={4} key={transit.uid}>
                      <Card
                        sx={{
                          boxShadow: 4,
                          borderRadius: 2,
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleCardClick(transit.uid)}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 2,
                              }}
                            >
                              <DirectionsBike
                                sx={{ color: "#1976d2", marginRight: 1 }}
                              />
                              <Typography variant="h6">
                                {transit.car_details}
                              </Typography>
                            </Box>
                            <Typography variant="body2">
                              <strong>Driver:</strong> {transit.driverName}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Fare:</strong> ₦{transit.fareAmount}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Status:</strong>{" "}
                              {transit.status.toUpperCase()}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {/* <AllDriversInformation />  */}
            </Box>
          ) : (
            <>
             
            <Box
              sx={{
                padding: 4,
                background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
                minHeight: "100vh",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 3,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#1976d2",
                }}
              >
                Transit Details
              </Typography>

              <Card
                sx={{
                  maxWidth: 900,
                  margin: "auto",
                  boxShadow: 4,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DirectionsCarIcon sx={{ fontSize: 40, marginRight: 1 }} />
                  <Typography variant="h5">{singleStatsData.car_details}</Typography>
                </Box>
                <CardContent sx={{ padding: 3 }}>
                  <Grid container spacing={3}>
                    {/* Driver Details */}
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Avatar
                          sx={{ backgroundColor: "#1976d2", marginRight: 2 }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Typography variant="h6">Driver Details</Typography>
                      </Box>
                      <Typography>Name: {singleStatsData.driverName}</Typography>
                      <Typography>
                        <PhoneIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        {singleStatsData.driverPhone}
                      </Typography>
                    </Grid>

                    {/* User Details */}
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Avatar
                          sx={{ backgroundColor: "#43a047", marginRight: 2 }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Typography variant="h6">User Details</Typography>
                      </Box>
                      <Typography>Name: {singleStatsData.userName}</Typography>
                      <Typography>
                        <PhoneIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        {singleStatsData.userPhone}
                      </Typography>
                    </Grid>

                    <Divider sx={{ width: "100%", marginY: 2 }} />

                    {/* Origin and Destination */}
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Avatar
                          sx={{ backgroundColor: "#f57c00", marginRight: 2 }}
                        >
                          <LocationOnIcon />
                        </Avatar>
                        <Typography variant="h6">Origin</Typography>
                      </Box>
                      <Typography>
                        Address: {singleStatsData.originAddress}
                      </Typography>
                      <Typography>
                        Coordinates: {singleStatsData.origin.latitude},{" "}
                        {singleStatsData.origin.longitude}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Avatar
                          sx={{ backgroundColor: "#d32f2f", marginRight: 2 }}
                        >
                          <LocationOnIcon />
                        </Avatar>
                        <Typography variant="h6">Destination</Typography>
                      </Box>
                      <Typography>
                        Address: {singleStatsData.destinationAddress}
                      </Typography>
                      <Typography>
                        Coordinates: {singleStatsData.destination.latitude},{" "}
                        {singleStatsData.destination.longitude}
                      </Typography>
                    </Grid>

                    {/* Fare and Status */}
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Avatar
                          sx={{ backgroundColor: "#0288d1", marginRight: 2 }}
                        >
                          <LocalAtmIcon />
                        </Avatar>
                        <Typography variant="h6">Fare</Typography>
                      </Box>
                      <Typography>₦{singleStatsData.fareAmount}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Chip
                          label={singleStatsData.status.toUpperCase()}
                          color={
                            singleStatsData.status === "ended"
                              ? "success"
                              : "warning"
                          }
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>
                      <Typography>
                        <b>Time:</b>{" "}
                        {new Date(singleStatsData.time).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            </>

           
          )}
        </Box>
      </ThemeProvider>
    </>
  );
}
