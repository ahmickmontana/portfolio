if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    const audioBtn = document.getElementById('audio-btn');
    const audio = document.querySelector('audio');
  
    audioBtn.addEventListener('click', () => {
        const icon = audioBtn.querySelector('i');
        if (icon.classList.contains('bi-volume-off')) {
            playAudio(audio);
            icon.classList.remove('bi-volume-off');
            icon.classList.add('bi-volume-down');
        } else {
            icon.classList.remove('bi-volume-down');
            icon.classList.add('bi-volume-off');
            if (audio) {
                audio.pause();
            }
        }
    });


  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

});

var playAudio = function(audio) {
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.warn("Autoplay prevented:", error);
      });
    }
}

if (window.location.hash) {
  window.location.href = 'index.html';
}

function toggleTimeline(header) {
  const content = header.nextElementSibling;
  content.classList.toggle('show');
}

// Initialize map only if map exists
const mapElement = document.getElementById('map');

if (mapElement) {

// Initialize map centered roughly on the Philippines to start
const map = L.map('map', {
  zoomControl: false,     // Disable zoom control buttons (+ / -)
  dragging: false,        // Disable dragging (panning)
  scrollWheelZoom: false, // Disable scroll wheel zoom
  doubleClickZoom: false, // Disable double-click zoom
  boxZoom: false,         // Disable box zoom
  keyboard: false,        // Disable keyboard controls
  tap: false,             // Disable tap for mobile
  touchZoom: false        // Disable pinch zoom
}).setView([11.821188818380719, 122.7099777614668], 5);

// Add Esri World Imagery tiles
const Esri_WorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
).addTo(map);

// Map years to coordinates for travel
const travelCoords = {
  1: [11.821188818380719, 122.7099777614668],    // Philippines
  2: [3.1443303635507758, 101.69076231952275], // Kuala Lumpur, Malaysia
  3: [-8.424048167612177, 115.18822279122902], // Bali, Indonesia
  4: [-41.72926210234935, 173.875723805613],   // New Zealand
  5: [22.3223437839987, 114.177124539492],    // Hong Kong
  6: [3.1443303635507758, 101.69076231952275], // Singapore
  7: [36.61563127055176, 139.29399742258812]     // Japan
};

const travelCountries = {
  1: 'Philippines',
  2: 'Malaysia',
  3: 'Indonesia',
  4: 'New Zealand',
  5: 'Hong Kong',
  6: 'Singapore',
  7: 'Japan'
}

const travelDescText = {
  1: 'I was born in the Philippines\' capital city of Manila. Here, I spent most of my younger childhood up until 2014, when we, as a family, decided to move to New Zealand. Occasionally, \
      we would return to the Philippines to visit family and reminisce about the place where my family is originally from.',
  2: 'On September 2012, my family and I went on a trip to Kuala Lumpur, Malaysia. Even though it was only a connecting flight to Indonesia. We spent a day there.',
  3: 'On September 2012, my family and I went on a trip to Denpasar in Bali, Indonesia. There, we enjoyed the sceneries of Bali, and the beaches were quite wonderful.',
  4: 'On July 2014, my family and I went to New Zealand to test the waters. We first settled in Christchurch and later on, we decided that it was a nice and peaceful place to live in and \
      decided to stay there permanently.',
  5: 'On April 2018, my family and I went to Hong Kong. There, we visited famous tourist spots such as the Hong Kong Disneyland, the Hong Kong Ocean Park, and more. Even though our\
      accommodation wasn\'t truly the best, we still enjoyed our stay there.',
  6: 'On October 2025, my mother and I spent a day in Singapore as a connecting stop before heading to Japan. We enjoyed the scenery, the warm atmosphere, and even visited parts of the Marina Bay\
      - I also visited the 2025 Singapore Grand Prix had taken place just two weeks earlier.',
  7: 'On October and November 2025, my mother and I travelled to Japan. We started in Osaka and made our way through Kyoto and Nara before finishing in Tokyo. We had an amazing time exploring temples,\
  shrines, and shopping streets - and of course, we enjoyed the incredibly delicious, authentic Japanese food there.'
}


// Connect the scrollbar input with the map movement
const yearScroll = document.getElementById('yearScroll');

yearScroll.addEventListener('input', (event) => {
  const year = event.target.value;
  const countryName = document.getElementById('country').querySelector('b');
  const travelDesc = document.getElementById('travelDesc');

  if (travelCoords[year]) {
    map.flyTo(travelCoords[year], 5, {
      animate: true,
      duration: 2,         // seconds (adjust as needed)
      easeLinearity: 0.25  // controls the smoothness
    });

    countryName.textContent = travelCountries[year];
    travelDesc.textContent = travelDescText[year];
  }
});

document.addEventListener('DOMContentLoaded', () => {
    map.invalidateSize();
});

}
