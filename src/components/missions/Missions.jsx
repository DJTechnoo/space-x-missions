import React, {useEffect, useState} from 'react';
import Mission from './Mission';
import {Fade} from 'react-reveal';
import {Grid, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {fetchMissions, fetchMissionDetails} from '../../api';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
const top = 50 + rand();
const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));



const Missions = () => {
    

    useEffect(() => {
        const fetchAPI = async () => {
            setMissions(await fetchMissions())
        }

        fetchAPI();
    }, [])

    const fetchDetailedMissionAPI = async flightNumber => {
        setDetailed(await fetchMissionDetails(flightNumber));
    }

    const [missions, setMissions] = useState([]);
    const [detailed, setDetailed] = useState(null);
    const [open, setOpen] = useState(false);
  
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
        detailed ? 
            (<div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Launch site: {detailed.siteName}</h2>
                {detailed.success ? (
                        <p id="simple-modal-description">
                            Launch succeeded
                        </p>
                    ) 
                    : (
                        <p id="simple-modal-description">
                            Launch not confirmed or failed
                        </p>
                    )
                }
                
            </div>)
            : <></>
    );

    const openHandler = () => {
        setOpen(true);
    }

    const closeHandler = () => {
        setOpen(false);
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Fade left>
                        <h1>Mission Launches</h1>
                    </Fade> 
                </Grid>
                <Grid item xs={3}></Grid>
                    {missions.map(m =>(
                        <Grid key={m.flightNumber} item xs={6} md={4}>
                            <Mission 
                                mission={m} 
                                openHandler={openHandler} 
                                fetchDetailedMissionAPI={fetchDetailedMissionAPI}
                                />
                        </Grid>
                    ))}
            </Grid>
            <Modal
                open={open}
                onClose={closeHandler}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
        </div>
    );
}

export default Missions;