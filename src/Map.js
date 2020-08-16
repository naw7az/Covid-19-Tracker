import React from 'react';
import "./Map.css";
import {showDataOnMap} from './util';
// changing the name of Map because our file and fucntion got the same name
import {Map as LeafletMap, TileLayer} from 'react-leaflet';

function Map({countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Loop through countries and draw circles on the screen */}
                {showDataOnMap(countries, casesType)}
            </LeafletMap>      
        </div>
    );
}

export default Map;
