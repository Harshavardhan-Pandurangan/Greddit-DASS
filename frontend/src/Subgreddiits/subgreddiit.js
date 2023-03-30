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
import { useParams } from "react-router-dom";
import axios from "axios";
import myImage from "./reference-groups.png";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 200;

export default function Subgreddiit(props) {
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

    let date;
    const dateSetter = (createdon) => {
        date = new Date(createdon).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return date;
    };

    const [dialogType, setDialogType] = React.useState("logout");

    const [subgreddiit, setSubgreddiit] = React.useState({});
    const [normies, setNormies] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [banned, setBanned] = React.useState([]);
    let { subgreddiitId } = useParams();
    const [flag, setFlag] = React.useState(false);
    const [user, setUser] = React.useState({
        saved: [],
    });

    useEffect(() => {
        if (!localStorage.token) {
            alert("Please login to continue");
            return;
        }
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
                setNormies(res.data.normies);
                setTags(res.data.tags);
                setBanned(res.data.banned);
            })
            .catch((err) => {
                console.log(err);
            });

        url = `/api/posts/get/${localStorage.id}`;
        req_body = {
            subgreddiit: subgreddiitId,
        };
        headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .post(url, req_body, headers)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        let request_path = "/api/users/get/" + localStorage.getItem("id");
        let json_pass_data = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .get(request_path, json_pass_data)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [flag]);

    const [moderatorName, setModeratorName] = React.useState("");

    useEffect(() => {
        if (!localStorage.token) {
            alert("Please login to continue");
            return;
        }

        if (!subgreddiit.moderator) {
            return;
        }

        let url = `/api/users/getnames/${localStorage.id}`;
        let req_body = {
            ids: [subgreddiit.moderator],
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .post(url, req_body, headers)
            .then((res) => {
                setModeratorName(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [subgreddiit]);

    const [anchorElCreate, setAnchorElCreate] = React.useState(null);
    const openCreate = Boolean(anchorElCreate);
    const handleClickCreate = (event) => {
        setAnchorElCreate(true);
    };
    const handleCloseCreate = () => {
        document.getElementById("title").value = "";
        document.getElementById("text").value = "";
        setAnchorElCreate(false);
    };

    const createPost = () => {
        let url = `/api/posts/create/${localStorage.id}`;
        let t1 = filterContent(document.getElementById("title").value, banned);
        let t2 = filterContent(document.getElementById("text").value, banned);
        let req_body = {
            title: t1,
            text: t2,
            subgreddiit: subgreddiitId,
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .post(url, req_body, headers)
            .then((res) => {
                handleCloseCreate();
                setFlag(!flag);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const Vote = (post, type) => {
        let url = `/api/posts/update/${localStorage.id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        let req_body;
        if (type === "up" && !post.upvotes.includes(localStorage.id)) {
            req_body = {
                id: post._id,
                type: "upvote",
            };
            let post_new = post;
            post_new.upvotes.push(localStorage.id);
            post_new.downvotes = post_new.downvotes.filter(
                (id) => id !== localStorage.id
            );
            setPost(post_new);
        } else if (
            type === "down" &&
            !post.downvotes.includes(localStorage.id)
        ) {
            req_body = {
                id: post._id,
                type: "downvote",
            };
            let post_new = post;
            post_new.downvotes.push(localStorage.id);
            post_new.upvotes = post_new.upvotes.filter(
                (id) => id !== localStorage.id
            );
            setPost(post_new);
        } else {
            req_body = {
                id: post._id,
                type: "unvote",
            };
            let post_new = post;
            post_new.upvotes = post_new.upvotes.filter(
                (id) => id !== localStorage.id
            );
            post_new.downvotes = post_new.downvotes.filter(
                (id) => id !== localStorage.id
            );
            setPost(post_new);
        }

        axios
            .put(url, req_body, headers)
            .then((res) => {
                setFlag(!flag);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [anchorElPost, setAnchorElPost] = React.useState(null);
    const openPost = Boolean(anchorElPost);
    const handleClickPost = (event) => {
        handleComments();
        setAnchorElPost(true);
        setFlag(!flag);
    };
    const handleClosePost = () => {
        setAnchorElPost(false);
    };

    const [Post, setPost] = React.useState({
        title: "",
        text: "",
        upvotes: [],
        downvotes: [],
        comments: [],
        postedby: "",
        subgreddiit: "",
        date: "",
        _id: "",
    });

    const Save = (post) => {
        let url = `/api/users/save/${localStorage.id}`;
        let req_body;
        if (user.saved.includes(post._id)) {
            req_body = {
                id: post._id,
                type: "unsave",
            };
            let post_new = post;
            post_new.saved = post_new.saved.filter(
                (id) => id !== localStorage.id
            );
            setPost(post_new);
        } else {
            req_body = {
                id: post._id,
                type: "save",
            };
            let post_new = post;
            post_new.saved.push(localStorage.id);
            setPost(post_new);
        }
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        console.log(req_body);

        axios
            .put(url, req_body, headers)
            .then((res) => {
                setFlag(!flag);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const Follow = (name) => {
        let url = `/api/users/follow/${localStorage.id}`;
        let req_body;
        if (user.following.includes(name)) {
            alert("Already following");
        } else {
            req_body = {
                username: name,
                type: "follow",
            };
        }
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .put(url, req_body, headers)
            .then((res) => {
                setFlag(!flag);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [comment, setComment] = React.useState("");

    const Comment = (post) => {
        let trimmed = comment.trimEnd();
        if (trimmed === "") {
            return;
        }

        let url = `/api/posts/update/${localStorage.id}`;
        let req_body = {
            id: post._id,
            type: "comment",
            comment: {
                text: comment.trimEnd(),
                postedby: localStorage.id,
                name: user.username,
            },
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .put(url, req_body, headers)
            .then((res) => {
                setComment("");
                setComments(res.data.comments);
                handleComments();
                setFlag(!flag);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [comments, setComments] = React.useState([]);

    const handleComments = () => {
        let url = `/api/users/getnames/${localStorage.id}`;
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        for (let i = 0; i < comments.length; i++) {
            let req_body = {
                ids: [comments[i].postedby],
            };
            axios.post(url, req_body, headers).then((res) => {
                let comments_new = comments;
                comments_new[i].postedby = res.data[0].username;
                setComments((comments) => [...comments_new]);
            });
        }
    };

    const [openReport, setOpenReport] = React.useState(false);

    const handleClickReport = () => {
        setReport("");
        setOpenReport(true);
    };

    const handleCloseReport = () => {
        setOpenReport(false);
    };

    const [report, setReport] = React.useState("");

    const Report = (post) => {
        let trimmed = report.trimEnd();
        if (trimmed === "") {
            return;
        }

        let url = `/api/reports/create/${localStorage.id}`;
        let req_body = {
            postid: post._id,
            text: report.trimEnd(),
        };
        let headers = {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        };

        axios
            .post(url, req_body, headers)
            .then((res) => {
                setReport("");
                setOpenReport(false);
                setFlag(!flag);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function filterContent(content, bannedKeywords) {
        const bannedRegex = new RegExp(bannedKeywords.join("|"), "i");
        const filteredContent = [];
        const words = content.split(" ");
        for (const word of words) {
            const filteredWord = word.replace(bannedRegex, (match) =>
                "*".repeat(match.length)
            );
            filteredContent.push(filteredWord);
        }
        return filteredContent.join(" ");
    }

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
                xs={12}
            >
                <Toolbar />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                >
                    <Grid item xs={12} sm={6}>
                        <img
                            src={myImage}
                            alt="myImage"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
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
                            justifyContent="center"
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
                            <strong>Description</strong> :{" "}
                            {subgreddiit.description}
                        </Typography>
                        <Grid
                            container
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 1.5,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <strong>Followers</strong> :{" "}
                                    {normies.length + 1}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 1.5,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <strong>Posts</strong> : {posts.length}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            <strong>Created By</strong> : {moderatorName}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            <strong>Created On</strong> :{" "}
                            {dateSetter(subgreddiit.createdon)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            <strong>Tags</strong> :{" "}
                            {tags.map((tag) => (
                                <Chip
                                    label={tag}
                                    sx={{
                                        m: 0.5,
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    }}
                                />
                            ))}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            <strong>Banned</strong> :{" "}
                            {banned.map((ban) => (
                                <Chip
                                    label={ban}
                                    sx={{
                                        m: 0.5,
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    }}
                                />
                            ))}
                        </Typography>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: "rgb(243, 114, 32)",
                        "&:hover": {
                            opacity: 0.8,
                            backgroundColor: "rgb(243, 114, 32)",
                        },
                    }}
                    onClick={() => {
                        handleClickCreate();
                    }}
                >
                    Create Post
                </Button>
                <Box sx={{ mt: 2 }} />
                <Divider sx={{ mb: 2 }} />
                <Dialog
                    open={openCreate}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseCreate}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Create Post"}
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DialogContentText id="alert-dialog-slide-description">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createPost();
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="title"
                                                name="title"
                                                label="Title"
                                                fullWidth
                                                autoComplete="title"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="text"
                                                name="content"
                                                label="Content"
                                                fullWidth
                                                autoComplete="content"
                                                multiline
                                                rows={4}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    mt: 2,
                                                    backgroundColor:
                                                        "rgb(243, 114, 32)",
                                                    "&:hover": {
                                                        opacity: 0.8,
                                                        backgroundColor:
                                                            "rgb(243, 114, 32)",
                                                    },
                                                }}
                                            >
                                                Post
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    mt: 2,
                                                    backgroundColor:
                                                        "rgb(243, 114, 32)",
                                                    "&:hover": {
                                                        opacity: 0.8,
                                                        backgroundColor:
                                                            "rgb(243, 114, 32)",
                                                    },
                                                }}
                                                onClick={handleCloseCreate}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Box sx={{ mt: 4 }}>
                    <Grid container spacing={4} xs={12}>
                        {posts.map((post) => (
                            <Grid item key={post.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardHeader
                                        title={post.title}
                                        subheader={
                                            "Posted by n/" +
                                            post.postedby +
                                            ", on " +
                                            dateSetter(post.date)
                                        }
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body"
                                            sx={{
                                                mb: 1.5,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                height: "3.4em",
                                            }}
                                        >
                                            {post.text}
                                        </Typography>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button
                                                variant="text"
                                                sx={{
                                                    mt: 2,
                                                    "&:hover": {
                                                        opacity: 0.8,
                                                    },
                                                    color: "rgb(243, 114, 32)",
                                                }}
                                                onClick={() => {
                                                    let newPost = post;
                                                    newPost.saved = [];
                                                    setPost(newPost);
                                                    setComments(
                                                        newPost.comments
                                                    );
                                                    setComment("");
                                                    handleClickPost();
                                                }}
                                            >
                                                <ExpandMoreIcon />
                                            </Button>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid
                                                item
                                                xs={3}
                                                sm={3}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        mt: 2,
                                                        backgroundColor:
                                                            "rgb(243, 114, 32)",
                                                        opacity:
                                                            post.upvotes.includes(
                                                                localStorage.id
                                                            )
                                                                ? 1
                                                                : 0.6,
                                                        "&:hover": {
                                                            opacity: 0.4,
                                                            backgroundColor:
                                                                "rgb(243, 114, 32)",
                                                        },
                                                        "& > *": {
                                                            m: 1,
                                                        },
                                                        padding: 0,
                                                    }}
                                                    onClick={() => {
                                                        Vote(post, "up");
                                                    }}
                                                >
                                                    <ThumbUpIcon />
                                                    {post.upvotes.length}
                                                </Button>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={3}
                                                sm={3}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        mt: 2,
                                                        backgroundColor:
                                                            "rgb(243, 114, 32)",
                                                        opacity:
                                                            post.downvotes.includes(
                                                                localStorage.id
                                                            )
                                                                ? 1
                                                                : 0.6,
                                                        "&:hover": {
                                                            opacity: 0.4,
                                                            backgroundColor:
                                                                "rgb(243, 114, 32)",
                                                        },
                                                        "& > *": {
                                                            m: 1,
                                                        },
                                                        padding: 0,
                                                    }}
                                                    onClick={() => {
                                                        Vote(post, "down");
                                                    }}
                                                >
                                                    <ThumbDownIcon />
                                                    {post.downvotes.length}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Dialog
                    open={openPost}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClosePost}
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
                                Posted by n/{Post.postedby}, on{" "}
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
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={3}
                                    sm={3}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={5}
                                        sm={5}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                backgroundColor:
                                                    "rgb(243, 114, 32)",
                                                opacity: Post.upvotes.includes(
                                                    localStorage.id
                                                )
                                                    ? 1
                                                    : 0.6,
                                                "&:hover": {
                                                    opacity: 0.4,
                                                    backgroundColor:
                                                        "rgb(243, 114, 32)",
                                                },
                                                "& > *": {
                                                    m: 1,
                                                },
                                                padding: 0,
                                            }}
                                            onClick={() => {
                                                Vote(Post, "up");
                                            }}
                                        >
                                            <ThumbUpIcon />
                                            {Post.upvotes.length}
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        sm={2}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    />
                                    <Grid
                                        item
                                        xs={5}
                                        sm={5}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                backgroundColor:
                                                    "rgb(243, 114, 32)",
                                                opacity:
                                                    Post.downvotes.includes(
                                                        localStorage.id
                                                    )
                                                        ? 1
                                                        : 0.6,
                                                "&:hover": {
                                                    opacity: 0.4,
                                                    backgroundColor:
                                                        "rgb(243, 114, 32)",
                                                },
                                                "& > *": {
                                                    m: 1,
                                                },
                                                padding: 0,
                                            }}
                                            onClick={() => {
                                                Vote(Post, "down");
                                            }}
                                        >
                                            <ThumbDownIcon />
                                            {Post.downvotes.length}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    sm={3}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor:
                                                "rgb(243, 114, 32)",
                                            opacity: user.saved.includes(
                                                Post._id
                                            )
                                                ? 1
                                                : 0.6,
                                            "&:hover": {
                                                opacity: 0.4,
                                                backgroundColor:
                                                    "rgb(243, 114, 32)",
                                            },
                                            "& > *": {
                                                m: 1,
                                            },
                                            padding: 0,
                                            paddingRight: 3,
                                        }}
                                        onClick={() => {
                                            Save(Post);
                                        }}
                                    >
                                        <BookmarkIcon />
                                        {user.saved.includes(Post._id)
                                            ? "Saved"
                                            : "Save"}
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    sm={3}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor:
                                                "rgb(243, 114, 32)",
                                            opacity: 0.8,
                                            "&:hover": {
                                                opacity: 0.4,
                                                backgroundColor:
                                                    "rgb(243, 114, 32)",
                                            },
                                            "& > *": {
                                                m: 1,
                                            },
                                        }}
                                        onClick={() => {
                                            Follow(Post.postedby);
                                        }}
                                        disabled={
                                            user.username === Post.postedby
                                        }
                                    >
                                        Follow
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    sm={3}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor:
                                                "rgb(243, 114, 32)",
                                            opacity: 0.8,
                                            "&:hover": {
                                                opacity: 0.4,
                                                backgroundColor:
                                                    "rgb(243, 114, 32)",
                                            },
                                            "& > *": {
                                                m: 1,
                                            },
                                        }}
                                        onClick={() => {
                                            handleClickReport(Post);
                                        }}
                                    >
                                        Report
                                    </Button>
                                </Grid>
                            </Grid>
                            <Divider
                                sx={{
                                    mt: 2,
                                }}
                            />
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                        marginTop: 1,
                                    }}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Add a comment..."
                                        variant="standard"
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            opacity: 0.9,
                                            padding: 0,
                                        }}
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                Comment(Post);
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                    }}
                                >
                                    <Typography
                                        variant="body"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "justify",
                                            padding: 0,
                                        }}
                                    >
                                        Comments
                                    </Typography>
                                </Grid>
                                {comments.map((comment) => (
                                    <Grid item xs={12} sm={12}>
                                        <Card
                                            sx={{
                                                opacity: 0.9,
                                                padding: 0,
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="body"
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "justify",
                                                    }}
                                                >
                                                    {comment.text}
                                                </Typography>
                                                <Typography
                                                    variant="body"
                                                    sx={{
                                                        fontSize: 12,
                                                        display: "flex",
                                                        justifyContent: "right",
                                                        opacity: 0.8,
                                                    }}
                                                >
                                                    {"n/"}
                                                    {comment.name}, on{" "}
                                                    {dateSetter(comment.date)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openReport}
                    onClose={handleCloseReport}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Report Post"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                    }}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Reason for reporting"
                                        variant="standard"
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            opacity: 0.9,
                                            padding: 0,
                                        }}
                                        value={report}
                                        onChange={(e) => {
                                            setReport(e.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor:
                                                "rgb(243, 114, 32)",
                                            opacity: 0.8,
                                            "&:hover": {
                                                opacity: 0.4,
                                                backgroundColor:
                                                    "rgb(243, 114, 32)",
                                            },
                                            "& > *": {
                                                m: 1,
                                            },
                                        }}
                                        onClick={() => {
                                            Report(Post);
                                        }}
                                    >
                                        Report
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
