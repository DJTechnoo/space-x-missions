import axios from 'axios';

const url = "https://api.spacexdata.com/v3/launches";

export const fetchMissions = async() => {
    try {
        const {data} = await axios.get(`${url}`);
        const modData = data.map(d => {
            let img = "https://live.staticflickr.com/7608/16661753958_3d70ab216d_b.jpg";
            if(d.links.flickr_images.length) 
                img = d.links.flickr_images[0];
            return {
                flightNumber: d.flight_number,
                missionName: d.mission_name,
                rocketName : d.rocket.rocket_name,
                launchYear : d.launch_year,
                date : d.launch_date_unix,
                img : img
            }    
        });
        return modData.slice(Math.max(modData.length - 20, 0))
            .sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)); 
;
    } catch (err) {
        
    }
}


export const fetchMissionDetails = async flightNumber => {
    try {
        const {data: {
                launch_site:{site_name},
                launch_success,
                launch_date_utc
            }
        } = await axios.get(`${url}/${flightNumber}`);
        return {siteName: site_name, success: launch_success, dateUTC: launch_date_utc};
    } catch (err) {
        
    }
}