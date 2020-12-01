
var sUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDL62tnoGgRVKATpx54QP8CSw672Ql4hZ8";

function getScript(source, callback) {
    var el = document.createElement('script');
    el.onload = callback;
    el.src = source;

    document.body.appendChild(el);

}

function map($location) {

    var map,
        marker,
        latlng = new google.maps.LatLng(44.224810, 42.044176),
        geocoder = new google.maps.Geocoder(),
        infoWindow = new google.maps.InfoWindow(),
        zoomMap = 12,
        dragMap = true,
        markers = [],
        markerBounds = new google.maps.LatLngBounds(),
        markerSvg = {
            url:'./img/marker.png',
            scaledSize: new google.maps.Size(50, 50),
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(35, 60)
        };

    function initialize($location){

        var mapOptions = {
            center: latlng,
            zoom: zoomMap,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: dragMap,
            streetViewControl: false,
            disableDefaultUI: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "red"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#e8e8e8"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "##000000"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#aadaff"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        };

        // Create the map
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Get the data and set the marker bounds
        var markersLocations = $location;

        // Loop through the data getting the address
        $.each(markersLocations,function(index, data, infowindow){

            geocoder.geocode( { 'address': data.address}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    map.setCenter(results[0].geometry.location);

                    // Add the markers
                    marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        icon: markerSvg
                    });

                    markers.push(marker);

                    // Use the results to set the bounds
                    markerBounds.extend(results[0].geometry.location);

                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    }

    initialize($location);
}

//map
window.onload = function () {
    if ($('#map').length > 0){

        getScript(sUrl, function() {

            var $location = $('.u-init-map').data('locations');

            map($location);
        });
    }
};