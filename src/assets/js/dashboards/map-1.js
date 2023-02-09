/*! maps.js | Huro | Css ninja 2020-2021 */

"use strict";

var map;

var locations = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Fast Pizza",
        logo: "assets/img/icons/logos/fastpizza.svg",
        distance: 0.3,
        openingCount: "6pm",
        phone: "+1 555 456-5659",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.038659, 38.931567],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Envato",
        logo: "assets/img/icons/logos/envato.svg",
        distance: 0.8,
        openingCount: "5pm",
        phone: "+1 555 154-4568",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.003168, 38.894651],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Lipflow",
        logo: "assets/img/icons/logos/lipflow.svg",
        distance: 1.2,
        openingCount: "8pm",
        phone: "+1 555 456-7897",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.090372, 38.881189],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Metamovies",
        logo: "assets/img/icons/logos/metamovies.svg",
        distance: 0.5,
        openingCount: "11pm",
        phone: "+1 555 456-5659",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.111561, 38.882342],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Slicer",
        logo: "assets/img/icons/logos/slicer.svg",
        distance: 0.2,
        openingCount: "4:30pm",
        phone: "+1 555 456-7568",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.052477, 38.943951],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Drop",
        logo: "assets/img/icons/logos/drop.svg",
        distance: 2.1,
        openingCount: "7pm",
        phone: "+1 555 456-5659",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.043444, 38.909664],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fresco",
        logo: "assets/img/icons/logos/fresco.svg",
        distance: 0.6,
        openingCount: "6pm",
        phone: "+1 555 456-5659",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.031706, 38.914581],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Hairz",
        logo: "assets/img/icons/logos/hairz.svg",
        distance: 0.3,
        openingCount: "6pm",
        phone: "+1 555 755-3382",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.020945, 38.878241],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Vego LLC",
        logo: "assets/img/icons/logos/vego.svg",
        distance: 0.3,
        openingCount: "9pm",
        phone: "+1 555 456-8984",
        website: "https://huro.cssninja.io",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Memini me adesse meam.",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.007481, 38.876516],
      },
    },
  ],
};

function displayPopup(place) {
  var popup = document.getElementsByClassName("mapboxgl-popup");
  if (popup.length) {
    popup[0].remove();
  }

  map.flyTo({
    center: place.coordinates,
    zoom: 15,
    bearing: 0,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });

  var template = `<div class="map-box-location">
    <div class="map-box-header">
      <div class="media-flex-center">
        <div class="h-avatar is-small">
          <img
            class="avatar"
            src="${place.logo}"
            alt=""
          />
        </div>
        <div class="flex-meta">
          <span>${place.name}</span>
          <span>Open until ${place.openingCount}</span>
        </div>
      </div>
    </div>
    <div class="map-box-body">
      <p>${place.description}</p>
    </div>
  </div>`;

  new mapboxgl.Popup()
    .setLngLat(place.coordinates)
    .setHTML(template)
    .addTo(map);
}

function loadLayers() {
  // Do nothing if source already added
  if (map.getSource("places")) {
    return;
  }
  var storageTheme = window.localStorage.getItem("theme");

  map.addSource("places", {
    type: "geojson",
    data: locations,
  });

  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "circle",
    source: "places",
    paint: {
      "circle-color":
        storageTheme === "dark" ? themeColors.accent : themeColors.primary,
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": storageTheme === "dark" ? "#ddd" : "#fff",
    },
  });

  map.on("click", "places", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
    var logo = e.features[0].properties.logo;
    var name = e.features[0].properties.name;
    var openingCount = e.features[0].properties.openingCount;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    displayPopup({
      coordinates,
      name,
      description,
      logo,
      openingCount,
    });
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "places", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
  });
}

function initMapBox() {
  var mapStyle = "mapbox://styles/mapbox/light-v10";
  var storageTheme = window.localStorage.getItem("theme");
  var token =
    "pk.eyJ1IjoiY3NzbmluamEiLCJhIjoiY2toZW1nYm0zMDAxODJycXFzZ3g4cnZ6diJ9.9ebfrGREuwkauRr_afDTgA";

  if (storageTheme === "dark") {
    mapStyle = "mapbox://styles/mapbox/dark-v10";
  }

  if ($("#mapbox-1").length) {
    mapboxgl.accessToken = token;
    map = new mapboxgl.Map({
      container: "mapbox-1",
      style: mapStyle,
      center: [-77.04, 38.907],
      zoom: 12,
    });

    map.on("styledata", () => {
      var loadingStyles = () => {
        if (!map.isStyleLoaded()) {
          setTimeout(loadingStyles, 1500);
          return;
        }

        loadLayers();
      };
      loadingStyles();
    });

    // Add the control to the map.
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
  }
}

$(function () {
  initMapBox();

  $(".map-box").on("click", function () {
    $(".map-box").removeClass("is-active");
    $(this).addClass("is-active");
    var index = parseInt($(this).attr("data-feature"));

    var coordinates = locations.features[index].geometry.coordinates;
    var name = locations.features[index].properties.name;
    var logo = locations.features[index].properties.logo;
    var openingCount = locations.features[index].properties.openingCount;
    var description = locations.features[index].properties.description;

    displayPopup({
      coordinates,
      name,
      description,
      logo,
      openingCount,
    });
  });

  $(document).on("themeChange", function (e, selectedTheme) {
    if (selectedTheme === "dark") {
      map.setStyle("mapbox://styles/mapbox/dark-v10");
    } else {
      map.setStyle("mapbox://styles/mapbox/light-v10");
    }
  });
});
