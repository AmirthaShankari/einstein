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
        document.getElementById("question").innerHTML = interim_transcript;
        $scope.search.data = final_transcript;
        console.log(interim_transcript);
        console.log(final_transcript);
        $scope.$apply();
        if(final_transcript){
            document.getElementById("question").innerHTML = final_transcript;
            $scope.processData();
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
    $scope.processData = function(){
        // $scope.search.data = "what is the speed taken to cover a distance of 200 km";
        $http({
            method: "POST",
            url: "http://localhost:5000/execute",
            data: {
              "q" : $scope.search.data
            }
        }).
        then(function(result) {
            var speechMsg;
            $scope.search.result = result.data;
            if($scope.search.result.metadata.isMissing == true){
              speechMsg = "Please input ";
              for(let i = 0 ; i < $scope.search.result.metadata.missingData.length ; i++){
                speechMsg += $scope.search.result.metadata.missingData[i] + " ";
              }
            }
            if($scope.search.result.answer){
              speechMsg = $scope.search.result.answer;
            }
            console.log(msg);
            var msg = new SpeechSynthesisUtterance(speechMsg);
            window.speechSynthesis.speak(msg);
        }, function(err){
           console.log(err);
        })
    }

    $scope.testData = function(){
        $scope.search.data = "what is the speed taken to cover a distance of 200 km in time of 2 hours";
        $scope.processData();
    }
    
});
