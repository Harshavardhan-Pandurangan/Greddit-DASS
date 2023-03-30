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
import { Grid, TextField } from "@mui/material";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Chip from "@mui/material/Chip";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 200;

export default function MySubgreddiits(props) {
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

    const [anchorElCreate, setAnchorElCreate] = React.useState(null);
    const openCreate = Boolean(anchorElCreate);
    const handleCreateSubgreddiitClick = (event) => {
        setAnchorElCreate(true);
    };
    const handleCreateSubgreddiitClose = () => {
        setAnchorElCreate(false);
    };

    const createSubGreddiit = () => {
        console.log("create subgreddiit");

        if (
            document.getElementById("subgreddiit-name").value == "" ||
            document.getElementById("subgreddiit-description").value == ""
        ) {
            return;
        }

        const tags = document
            .getElementById("subgreddiit-tags")
            .value.split(/,| /)
            .filter((tag) => tag != "");

        for (let i = 0; i < tags.length; i++) {
            tags[i] = tags[i].toLowerCase();
        }

        const banned = document
            .getElementById("subgreddiit-banned")
            .value.split(/,| /)
            .filter((tag) => tag != "");

        const send_data = {
            name: document.getElementById("subgreddiit-name").value,
            description: document.getElementById("subgreddiit-description")
                .value,
            tags: tags,
            banned: banned,
            createdon: new Date(),
        };

        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .post(
                `/api/subgreddiits/create/${localStorage.id}`,
                send_data,
                headers
            )
            .then((res) => {
                alert("Subgreddiit created successfully!");
                document.getElementById("subgreddiit-name").value = "";
                document.getElementById("subgreddiit-description").value = "";
                document.getElementById("subgreddiit-tags").value = "";
                document.getElementById("subgreddiit-banned").value = "";
                handleCreateSubgreddiitClose();
                setFlag(!flag);
            })
            .catch((err) => {
                alert(err.response.data.error);
                console.log(err.response.data.error);
            });
    };

    const [dialogType, setDialogType] = React.useState("logout");
    const [anchorElDelete, setAnchorElDelete] = React.useState(false);
    const openDelete = Boolean(anchorElDelete);
    const handleDeleteClose = () => {
        setAnchorElDelete(false);
    };

    const [mySubgreddiits, setMySubgreddiits] = React.useState([]);
    const [flag, setFlag] = React.useState(false);

    useEffect(() => {
        axios
            .get("/api/subgreddiits/getall")
            .then((res) => {
                setMySubgreddiits(
                    res.data.filter((subgreddiit) => {
                        return subgreddiit.moderator == localStorage.id;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, [flag]);

    let date;
    const dateSetter = (createdon) => {
        date = new Date(createdon).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return date;
    };

    const drawer = (
        <div>
            <Toolbar />
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
                            // console.log(`/saved/${localStorage.id}`);
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
                            variant="h4"
                            component="div"
                            sx={{ mb: 1.5 }}
                        >
                            My SubGreddiits
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleCreateSubgreddiitClick}
                            sx={{
                                backgroundColor: "#f37220",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#f37220",
                                    opacity: 0.8,
                                },
                            }}
                        >
                            Create SubGreddiit
                        </Button>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 2 }} />
                <Dialog
                    open={openCreate}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCreateSubgreddiitClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Create a new SubGreddiit"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createSubGreddiit();
                                }}
                            >
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="subgreddiit-name"
                                            label="Subgreddiit Name"
                                            variant="outlined"
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="subgreddiit-description"
                                            label="Subgreddiit Description"
                                            variant="outlined"
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="subgreddiit-tags"
                                            label="Subgreddiit Tags"
                                            variant="outlined"
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="subgreddiit-banned"
                                            label="Subgreddiit Banned Keywords"
                                            variant="outlined"
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateSubgreddiitClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                createSubGreddiit();
                            }}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ mt: 4 }} />
                <Grid container spacing={2}>
                    {mySubgreddiits.map((subGreddiit) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: "rgba(255, 110, 30, 0.6)",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{ mb: 1.5 }}
                                    >
                                        {"g/" + subGreddiit.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1.5,
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
                                        {subGreddiit.description}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 1.5 }}
                                            >
                                                <strong>Followers</strong> :{" "}
                                                {subGreddiit.normies.length + 1}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 1.5 }}
                                            >
                                                <strong>Posts</strong> :{" "}
                                                {subGreddiit.posts.length}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        variant="body2"
                                        sx={{ mb: 1.5 }}
                                    >
                                        <strong>Created On</strong> :{" "}
                                        {dateSetter(subGreddiit.createdon)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ mb: 1.5 }}
                                    >
                                        <strong>Tags</strong> :{" "}
                                        {subGreddiit.tags.map((tag) => (
                                            <Chip
                                                label={tag}
                                                sx={{
                                                    m: 0.5,
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.2)",
                                                }}
                                            />
                                        ))}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ mb: 1.5 }}
                                    >
                                        <strong>Banned</strong> :{" "}
                                        {subGreddiit.banned.map((banned) => (
                                            <Chip
                                                label={banned}
                                                sx={{
                                                    m: 0.5,
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.2)",
                                                }}
                                            />
                                        ))}
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#f37220",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => {
                                                    localStorage.subGreddiitId =
                                                        subGreddiit._id;
                                                    navigate(
                                                        `/subgreddiits/myg/${localStorage.id}/${subGreddiit._id}/users`
                                                    );
                                                }}
                                            >
                                                Open
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#f37220",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => {
                                                    localStorage.deleteId =
                                                        subGreddiit._id;
                                                    setAnchorElDelete(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Dialog
                    open={openDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDeleteClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Delete Subgreddiit"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this subgreddiit?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Cancel</Button>
                        <Button
                            onClick={() => {
                                handleDeleteClose();
                                let req_path = `/api/subgreddiits/delete/${localStorage.id}`;
                                let req_body = {
                                    id: localStorage.deleteId,
                                };
                                let headers = {
                                    headers: {
                                        Authorization: `token ${localStorage.token}`,
                                    },
                                };
                                axios
                                    .post(req_path, req_body, headers)
                                    .then((res) => {
                                        setFlag(!flag);
                                    })
                                    .catch((err) => {
                                        alert(err.response.data.error);
                                        console.log(err.response.data.error);
                                    });
                                localStorage.removeItem("deleteId");
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
