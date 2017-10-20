(function() {
  function SongPlayer($rootScope, Fixtures) {

    /**
    * @desc SongPlayer services object
    * @type {Object} Service using the Factory Recipe
    */
    var SongPlayer= {};


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

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };


    /**
    * @function playSong
    * @desc plays current song and sets playing state to true
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };


    /**
    * @function stopSong
    * @desc stops current song and sets playing state to false
    * @param {Object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };


    /**
    * @function getSongIndex
    * @desc finds index of current song
    * @param {Object} song
    * @returns the index of the currently playing song
    */
    var getSongIndex = function(song) {
      return SongPlayer.currentAlbum.songs.indexOf(song);
    };


    /**
    * @desc retrieves album object
    * @type {Object}
    */
     SongPlayer.currentAlbum = Fixtures.getAlbum();


    /**
    * @desc A song being played by the player
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of the currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;


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
      stopSong(song);
    };


    /**
    * @function previous
    * @desc makes player skip to previous song in song list
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };


    /**
    * @function next
    * @desc makes player skip to next song in song list
    */
     SongPlayer.next = function ()  {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;

       if (currentSongIndex >= SongPlayer.currentAlbum.songs.length) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else {
         var song = SongPlayer.currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };

     /**
     * @func setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
       if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
       }
     };

    return SongPlayer;

  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();
