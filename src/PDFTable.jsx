import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ViewListIcon from '@mui/icons-material/ViewList';
import {
  AccountCircle,
  CheckBox,
  DashboardCustomize,
  DashboardSharp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { authHeaders, baseUrl, userName } from "./contants";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Button, Modal, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationDropdown from "./NotificationDropdown";



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PDFTable() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState("");
  const [userData, setUserData] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [fileId, setFileId] = React.useState("");


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getPDF = () => {
    axios.get(`${baseUrl}/pdfeditor/pdf-file/`, authHeaders).then((res) => {
      setData(res.data.results)
      console.log("res", res)
    })
  };
  const getUser = () => {
    axios.get(`${baseUrl}/account/users/`, authHeaders).then((res) => {
      setUserData(res.data.results)
      console.log("res", res)
    })
  };
  const handleSelection = (arg) => {
    if (selectedUser.includes(arg)) {
      setSelectedUser(selectedUser.filter((i) => i !== arg));
    } else {
      setSelectedUser([...selectedUser, arg]);
    }
  };
  const handleSubmitCollabration = () => {
    const data = {
      user: selectedUser[0],
      converted_file: fileId
    }
    axios.post(`${baseUrl}/pdfeditor/collaboration/`, data, authHeaders).then((res) => {
      setOpenModal(false)
      setSelectedUser([])
      setFileId("")
      Swal.fire({ icon: "success", html: "File shared successfully" });
    })

  };
  const uploadtoGoogleDrive = (item) => {
    axios.post(`${baseUrl}/pdfeditor/uploadfile/googledrive/${item}/`, {}, authHeaders).then((res) => {
      Swal.fire({ icon: "success", html: "File uploaded successfully" });
    })
  };
  React.useEffect(() => {
    getPDF();
  }, [])
  return (
    <React.Fragment>


      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div>
                {userName}
              </div>
              <div>
                <NotificationDropdown />
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              onClick={() => navigate("/dashboard")}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DashboardSharp />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => navigate("/user")}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={"User profile"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => navigate("/doc")}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DocumentScannerIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"User profile"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => navigate("/table")}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"User profile"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => navigate("/collaboration")}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"User profile"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              {/* <Card elevation={10} style={{}}>
              <CardContent>
                <Typography>
                  <strong>PDF created:</strong> 100
                </Typography>
                <Typography>
                  <strong>PDF download:</strong> 150
                </Typography>
                <Typography>
                  <strong>PDF printed:</strong> 120
                </Typography>
                <Typography>
                  <strong>PDF deleted:</strong> 50
                </Typography>
              </CardContent>
            </Card> */}
              <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Convert file</TableCell>
                      <TableCell>Created at</TableCell>
                      <TableCell>Updated at</TableCell>
                      <TableCell>Google drive</TableCell>
                      <TableCell>Share</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && data.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell >{row.name}</TableCell>
                        <TableCell> <a target="blank" href={row.convertfile}>
                          View file
                        </a></TableCell>
                        <TableCell >{row.created_at}</TableCell>
                        <TableCell >{row.updated_at}</TableCell>
                        <TableCell ><AiOutlineCloudUpload size={20} onClick={() => uploadtoGoogleDrive(row.id)} /></TableCell>
                        <TableCell>
                          <BiShare size={20} onClick={() => {
                            setOpenModal(true);
                            getUser();
                            setFileId(row.id)
                          }} />
                          {/* <Button onClick={() => {
                            setOpenModal(true);
                            console.log("click")
                          }}>share</Button> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* <Grid item xs={3}></Grid> */}
          </Grid>
        </Box>
      </Box>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>

            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData && userData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={selectedUser.includes(row.id)}
                        onChange={() => {
                          handleSelection(row.id);
                        }} />
                    </TableCell>
                    <TableCell >{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmitCollabration()}>Submit</Button>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
