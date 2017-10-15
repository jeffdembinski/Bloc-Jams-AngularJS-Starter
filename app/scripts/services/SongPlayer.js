(function() {
  function SongPlayer(Fixtures) {

    /**
    * @desc SongPlayer services object
    * @type {Object} Service using the Factory Recipe
    */
    var SongPlayer= {};

    /**
    * @desc retrieves album object
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

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
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      /**
      * @desc Active song object from list of songs
      * @type {Object}
      */
      SongPlayer.currentSong = song;

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
    * @function getSongIndex
    * @desc finds index of current song
    * @param {Object} song
    * @returns the index of the currently playing song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc A song being played by the player
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc Play current or new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
    } else if (SongPlayer.currentSong === song) {
      if (currentBuzzObject.isPaused()) {
        playSong(song);
      }
    }
  };

    /**
    * @function pause
    * @desc Pause current song
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc retrieves index of song currently playing and subtracts one to provide previous track index
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;

  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();
