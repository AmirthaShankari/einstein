var CONSTANTS = {
    FORMULAS : {
        "sdt" : {
            "group" : ["speed", "distance", "time"],
            "formula" : {
                "speed" : function(input){
                    return input["distance"].value/input["time"].value;
                },
                "distance" : function(input){
                    return input["speed"].value * input["time"].value;
                },
                "time" : function(input){
                    return input["distance"].value / input["speed"].value;
                }
            }
        }
    }
};

module.exports = CONSTANTS;

