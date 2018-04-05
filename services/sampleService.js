var SAMPLE_SERVICE = (function(){

    var getTestData = function(){
        // Your Logic Here
        console.log("Here");
        return "It Works";
    }

    return{
        getTestData: getTestData
    }
})();


module.exports = SAMPLE_SERVICE;