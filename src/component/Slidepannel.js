import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Home from '../screens/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "../App.css"
import Myconnection from '../screens/Myconnection';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user,setuser]=React.useState();
  const [activeItem, setActiveItem] = React.useState('My Profile');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  React.useEffect(()=>{
    const data= localStorage.getItem('user');
    const json= JSON.parse(data)
    console.log(json.user)
    setuser(json);
    
  },[])

  const drawer = (
    <div>
      <Toolbar />
      <Typography variant="h7" noWrap component="div" style={{marginLeft:"auto",color:"black",display:"flex",alignItems:"center",marginTop:"-40px"}}>
          <div style={{height:"40px",width:"140px",marginRight:"10px",display:"flex",justifyContent:"center",alignItems:"center",borderWidth:"2px",borderStyle:"solid",paddingTop:"5px",marginLeft:"30px",
          marginBottom:"5px",boxShadow:"0 0 10px rgba(0,0,0,.5)",borderRadius:"5px",borderColor:"rgba(0,0,0,0.3)"}}>
            <h5>Dashboard</h5>
          </div>
            
          </Typography>
      <Divider />
      <List>
        {['My Profile', 'My Connections', 'Inbox',"Help"].map((text, index) => (
          <ListItem 
            key={text}
    disablePadding>
            <ListItemButton 
 
    onClick={() => setActiveItem(text)} >
             
                {<ArrowForwardIosIcon style={{fontSize:"15px",marginTop:"-15px"}}/>}
         
          <p style={{color:"black",fontSize:"16px",padding:"10px 20px"}}
          className={activeItem === text ? 'active' : ''}
          >{text}</p>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{backgroundColor:"white",}} >
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
           { isMobile&&<img src={require("../screens/header.png")}/>}
          </IconButton>
          
          <Typography variant="h7" noWrap component="div" style={{marginLeft:"auto",color:"black",display:"flex",alignItems:"center",}}>
           <NotificationsNoneIcon/>
        { isMobile?<img src={require("../screens/icon.png")} style={{height:"30px",width:"30px",borderRadius:"15px"}}/> :<div style={{display:"flex",alignItems:"center",
          borderWidth:"1px",borderStyle:"solid",height:"40px",width:"200px",justifyContent:"space-between",paddingTop:"5px",paddingBottom:"5px",paddingInline:"10px",borderColor:"rgba(0,0,0,.1)",borderRadius:"5px"}}>

         
         <img src={require("../screens/icon2.png")} style={{backgroundColor:"#ffa78d",borderRadius:"8px",height:"30px",width:"30px",marginRight:"5px"}}/>
          <div style={{ margin: 0, padding: 0,marginRight:"30px" }}>
  <p style={{ color: "black", fontSize: "10px", margin: 0, padding: 0 }}>
    Welcome back,
  </p>
  <p style={{ color: "black", fontSize: "15px", margin: 0, padding: 0 }}>
  {user && user.user.name}
  </p>
</div>

            <KeyboardArrowDownIcon/>
          </div>}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography>
  
        </Typography>
    { activeItem=="My Profile"? <Home/>:<Myconnection/>}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;