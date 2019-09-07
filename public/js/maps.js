function initMap() {

    var options = {
        zoom: 11,
        center: {
            lat: 39.95258,
            lng: -75.165222
        },
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    // Array of Markers

    var markers = [
        {
            coords:{ lat: 40.018740, lng: -75.208980 },
            iconImage: 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
            content: "<p>Evan's house<p>"
        },
        {
            coords:{ lat: 39.977590, lng: -75.416780 },
        },
        {
            coords:{ lat: 39.940689, lng: -75.198807 },
        }
    ]

    // Loop through Markers

    for (i = 0; i < markers.length; i++) {
        addMarker(markers[i])
    }


    // Add Marker Function
    function addMarker(jobsites) {
        var marker = new google.maps.Marker({
            position: jobsites.coords,
            map: map,
        })

        // Checking for custom icon
        if (jobsites.iconImage) {
            // Setting icon image
            marker.setIcon(jobsites.iconImage);
        }

        // Checking for content
        if (jobsites.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: jobsites.content
            });
        }

        // Listener on coords to show content
        marker.addListener("click", function () {
            infoWindow.open(map, marker);
        })
    }

    // Listen for click on map

    google.maps.event.addListener(map, 'click', function(event){
        addMarker({coords: event.latLng});
    })


}

