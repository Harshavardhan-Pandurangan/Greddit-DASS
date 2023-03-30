import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Harshavardhan's Greddiit
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    let navigate = useNavigate();

    const [value, setValue] = React.useState(dayjs("2022-04-07"));

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get("password") !== data.get("confirmpassword")) {
            alert("Password and Confirm Password are not same");
            return;
        }

        const send_data = {
            firstname: data.get("firstname"),
            lastname: data.get("lastname"),
            username: data.get("username"),
            email: data.get("email"),
            password: data.get("password"),
            dob: value.format("YYYY-MM-DD"),
            contactnumber: data.get("contact"),
        };

        for (const [key, value] of Object.entries(send_data)) {
            if (value === "") {
                alert("Please fill all the fields");
                return;
            }
        }

        axios
            .post("/api/users/create", send_data)
            .then((res) => {
                alert("User Created Successfully");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data._id);
                navigate("/profile", { replace: true });
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <ThemeProvider theme={theme}>
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
                    <Typography
                        component="h1"
                        variant="h5"
                        style={{ color: "rgb(243, 114, 32)" }}
                    >
                        Harshavardhan's Greddiit
                    </Typography>
                    <br />
                    <br />
                    <Avatar sx={{ m: 1, bgcolor: "rgb(243, 114, 32)" }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid
                            container
                            spacing={2}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    id="firstname"
                                    label="First Name"
                                    name="firstname"
                                    placeholder="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    placeholder="Last Name"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    id="username"
                                    label="Username"
                                    name="username"
                                    placeholder="Username"
                                    align="center"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    name="contact"
                                    placeholder="Contact"
                                    label="Contact"
                                    type="contact"
                                    id="contact"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    placeholder="Email Address"
                                />
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    openTo="year"
                                    views={["year", "month", "day"]}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <Grid
                            container
                            spacing={2}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    name="password"
                                    placeholder="Password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    name="confirmpassword"
                                    placeholder="Confirm Password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmpassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Link href="/auth/signin" variant="body2">
                            {"Have an existing account? Sign In"}
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
