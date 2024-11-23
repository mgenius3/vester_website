import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useRouter } from "next/router";

const TransitInfo = ({ transitsData }) => {
  //   const transitData = {
  //     uid: "-OC6p3oZIny3PqISpK97",
  //     car_details: "2024 Range Rover MC36536 (Blue)",
  //     destination: {
  //       latitude: "5.021853200000001",
  //       longitude: "7.9229264",
  //     },
  //     destinationAddress: "Aka Rd, Uyo 520102, Akwa Ibom, Nigeria",
  //     driverId: "0f2eZrBYcKQpJYJTg8qzkf8IngG3",
  //     driverLocation: {
  //       latitude: "5.0267261",
  //       longitude: "7.9307222",
  //     },
  //     driverName: "Moses Benjamin",
  //     driverPhone: "08134460259",
  //     fareAmount: "160.0",
  //     origin: {
  //       latitude: "5.026760801058617",
  //       longitude: "7.930718399584293",
  //     },
  //     originAddress: "2WGJ+Q89, Udotung Ubo St, Uyo 520102, Akwa Ibom, Nigeria",
  //     status: "ended",
  //     time: "2024-11-20 05:28:36.008414",
  //     userName: "Moses Benjamin",
  //     userPhone: "+2348134468259",

  const router = useRouter();
  const { uid } = router.query; // Get UID from URL
  const [transitData, setTransitData] = [] || null;
  const [token] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken");
    }
  });

  


  const fetchStats = async () => {
    try {
      let { error, response } = await api.get("/all_stats");
      console.log(response);
      if (error) throw new Error(error);
      else {
        setTransitData(() => response.find((item) => item.uid === uid));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    try {
      // let decoded = jwtDecode(token);
      // setUser(decoded);
      fetchStats();
    } catch (err) {
      // router.push("/admin/login");
    }
  }, []);

  if (!transitData) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: 4 }}>
        Loading ...
      </Typography>
    );
  }

  if (transitData == []) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: 4 }}>
        No Data Available
      </Typography>
    );
  }

  return (
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
          <Typography variant="h5">2024 Range Rover MC36536</Typography>
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
                <Avatar sx={{ backgroundColor: "#1976d2", marginRight: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6">Driver Details</Typography>
              </Box>
              <Typography>Name: {transitData.driverName}</Typography>
              <Typography>
                <PhoneIcon sx={{ fontSize: 16, marginRight: 1 }} />
                {transitData.driverPhone}
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
                <Avatar sx={{ backgroundColor: "#43a047", marginRight: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6">User Details</Typography>
              </Box>
              <Typography>Name: {transitData.userName}</Typography>
              <Typography>
                <PhoneIcon sx={{ fontSize: 16, marginRight: 1 }} />
                {transitData.userPhone}
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
                <Avatar sx={{ backgroundColor: "#f57c00", marginRight: 2 }}>
                  <LocationOnIcon />
                </Avatar>
                <Typography variant="h6">Origin</Typography>
              </Box>
              <Typography>Address: {transitData.originAddress}</Typography>
              <Typography>
                Coordinates: {transitData.origin.latitude},{" "}
                {transitData.origin.longitude}
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
                <Avatar sx={{ backgroundColor: "#d32f2f", marginRight: 2 }}>
                  <LocationOnIcon />
                </Avatar>
                <Typography variant="h6">Destination</Typography>
              </Box>
              <Typography>Address: {transitData.destinationAddress}</Typography>
              <Typography>
                Coordinates: {transitData.destination.latitude},{" "}
                {transitData.destination.longitude}
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
                <Avatar sx={{ backgroundColor: "#0288d1", marginRight: 2 }}>
                  <LocalAtmIcon />
                </Avatar>
                <Typography variant="h6">Fare</Typography>
              </Box>
              <Typography>₦{transitData.fareAmount}</Typography>
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
                  label={transitData.status.toUpperCase()}
                  color={transitData.status === "ended" ? "success" : "warning"}
                  sx={{ fontWeight: "bold" }}
                />
              </Box>
              <Typography>
                <b>Time:</b> {new Date(transitData.time).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransitInfo;
