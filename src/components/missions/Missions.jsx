import React, {useEffect, useState} from 'react';
import Mission from './Mission';
import {Grid} from '@material-ui/core';
import {fetchMissions} from '../../api';

const Missions = () => {
    let mission = {
        missionName : "MissionX",
        rocketName : "Rocket X",
        launchYear : "2008",
        img: "https://farm8.staticflickr.com/7420/26814484893_13059e4b39_o.jpg"
      };
    
    let missionsMock = [];
    for(let i = 0; i < 18; i++) missionsMock.push(mission);

    useEffect(() => {
        const fetchAPI = async () => {
            setMissions(await fetchMissions())
        }

        fetchAPI();
    }, [])

    const [missions, setMissions] = useState([]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <h1>Missions here</h1>
                </Grid>
                <Grid item xs={3}></Grid>

                {missions.map(m =>(
                    <Grid key={m.flightNumber} item xs={6} md={4}>
                        <Mission mission={m} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Missions;