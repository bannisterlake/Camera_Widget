import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { 
    Rectangle,
    Map, 
    Marker, 
    TileLayer, 
    Popup, 
    Tooltip
} from 'react-leaflet';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerToggle: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 5,
    backgroundColor: 'white',
    zIndex: 10,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2)'
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));


const prefix = process.env.NODE_ENV === 'development' ? '../': "./";

var myIcon = L.icon({
    iconUrl: `${prefix}/img/camera.svg`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [-3, -76],

})

export default function PersistentDrawerRight(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = useState({lat: 43.6475, long: -79.3811, zoom: 15})



  const toggleDrawer = () => {
      setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div onClick={toggleDrawer} className={classes.drawerToggle}>
            <IconButton onClick={toggleDrawer}>
                {!open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Map  height={100}  center={[position.lat, position.long]} zoom={position.zoom}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Rectangle color="purple" bounds={[props.config.pt1, props.config.pt2]} />
                {props.cameras && props.cameras.cameras.map(camera=>{
                    return (
                        <Marker key={camera.id} position={[camera.lat, camera.long]} icon={myIcon}>
                            <Popup>
                                <strong>ID: </strong>{camera.id}
                                <br/>
                                <strong>Name: </strong>{camera.name}
                                <br/>
                                <strong>View: </strong>{camera.view}
                            </Popup>
                        </Marker>
                    )
                })

                }
                
            </Map>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        
      >
        <div className={classes.drawerHeader}>
          
        </div>
      </Drawer>
    </div>
  );
}
