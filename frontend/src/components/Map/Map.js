import './Map.css';
import { useEffect, useRef, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Map = ({ data:{
    mapOptions = {},
    businesses = [],
    markerEventHandlers = {},
    handleRating 
}}) => {
    const [map, setMap] = useState(null);
    const markers = useRef({})
    const mapRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: 37.773972,
                    lng: -122.431297
                },
                zoom: 13,
                clickableIcons: false,
                ...mapOptions,
            }));
        }
        console.log(mapOptions)
        const marker = new window.google.maps.Marker({
            position: mapOptions.center,
            map: map
        })
    }, [mapRef, map, mapOptions]);

    let businessIds = []

    useEffect(() => {
        businesses?.forEach((business, idx) => {
            if (!markers[business?.id]) {
                // create new marker for business
                let marker = new window.google.maps.Marker({
                    position: business.location,
                    map: map,
                    strokeWeight: 2,
                    strokeColor: "#fff",
                    label: {
                        text: `${idx + 1}`,
                        color: '#fff'
                    }
                });


                // add info window for each business marker
                const contentString =
                    `<div class="tooltip-container">` +
                    `<img src=${business?.photos[1]} />` +
                    `<h1>${business?.name}</h1>` +
                    `<div class=${handleRating(business?.averageRating)}  />` +
                    `</div>`

                let infoWindow = new window.google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('mouseover', () => infoWindow.open(map, marker))
                //  click to take to business page
                marker.addListener('click', () => {
                    history.push(`/biz/${business?.id}`);
                })

                marker.addListener('mouseout', () => {
                    // set initial opacity
                    let opacity = 1;

                    // define function to reduce opacity gradually
                    function fadeOut() {
                        opacity -= 0.1;
                        if (opacity > 0) {
                            infoWindow.setOptions({ opacity: opacity });
                            setTimeout(fadeOut, 50);
                        } else {
                            infoWindow.close();
                        }
                    }

                    // start fading out
                    setTimeout(fadeOut, 50);
                });


                // add event handlers to each marker
                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(business));
                });


                // add marker to markers ref
                markers.current[business?.id] = marker
                businessIds.push(business?.id)
            };
        });
    }, [map, markers, businesses, markerEventHandlers])

    return (
        <div
            ref={mapRef}
        >
            Map
        </div>
    )

}

const WrappedMap = (mapOptions) => {

    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <Map data={mapOptions} />
        </Wrapper>
    )
}

export default WrappedMap;