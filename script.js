//window.open("https://accounts.spotify.com/api/token?
//grant_type=authorization_code&code="+code+"&redirect_uri=myurl&client_id=2653d8e52ebe4a04a67eac667f82807c
//&client_secret=cdc9a8637a0144e08a6445400e3d60b7 ");

//grant_type=client_credentials&client_id={{2653d8e52ebe4a04a67eac667f82807c}}&client_secret={{cdc9a8637a0144e08a6445400e3d60b7}}



// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [

{
	name: "Anbil Avan",
	artist: "AR Rahman",
	image: "https://t2.genius.com/unsafe/439x439/https%3A%2F%2Fimages.genius.com%2F692c4ac344daebf0d2c0cb192ea3cb6c.1000x1000x1.jpg",
	path: "https://ia601006.us.archive.org/32/items/1234_20190926_201909/Anbil%20Avan.ogg",
},
{
	name: "Evano oruvan",
	artist: "AR Rahman",
	image: "https://shdbdcdnems01.cdnsrv.jio.com/c.saavncdn.com/517/Alaipayuthey-Tamil-2000-500x500.jpg",
	path: "https://ia800101.us.archive.org/0/items/tmlmvsngs/Evano-Oruvan-Vasikiran.ogg",
},
{
  name:"Thalli Pogadhey",
  artist: "AR Rahman",
  image: "https://masstamilan.biz/wp-content/uploads/2019/12/Thalli-Pogathey.jpg",
  path:"https://ia601006.us.archive.org/32/items/1234_20190926_201909/Thalli%20Pogathey.ogg",
},
{
  name:"Munbe vaa",
  artist: "AR Rahman",
  image: "https://i.pinimg.com/originals/d5/07/ea/d507ea21b97a5d0c008efbbf8defb455.jpg",
  path:"https://ia803206.us.archive.org/22/items/TamilLatestLoveSongs_201610/Munbe%20vaa%20en%20anbe%20vaa.ogg",
},
{
  name:"NewYork Nagaram",
  artist: "AR Rahman",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkBEErTe0HVCG_7I0x8KivFpxd3cYKAN-sw&usqp=CAU",
  path:"https://ia800909.us.archive.org/0/items/NewYorkNagaramSillunuOruKadhal/New%20York%20Nagaram%20-%20Sillunu%20Oru%20Kadhal.ogg",
},
];
function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Load the first track in the tracklist
loadTrack(track_index);
  
/*var request = require('request'); // "Request" library

var client_id = '2653d8e52ebe4a04a67eac667f82807c'; // Your client id
var client_secret = 'cdc9a8637a0144e08a6445400e3d60b7 '; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type=authorization_code&code="+code+"&redirect_uri=myurl&client_id=2653d8e52ebe4a04a67eac667f82807c
    &client_secret=cdc9a8637a0144e08a6445400e3d60b7);
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});*/