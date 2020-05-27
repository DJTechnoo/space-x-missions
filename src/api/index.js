import axios from 'axios';

const url = "https://api.spacexdata.com/v3/launches?limit=20";

export const fetchMissions = async() => {
    try {
        const {data} = await axios.get(url);
        const modData = data.map(d => {
            let img = "https://live.staticflickr.com/7608/16661753958_3d70ab216d_b.jpg";
            if(d.links.flickr_images.length) 
                img = d.links.flickr_images[0];
            return {
                flightNumber: d.flight_number,
                missionName: d.mission_name,
                rocketName : d.rocket.rocket_name,
                launchYear : d.launch_year,
                img : img
            }    
        });
        return modData;
    } catch (err) {
        
    }
}