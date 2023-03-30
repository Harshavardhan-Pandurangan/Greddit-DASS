import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function Edit() {
    let navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [dob, setDob] = useState(new Date());
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("password") == "") {
            alert("Enter current password to confirm changes");
            return;
        }

        let request_path = "/api/users/update/" + localStorage.getItem("id");
        let json_pass_data = {
            firstname: data.get("firstname"),
            lastname: data.get("lastname"),
            username: data.get("username"),
            contactnumber: data.get("contact"),
            email: data.get("email"),
            dob: dayjs(dob).format("YYYY-MM-DD"),
            password: data.get("password"),
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .put(request_path, json_pass_data, headers)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                alert("Profile Updated");
                navigate("/profile");
            })
            .catch((err) => {
                alert("Error in updating profile");
            });
    };

    useEffect(() => {
        let request_path = "/api/users/get/" + localStorage.getItem("id");
        let json_pass_data = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .get(request_path, json_pass_data)
            .then((res) => {
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setEmail(res.data.email);
                setUsername(res.data.username);
                setContact(res.data.contactnumber);
                setDob(res.data.dob);
            })
            .catch((err) => {});
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Button
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    style={{
                        backgroundColor: "rgb(243, 114, 32)",
                        color: "white",
                        borderRadius: "2rem",
                    }}
                    onClick={() => navigate("/profile")}
                >
                    <ArrowBackIcon />
                </Button>
                <Box
                    sx={{
                        marginTop: 1,
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
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Profile
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
                                    value={firstname}
                                    onChange={(e) =>
                                        setFirstname(e.target.value)
                                    }
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
                                    value={lastname}
                                    onChange={(e) =>
                                        setLastname(e.target.value)
                                    }
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
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                                    value={contact}
                                    onChange={(e) => {
                                        let int_value = parseInt(
                                            e.target.value
                                        );
                                        if (int_value) {
                                            setContact(int_value);
                                        }
                                    }}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={dob}
                                    onChange={(newValue) => {
                                        setDob(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>

                        <Grid
                            container
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            spacing={2}
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
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
