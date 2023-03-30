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
import { Grid } from "@mui/material";
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 200;

export default function SubgreddiitStats(props) {
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
                Stats
            </Box>
        </Box>
    );
}
