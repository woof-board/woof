import React, { useRef, useEffect, useState } from 'react';
import './Map.css';
import { objectToArray } from '../../utils/helpers'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// require('dotenv').config();
// mapboxgl.accessToken = 

function Map(order) {
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const coordinates = useRef(null);
    // get coords object
    const {
        coords
    } = order;
    // convert to array
    const coordinateArr = coords.map((coord, ind) => {
        objectToArray(coord);
    });
        

    useEffect(() => {
        if (map.current) return; // initialize map only once
        console.log("Current Hi");
        
        coordinates.current = coordinateArr;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-122.4861, 37.828802],
          zoom: 15
        });
    });
    
    useEffect(() => {
        if (!map.current) return; 
        // event.preventDefault();
        console.log("Hi");
        // document.getElementById('map').innerHTML = "MAP";
        
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

