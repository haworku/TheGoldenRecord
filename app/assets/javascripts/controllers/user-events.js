function setUserEvents(mix){
  startAndStopTrack(mix)
  pauseMix(mix);
  dropTrack(mix);

  //Put in deck user event file
  changeTrackVolume(mix);

};

function dropTrack(mix){
  $(".cell").droppable({
    accept: ".draggableTrack",
    drop: function(event, ui) {
      var draggable = ui.draggable.clone();
      // console.log("The track with " + draggable.attr("url") + "  ---- " + draggable.attr("id"));
      var trackId = Number(draggable.attr("id"));
      var image = draggable.attr("image");
      var divId = Number($(this).attr("id"));
      var trackAdded = {src: draggable.attr("url"), id: trackId, name: draggable.html()}
      sounds.push(trackAdded);
      loadSound(mix, trackId, divId);
      loadImage(image, $(this));
      draggableImage();
      removeFromMixer(trackId);
      addToDeck();
    }
  });
}

function returnDivs() {
   return $('div.cell')
  };

function startAndStopTrack(mix) {

  // ON CLICK - PLAY AND STOP
  returnDivs().on('click', function(e) {
    e.preventDefault();

    var $targetDiv   = $(this)
    var soundId = $targetDiv.attr("id")

    $targetDiv.toggleClass('active');

    if($targetDiv.hasClass('active')){
      // IF HTML HAS CLASS "ACTIVE", PLAY SOUND
      var targetSound = _.find(mix.wads, function(wad) { return wad.label === Number(soundId) })
      targetSound.play();
      // targetSound.addEventListener("complete", noLongerActive) -- this is for making sounds that have stopped remove class "active"
    }else{
      //IF HTML DOESN'T HAVE CLASS "ACTIVE", STOP SOUND
      var targetSound = _.find(mix.wads, function(wad) { return wad.label === Number(soundId) })
      targetSound.stop();
    };
  });
}


function pauseMix(mix) {
  // console.log( "running pause");
 $(window).on('keyup', function(e) {
  // console.log( "In Keyup");

    e.preventDefault();
    if(e.keyCode == 32) {

      if(Wad.audioContext.state === "suspended"){
        // IF AUDIO HAS STATE PAUSED: TRUE, RESUME SOUND
        $('div.active').removeClass('paused')
        console.log("Paused: TRUE; Resuming Sound")
        Wad.audioContext.resume();

      }else{
        // IF AUDIO HAS STATE PAUSED: FALSE, SUSPEND SOUND
        $('div.active').addClass('paused')
        console.log("Paused: FALSE; Suspending Sound")
        Wad.audioContext.suspend();
      };
    };
  });
}

function changeTrackVolume(mix) {
  $(window).on("keyup", function(event) {
    event.preventDefault();

    var $targetDiv   = $("div.on-deck")
    var soundId = $targetDiv.attr("id")

    var targetSound = _.find(mix.wads, function(wad) { return wad.label === Number(soundId) })

    if(event.keyCode == 38 && targetSound.volume < 4) {
      // increase volume
      console.log("Increase Volume")
      // targetSound.setVolume(targetSound.volume + .5)
      targetSound.defaultVolume = 4
      Wad.nodes.push
    } else if (event.keyCode == 40 && targetSound.volume > 1) {
      // decrease volume
      console.log("Decrease Volume")
      targetSound.setVolume(targetSound.volume - .5)
    }

  });
}

function removeFromMixer(trackId) {
  $(".cell").on("click", ".boxclose", function() {
    var cell = $(this).parent();
    sounds = _.reject(sounds, function(sound){
      return sound.id === trackId;
    });
    cell.removeClass("on-deck");
    $(cell.children("p")).remove();
    $(cell.children("img")).remove();
    $(cell.children(".boxclose")).remove();
  });
}

// ON DRAG -LOAD AND REMOVE FILES FROM MIXER
function addToMixer(){
// when dragged to mixer, load sound and assign to div
// loadSound(activeMix, trackId, divId)
};

function addToDeck(){
// when dragged to deck, enable effects
// only one item on Deck at a time
// if there is a track there already
// replace it
};





function noLongerActive(sound) {
// a function that removes the class "active" when a track finishes playing on its own
}




