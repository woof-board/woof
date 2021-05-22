import React, { useRef, useEffect } from 'react';
import '../../css/Map.css';
import { objectToArray, middleValueOfArray } from '../../utils/helpers'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function Map(order) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const coordinates = useRef(null);
    // get coords object
    const {
        order_id,
        coords
    } = order;
    // convert to array
    const coordinateArr = coords.map((coord, ind) => {
        return objectToArray(coord);
    });
    // get center position of the walker path
    const mapCenter = middleValueOfArray(coordinateArr);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        coordinates.current = coordinateArr;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: mapCenter,
        //   center:[-122.4861, 37.828802],
          zoom: 15
        });
    });
    useEffect(() => {
        if (!map.current) return; 
        // event.preventDefault();
        console.log("Hi");
        map.current.on('load', function () {
            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': coordinates.current
                }
            }
        });
        map.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 8
            }
            });
        });
    });
    return (
        <>
            <div id="map-container">
                <div ref={mapContainer} id="map-container"></div>
            </div> 
        </>
    )
};
export default Map;