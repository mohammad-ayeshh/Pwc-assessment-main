import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environment';
import axios from 'axios';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {
  map!: mapboxgl.Map;
  city!:string;

  accessToken:string="YOUR Access Token"
   results: any;
constructor(private http: HttpClient){
  const path = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  this.results =http.get(path);
}



  ngOnInit(): void {
    
    this.map = new mapboxgl.Map({
      container: 'map',
      accessToken:environment.mapbox.accessToken ,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [37, 31],
      zoom: 6.5
    });
    
    this.map.addControl(new mapboxgl.NavigationControl());
  }

search(){
  

  
//var searchButton = document.getElementById('search-button');

  // Use the Mapbox Geocoding API to search for the city
  var geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.city + '.json?access_token=' + this.accessToken;
  this.http.get(geocodeURL).subscribe({
    next:(data:any)=> {
    
      
      var lng = data.features[0].center[0];
      var lat = data.features[0].center[1];
      // Center the map on the search result
      this.map.setCenter([lng, lat]);
      // Add a marker to the map
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(this.map);
    
    },
  })
    // .then(function(response) {
    //   return response.json();
    // })
    // .then((data) => {
    //   var lng = data.features[0].center[0];
    //   var lat = data.features[0].center[1];
    //   // Center the map on the search result
    //   this.map.setCenter([lng, lat]);
    //   // Add a marker to the map
    //   new mapboxgl.Marker()
    //     .setLngLat([lng, lat])
    //     .addTo(this.map);
    // });
}}
