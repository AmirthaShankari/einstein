var einstein = angular.module('einstein',[])
.controller('einsteinController',function($scope, $http){
    $scope.test = "test";
    $scope.isRecord = false;

    // START :: Speech recognition code
    $scope.recognition = {};
    $scope.search = {};
    if (!('webkitSpeechRecognition' in window)) {
      console.log("No available");
      $scope.errorMsg = "Sorry, voice search is not available in this device. Try in another device. Go ahead and try the text search";
    } else {
      console.log("Yes available");
      $scope.recognition = new webkitSpeechRecognition();
      $scope.recognition.continuous = true;
      $scope.recognition.interimResults = true;

      $scope.recognition.onstart = function() {
        console.log("started");
      }
      $scope.recognition.onresult = function(event) {
        var interim_transcript = final_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        final_transcript = final_transcript;
        $scope.search.data = interim_transcript;
        $scope.search.data = final_transcript;
        console.log(interim_transcript);
        console.log(final_transcript);
        $scope.$apply();
        if(final_transcript){
            processData();
            console.log("Ended");
        }

      }
      $scope.recognition.onerror = function(event) {}
      $scope.recognition.onend = function() {
          console.log("Ended");
      }
    }
    // END :: Speech recognition code

    $scope.startRecognition = function(){
      console.log("Here");
      $scope.isRecord = true;
      $scope.recognition.start();
    }

    /**
    * Function to Process Data
    */
    function processData(){
        $http({
            method: "POST",
            url: "http://localhost:5000/execute",
            data: {
              "q" : "Hello"
            }
        }).
        then(function(result) {
            r = result;
        }, function(err){
           console.log(err);
        })
    }

});
