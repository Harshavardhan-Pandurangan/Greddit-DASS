import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Card, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ReportIcon from "@mui/icons-material/Report";
import { useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { Start } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 200;

export default function SubgreddiitReports(props) {
    let navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElDialog, setAnchorElDialog] = React.useState(null);
    const open = Boolean(anchorEl);
    const dialogOpen = Boolean(anchorElDialog);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDialogClick = (event) => {
        setAnchorElDialog(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDialogClose = () => {
        setAnchorElDialog(false);
    };

    let { subgreddiitId } = useParams();

    const [dialogType, setDialogType] = React.useState("logout");

    const [subgreddiit, setSubgreddiit] = React.useState({});

    useEffect(() => {
        if (!localStorage.token) {
            alert("Please login to continue");
        } else {
            let url = `/api/subgreddiits/get/${localStorage.id}`;
            let req_body = {
                id: subgreddiitId,
            };
            let headers = {
                headers: {
                    Authorization: `token ${localStorage.token}`,
                },
            };
            axios
                .post(url, req_body, headers)
                .then((res) => {
                    setSubgreddiit(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const [flag, setFlag] = React.useState(false);

    const [reports, setReports] = React.useState([]);
    const [updatedReports, setUpdatedReports] = React.useState([]);

    const [pending, setPending] = React.useState([]);
    const [expired, setExpired] = React.useState([]);
    const [ignored, setIgnored] = React.useState([]);
    const [deleted, setDeleted] = React.useState([]);
    const [blocked, setBlocked] = React.useState([]);

    useEffect(() => {
        if (!localStorage.token) {
            alert("Please login to continue");
        } else {
            let url = `/api/reports/getreports/${localStorage.id}`;
            let headers = {
                headers: {
                    Authorization: `token ${localStorage.token}`,
                },
            };

            axios
                .get(url, headers)
                .then((res) => {
                    setReports(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [flag]);

    useEffect(() => {
        let url = `/api/posts/get/${localStorage.id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        let temp = reports;
        for (let i = 0; i < temp.length; i++) {
            axios
                .post(url, { id: temp[i].postid }, headers)
                .then((res) => {
                    temp[i].post = res.data;
                    setUpdatedReports((prev) => [...prev, temp[i]]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [reports]);

    useEffect(() => {
        let pend = updatedReports.filter((report) => {
            return report.status === "Pending";
        });
        let pend2 = [];
        pend.forEach((report) => {
            for (let i = 0; i < pend2.length; i++) {
                if (pend2[i]._id === report._id) {
                    return;
                }
            }
            pend2.push(report);
        });
        setPending(pend2);

        let exp = updatedReports.filter((report) => {
            return report.status === "Expired";
        });
        let exp2 = [];
        exp.forEach((report) => {
            for (let i = 0; i < exp2.length; i++) {
                if (exp2[i]._id === report._id) {
                    return;
                }
            }
            exp2.push(report);
        });
        setExpired(exp2);

        let ign = updatedReports.filter((report) => {
            return report.status === "Ignored";
        });
        let ign2 = [];
        ign.forEach((report) => {
            for (let i = 0; i < ign2.length; i++) {
                if (ign2[i]._id === report._id) {
                    return;
                }
            }
            ign2.push(report);
        });
        setIgnored(ign2);

        let del = updatedReports.filter((report) => {
            return report.status === "Deleted";
        });
        let del2 = [];
        del.forEach((report) => {
            for (let i = 0; i < del2.length; i++) {
                if (del2[i]._id === report._id) {
                    return;
                }
            }
            del2.push(report);
        });
        setDeleted(del2);

        let blo = updatedReports.filter((report) => {
            return report.status === "Blocked";
        });
        let blo2 = [];
        blo.forEach((report) => {
            for (let i = 0; i < blo2.length; i++) {
                if (blo2[i]._id === report._id) {
                    return;
                }
            }
            blo2.push(report);
        });
        setBlocked(blo2);
    }, [updatedReports]);

    let date;
    const dateSetter = (createdon) => {
        date = new Date(createdon).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return date;
    };

    const [anchorElReport, setAnchorElReport] = React.useState(false);
    const openReport = Boolean(anchorElReport);

    const [Post, setPost] = React.useState("");
    const [Report, setReport] = React.useState("");
    const [reported, setReported] = React.useState("");
    const [reporter, setReporter] = React.useState("");
    const [change, setChange] = React.useState(0);

    const handleClickReport = (event) => {
        setAnchorElReport(true);
    };

    const handleCloseReport = () => {
        setAnchorElReport(false);
    };

    useEffect(() => {
        let url = `/api/users/getnames/${localStorage.id}`;
        let req_body = {
            ids: [Post.postedby, Report.reportedby],
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .post(url, req_body, headers)
            .then((res) => {
                setReported(res.data[0].name);
                setReporter(res.data[1].name);
                setFlag(!true);
                handleClickReport();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [Post, Report, change]);

    const [command, setCommand] = React.useState("");

    const handleBlock = () => {
        let url = `/api/subgreddiits/update/${localStorage.id}`;
        let req_body = {
            id: Post.subgreddit,
            type: "banned",
            bannednormie: Post.postedby,
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .put(url, req_body, headers)
            .then((res) => {
                setFlag(!true);
                handleCloseReport();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = () => {
        let url = `/api/posts/delete/${localStorage.id}`;
        let req_body = {
            id: Post._id,
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .delete(url, req_body, headers)
            .then((res) => {
                setFlag(!true);
                handleCloseReport();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleIgnore = () => {
        let url = `/api/reports/update/${localStorage.id}`;
        let req_body = {
            id: Report._id,
            status: "Ignored",
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .put(url, req_body, headers)
            .then((res) => {
                setFlag(!true);
                handleCloseReport();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(
                                `/subgreddiits/myg/${localStorage.id}/${subgreddiitId}/users`
                            );
                        }}
                    >
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(
                                `/subgreddiits/myg/${localStorage.id}/${subgreddiitId}/requests`
                            );
                        }}
                    >
                        <ListItemIcon>
                            <GroupAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Requests" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(
                                `/subgreddiits/myg/${localStorage.id}/${subgreddiitId}/stats`
                            );
                        }}
                    >
                        <ListItemIcon>
                            <QueryStatsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Stats" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(
                                `/subgreddiits/myg/${localStorage.id}/${subgreddiitId}/reports`
                            );
                        }}
                    >
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate("/subgreddiits");
                        }}
                    >
                        <ListItemIcon>
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subgreddiits" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(`/subgreddiits/my/${localStorage.id}`);
                        }}
                    >
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Subgreddiits" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(`/users/find/${localStorage.id}`);
                        }}
                    >
                        <ListItemIcon>
                            <PersonSearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Find Users" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(`/saved/${localStorage.id}`);
                        }}
                    >
                        <ListItemIcon>
                            <CollectionsBookmarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Saved Posts" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                alt="Display Picture"
                                sx={{ width: 30, height: 30 }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleDialogClick}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/auth/signin");
        }
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100)` },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                style={{ backgroundColor: "rgb(243, 114, 32)" }}
            >
                <Toolbar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Grid
                            item
                            direction="row"
                            justifyContent="space-around"
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                style={{ paddingTop: "0.3rem" }}
                            >
                                Harshavardhan's Greddiit
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            direction="row"
                            justifyContent="space-around"
                        >
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar
                                        alt="Display Picture"
                                        sx={{ width: 30, height: 30 }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform:
                                                "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                }}
                            >
                                <MenuItem onClick={() => navigate("/profile")}>
                                    <Avatar /> My Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        setDialogType("logout");
                                        handleDialogClick();
                                    }}
                                >
                                    <ListItemIcon>
                                        <SwitchAccountIcon fontSize="small" />
                                    </ListItemIcon>
                                    Switch Account
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setDialogType("create");
                                        handleDialogClick();
                                    }}
                                >
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Create new account
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        navigate("/auth/signin");
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Grid>
                        <Dialog
                            open={dialogOpen}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleDialogClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Logout to Continue?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Proceeding further will log you out of your
                                    account. Are you sure you want to continue?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (dialogType === "logout") {
                                            navigate("/auth/signin");
                                        } else {
                                            navigate("/auth/signup");
                                        }
                                    }}
                                >
                                    Continue
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 0, opacity: 0.6 }}
                        >
                            SubGreddiit
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            {"g/" + subgreddiit.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mt: 4 }}>
                    <Grid item>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            Pending
                        </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        {pending.map((pend) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={pend._id}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 110, 30, 0.6)",
                                        }}
                                        key={pend._id}
                                        onClick={() => {
                                            setPost(pend.post);
                                            setReport(pend);
                                            setChange(change + 1);
                                        }}
                                    >
                                        <CardContent key={pend._id}>
                                            <Typography
                                                variant="body"
                                                sx={{
                                                    mb: 1.5,
                                                    minHeight: "1.8em",
                                                    maxHeight: "1.8em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Post</strong> :{" "}
                                                {pend.post.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    minHeight: "3.6em",
                                                    maxHeight: "3.6em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Concern</strong> :{" "}
                                                {pend.context}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Divider sx={{ mb: 2, mt: 2 }} />
                <Box sx={{ mt: 4 }}>
                    <Grid item>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            Expired
                        </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        {expired.map((pend) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={pend._id}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 110, 30, 0.6)",
                                        }}
                                        key={pend._id}
                                        onClick={() => {
                                            setPost(pend.post);
                                            setReport(pend);
                                            setChange(change + 1);
                                        }}
                                    >
                                        <CardContent key={pend._id}>
                                            <Typography
                                                variant="body"
                                                sx={{
                                                    mb: 1.5,
                                                    minHeight: "1.8em",
                                                    maxHeight: "1.8em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Post</strong> :{" "}
                                                {pend.post.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    minHeight: "3.6em",
                                                    maxHeight: "3.6em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Concern</strong> :{" "}
                                                {pend.context}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Divider sx={{ mb: 2, mt: 2 }} />
                <Box sx={{ mt: 4 }}>
                    <Grid item>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            Ignored
                        </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        {ignored.map((pend) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={pend._id}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 110, 30, 0.6)",
                                        }}
                                        key={pend._id}
                                        onClick={() => {
                                            setPost(pend.post);
                                            setReport(pend);
                                            setChange(change + 1);
                                        }}
                                    >
                                        <CardContent key={pend._id}>
                                            <Typography
                                                variant="body"
                                                sx={{
                                                    mb: 1.5,
                                                    minHeight: "1.8em",
                                                    maxHeight: "1.8em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Post</strong> :{" "}
                                                {pend.post.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    minHeight: "3.6em",
                                                    maxHeight: "3.6em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Concern</strong> :{" "}
                                                {pend.context}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Divider sx={{ mb: 2, mt: 2 }} />
                <Box sx={{ mt: 4 }}>
                    <Grid item>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            Deleted
                        </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        {deleted.map((pend) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={pend._id}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 110, 30, 0.6)",
                                        }}
                                        key={pend._id}
                                        onClick={() => {
                                            setPost(pend.post);
                                            setReport(pend);
                                            setChange(change + 1);
                                        }}
                                    >
                                        <CardContent key={pend._id}>
                                            <Typography
                                                variant="body"
                                                sx={{
                                                    mb: 1.5,
                                                    minHeight: "1.8em",
                                                    maxHeight: "1.8em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Post</strong> :{" "}
                                                {pend.post.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    minHeight: "3.6em",
                                                    maxHeight: "3.6em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Concern</strong> :{" "}
                                                {pend.context}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Divider sx={{ mb: 2, mt: 2 }} />
                <Box sx={{ mt: 4 }}>
                    <Grid item>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            Blocked
                        </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        {blocked.map((pend) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={pend._id}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 110, 30, 0.6)",
                                        }}
                                        key={pend._id}
                                        onClick={() => {
                                            setPost(pend.post);
                                            setReport(pend);
                                            setChange(change + 1);
                                        }}
                                    >
                                        <CardContent key={pend._id}>
                                            <Typography
                                                variant="body"
                                                sx={{
                                                    mb: 1.5,
                                                    minHeight: "1.8em",
                                                    maxHeight: "1.8em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Post</strong> :{" "}
                                                {pend.post.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    minHeight: "3.6em",
                                                    maxHeight: "3.6em",
                                                    lineHeight: "1.8em",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <strong>Concern</strong> :{" "}
                                                {pend.context}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Divider sx={{ mb: 2, mt: 2 }} />
                <Dialog
                    open={openReport}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseReport}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {Post.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Typography
                                variant="body"
                                sx={{
                                    mb: 1.5,
                                    display: "flex",
                                    justifyContent: "justify",
                                    opacity: 0.8,
                                }}
                            >
                                Posted by n/{reported}, on{" "}
                                {dateSetter(Post.date)}
                            </Typography>
                            <Typography
                                variant="body"
                                sx={{
                                    mb: 1.5,
                                    display: "flex",
                                    justifyContent: "justify",
                                }}
                            >
                                {Post.text}
                            </Typography>
                            <Divider sx={{ mb: 2, mt: 2 }} />
                            <Typography
                                variant="body"
                                sx={{
                                    mb: 1.5,
                                    display: "flex",
                                    justifyContent: "justify",
                                }}
                            >
                                <strong>Reported by</strong> : {reporter}
                            </Typography>
                            <Typography
                                variant="body"
                                sx={{
                                    mb: 1.5,
                                    display: "flex",
                                    justifyContent: "justify",
                                }}
                            >
                                <strong>Reported on</strong> :{" "}
                                {dateSetter(Report.date)}
                            </Typography>
                            <Typography
                                variant="body"
                                sx={{
                                    mb: 1.5,
                                    display: "flex",
                                    justifyContent: "justify",
                                }}
                            >
                                <strong>Concern</strong> : {Report.context}
                            </Typography>
                            <Divider sx={{ mb: 2, mt: 2 }} />
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display:
                                        Report.status === "Pending"
                                            ? "flex"
                                            : "none",

                                    justifyContent: "end",
                                }}
                            >
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#ff6e1e",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "#ff6e1e",
                                            },
                                        }}
                                        onClick={() => {
                                            handleBlock();
                                            handleCloseReport();
                                        }}
                                    >
                                        Block User
                                    </Button>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#ff6e1e",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "#ff6e1e",
                                            },
                                        }}
                                        onClick={() => {
                                            handleDelete();
                                            handleCloseReport();
                                        }}
                                    >
                                        Delete Post
                                    </Button>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#ff6e1e",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "#ff6e1e",
                                            },
                                        }}
                                        onClick={() => {
                                            handleIgnore();
                                            handleCloseReport();
                                        }}
                                    >
                                        Ignore Report
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    );
}
