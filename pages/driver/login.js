import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FetchApiClient from "../../fetch_api_clients/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import Head from "next/head";
import { route } from "../../helper/helper";
import { useToasts } from "react-toast-notifications";

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
        gocab.com.ng
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const api = new FetchApiClient("/driver");
  const { addToast } = useToasts();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    event.preventDefault();

    try {
      setLoading(true);
      const userData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      let { error, response } = await api.post("/login", userData);
      if (error) throw new Error(error);
      else {
        localStorage.setItem("userToken", JSON.stringify(response));
        addToast("Successfully logged in", { appearance: "success" });

        // toast.info("successful login");
        router.push(`${route}/driver/dashboard/information`);
      }
      setLoading(false);
    } catch (err) {
      addToast(err.message, { appearance: "error" });
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/images/icon.png" />
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <br />
            {loading ? (
              <LoadingButton
                loading
                variant="outlined"
                className="my-3 cursor-pointer"
              >
                {" "}
                Sign In
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="outlined"
                className="my-3 cursor-pointer"
              >
                Sign In
              </Button>
            )}
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/driver/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <ToastContainer position="bottom-center" />
      </Container>
    </ThemeProvider>
  );
}
