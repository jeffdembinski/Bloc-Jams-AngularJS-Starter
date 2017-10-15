(function() {
  /**
  * @function SongPlayer()
  * @desc Creates the SongPlayer service and its methods using Factory Recipe
  */
  function SongPlayer() {
    /**
    * @desc SongPlayer services object
    * @type Service using the Factory Recipe
    */
    var SongPlayer= {};

    /**
    * @desc A song being played by the player
    * @type {Object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio files as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;

    };
    /**
    * @function playSong
    * @desc private function to play `song` and sets the `currentSong.playing = true`
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function SongPlayer.play
    * @desc a public method of the SongPlayer factory object that plays a new or paused song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
    } else if (currentSong === song) {
      if (currentBuzzObject.isPaused()) {
        playSong(song);
      }
    }
  };

    /**
    * @function SongPlayer.pause
    * a public method of the SongPlayer factory object that pauses currently playing song
    * @param {Object} song
    */

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;

  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);

})();
