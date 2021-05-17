import React, { useRef, useEffect, useState } from 'react';
import './Map.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// set up .env
mapboxgl.accessToken = 'pk.eyJ1Ijoid29vZi1ib2FyZCIsImEiOiJja29udGdoYW8wNDF1MndtbDMyeWY3c3pzIn0.IlKfCHeu66AocJmQMG0jxw'


function Map() {
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const coordinates = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        console.log("Current Hi");
        coordinates.current = [
            [-122.483696, 37.833818],
            [-122.483482, 37.833174],
            [-122.483396, 37.8327],
            [-122.483568, 37.832056],
            [-122.48404, 37.831141],
            [-122.48404, 37.830497],
            [-122.483482, 37.82992],
            [-122.483568, 37.829548],
            [-122.48507, 37.829446],
            [-122.4861, 37.828802],
            [-122.486958, 37.82931],
            [-122.487001, 37.830802],
            [-122.487516, 37.831683],
            [-122.488031, 37.832158],
            [-122.488889, 37.832971],
            [-122.489876, 37.832632],
            [-122.490434, 37.832937],
            [-122.49125, 37.832429],
            [-122.491636, 37.832564],
            [-122.492237, 37.833378],
            [-122.493782, 37.833683]
            ];
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

