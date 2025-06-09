console.log("Started");

// Get the collapsible button
let currentSongs = new Audio();
let songs;
let currFolder;
let back = document.getElementById("back");
let muteButton = document.getElementById("mute");
let play = document.getElementById("play"); 
let forward = document.getElementById("forward");
let muteIcon = document.getElementById("mute-icon");
let unmuteIcon = document.getElementById("unmute-icon");
var collapsibleButton = document.querySelector(".collapsible");
let muteMessage = document.getElementById("mute-message");
// Get the volume slider element and label
let volumeSlider = document.getElementById("volume-slider");
let volumeLabel = document.getElementById("volume-label");

//For time (perfect)
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Add click event listener
collapsibleButton.addEventListener("click", function () {
  var content = this.previousElementSibling; // Get the corresponding content div
  var arrowIcon = this.querySelector(".arrow"); // Get the SVG arrow icon
  // Toggle content display
  if (content.style.display === "block") {
    content.style.display = "none";
    content.style.maxHeight = "0"; // Collapse content
    arrowIcon.style.transform = "rotate(0deg)"; // Rotate arrow back to the initial position
  } else {
    content.style.display = "block";
    content.style.maxHeight = content.scrollHeight + "px"; // Expand content to its scrollHeight
    arrowIcon.style.transform = "rotate(180deg)"; // Rotate arrow down when expanded
  }
});

//(perfect)
//async function getSongs(folder) {
//  currFolder = folder;
//  let a = await fetch(`/${folder}/`);
  // let response = await a.text();
  // let div = document.createElement("div");
  // div.innerHTML = response;
  // let as = div.getElementsByTagName("a");
  // songs = [];
  // for (let index = 0; index < as.length; index++) {
  //   const element = as[index];
  //   if (element.href.endsWith(".mp3") || element.href.endsWith(".flac")) {
  //     songs.push(element.href.split(`/${folder}/`)[1]);
  //   }
  // }

  // //for  showing all songs in playlists (perfect)
  // let songUL = document
  //   .querySelector(".allsongs")
  //   .getElementsByTagName("ul")[0];
  // songUL.innerHTML = "";
  // for (const song of songs) {
  //   const decodedSongName = decodeURIComponent(song.replaceAll("%20", " "));
  //   songUL.innerHTML =
  //     songUL.innerHTML +
  //     ` 
  //     <li>
  //      <span class="allsongs-pic">
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
  //   <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
  //   <path d="M12 8V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //   <path d="M9 10V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //   <path d="M6 11V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //   <path d="M15 10V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //   <path d="M18 11V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //       </svg>
  //      </span>

  //     <div class="allsongs-name">
  //      ${song.replaceAll("%20", " ")}
  //     </div>
      
  //     <span class="allsongs-playbtn">
  //     <p>
  //     Play Now
  //     </p>
  //      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  //       <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
  //      </svg>
  //     </span>

  //     </li>
  //     `;
  // }


async function getSongs(folder) {
  currFolder = folder;
  let songs = [];
  try {
    // Fetch the JSON manifest instead of trying to fetch the directory
    let response = await fetch(`${folder}/songs.json`);
    let data = await response.json();
    songs = data.songs || [];
  } catch (error) {
    console.error("Could not load song list:", error);
    return [];
  }

  // Render the song list
  let songUL = document.querySelector(".allsongs ul");
  songUL.innerHTML = "";
  for (const song of songs) {
    const decodedSongName = decodeURIComponent(song.replaceAll("%20", " "));
    songUL.innerHTML += `
      <li>
        <span class="allsongs-pic">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <!-- SVG Paths here -->
          </svg>
        </span>
        <div class="allsongs-name">
          ${decodedSongName}
        </div>
        <span class="allsongs-playbtn">
          <p>Play Now</p>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
          </svg>
        </span>
      </li>
    `;
  }

  // Attach event listeners for play
  Array.from(songUL.getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".allsongs-name").innerHTML.trim());
    });
  });

  return songs;
}

  // Event listerner for Playing Each songs
  Array.from(
    document.querySelector(".allsongs").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".allsongs-name").innerHTML);
      playMusic(e.querySelector(".allsongs-name").innerHTML.trim());
    });
  });
  return songs;
}

//For playing song (perfect)
const playMusic = (track, pause = false) => {
  currentSongs.src = `/${currFolder}/` + track;
  if (!pause) {
    currentSongs.play();
    play.src = "SVGs/pause-svgrepo-com.svg";
  }

  document.querySelector(".current-song").innerHTML = decodeURI(track);
  document.querySelector(".song-playtime").innerHTML = "00:00";
};

async function displayAlbums() {
  console.log("displaying albums");
  let a = await fetch(`/Songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let songscard = document.querySelector(".Album-card");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/Songs/") && !e.href.includes(".htaccess")) {
      let folder = e.href.split("/").slice(-2)[1];
      console.log(e.href.split("/").slice(-2)[1]); //change =>[1] if there is any error
      // Get the metadata of the folder
      let a = await fetch(`Songs/${folder}/info.json`);
      let response = await a.json();
      songscard.innerHTML =
        songscard.innerHTML +
        `<span class="Album" data-folder="${folder}">
                                    <div class="songs-img ">
                                        <img src="/Songs/${folder}/cover.jpeg" alt="No">
                                        <div class="play-button">
                                            <button>
                                                <svg data-encore-id="icon" role="img" aria-hidden="true"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="songs-p Apara1">
                                        <p>${response.title}</p>
                                        <p>${response.description}</p>
                                    </div>
                                </span>`;
    }
  }

  // Load the playlist whenever An Album is clicked
  Array.from(document.getElementsByClassName("Album")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
      if (songs.length > 0) {
        playMusic(songs[0]);
      }
    });
  });
}


// like Btn
document.querySelector(".like-button").addEventListener("click", function () {
  // Toggle the 'liked' class to change heart color
  this.classList.toggle("liked");

  // Get the pop-up message
  var message = document.getElementById("liked-message");

  // Change message based on whether the heart is liked or unliked
  if (this.classList.contains("liked")) {
    message.textContent = "liked!";
  } else {
    message.textContent = "unliked!";
  }

  // Show the liked message
  message.classList.add("show");

  // Hide the message after 2 seconds
  setTimeout(function () {
    message.classList.remove("show");
  }, 2000);
});

async function main() {
  // List Of all the songs
  await getSongs("Songs/english");
  await displayAlbums();

  // time update (perfect)
  currentSongs.addEventListener("timeupdate", () => {
    document.querySelector(
      ".song-playtime"
    ).innerHTML = `${secondsToMinutesSeconds(
      currentSongs.currentTime
    )} / ${secondsToMinutesSeconds(currentSongs.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSongs.currentTime / currentSongs.duration) * 100 + "%";
  });

  // Event listerner for play, pause, back  & forward (perfect)
  play.addEventListener("click", () => {
    if (currentSongs.paused) {
      currentSongs.play();
      play.src = "SVGs/pause-svgrepo-com.svg";
    } else {
      currentSongs.pause();
      play.src = "SVGs/play-svgrepo-com.svg";
    }
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSongs.currentTime = (currentSongs.duration * percent) / 100;
  });

  // Add an event listener to previous (perfect)
  back.addEventListener("click", () => {
    currentSongs.pause();
    console.log("back clicked");
    console.log(currentSongs.src);

    let index = songs.indexOf(currentSongs.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  // Add an event listener to next (perfect)
  forward.addEventListener("click", () => {
    currentSongs.pause();
    console.log("forward clicked");

    let index = songs.indexOf(currentSongs.src.split("/").slice(-1)[0]);

    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  // Show the correct icon based on music play state
  currentSongs.addEventListener("play", () => {
    // Show mute icon when music is playing
    muteIcon.style.display = "block";
    unmuteIcon.style.display = "none";
  });
  // Set the initial volume
  currentSongs.volume = volumeSlider.value;

  currentSongs.addEventListener("pause", () => {
    // Show unmute icon when music is paused
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "block";
  });

  // Add event listener to adjust the volume (perfect)
  volumeSlider.addEventListener("input", function () {
    let volume = Math.min(Math.max(volumeSlider.value, 0), 1); // Ensure volume is between 0 and 1
    currentSongs.volume = volume;
    volumeLabel.textContent = Math.round(volume * 100) + "%";

    // Check if volume is 0 and update icons
    if (currentSongs.volume === 0) {
      muteIcon.style.display = "block";
      unmuteIcon.style.display = "none";
      muteMessage.textContent = "Muted"; // Message for muted
    } else {
      muteIcon.style.display = "none";
      unmuteIcon.style.display = "block";
      muteMessage.textContent = "Unmuted"; // Message for unmuted
    }
  });

  // Ensure the correct icon is displayed when the page loads
  if (currentSongs.volume === 0) {
    muteIcon.style.display = "block";
    unmuteIcon.style.display = "none";
  } else {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "block";
  }

  // Toggle mute/unmute when the mute button is clicked
  muteButton.addEventListener("click", function () {
    if (currentSongs.muted) {
      // Unmute the audio
      currentSongs.muted = false;
      // Show unmute icon, hide mute icon
      unmuteIcon.style.display = "block";
      muteIcon.style.display = "none";
      muteMessage.textContent = "Unmuted"; // Message for unmuted
    } else {
      // Mute the audio
      currentSongs.muted = true;
      // Show mute icon, hide unmute icon
      muteIcon.style.display = "block";
      unmuteIcon.style.display = "none";
      muteMessage.textContent = "Muted"; // Message for muted
    }

    // Show the mute/unmute message
    muteMessage.style.display = "block";

    // Hide the message after 2 seconds
    setTimeout(() => {
      muteMessage.style.display = "none";
    }, 2000);
  });
}

function toggleMenu() {
  const menu = document.querySelector(".ham-menu");
  const ham = document.querySelector(".ham");

  menu.classList.toggle("active");
  ham.classList.toggle("active");
}

main();
