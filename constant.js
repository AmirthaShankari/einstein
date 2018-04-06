var CONSTANTS = {
    FORMULAS : {
        "sdt" : {
            "group" : ["speed", "distance", "time"],
            "formula" : {
                "speed" : function(input, output){
                    return input["distance"].value/input["time"].value + " " + output.unit;
                },
                "distance" : function(input, output){
                    return input["speed"].value * input["time"].value + " " + output.unit;
                },
                "time" : function(input, output){
                    return input["distance"].value / input["speed"].value + " " + output.unit;
                }
            }
        },
        "pwt" : {
            "group" : ["power", "work", "time"],
            "formula" : {
                "power" : function(input, output){
                    return input["work"].value/input["time"].value + " " + output.unit;
                },
                "work" : function(input){
                    return input["power"].value * input["time"].value + " " + output.unit;
                },
                "time" : function(input){
                    return input["work"].value / input["power"].value + " " + output.unit;
                }
            }
        }
    },

    NLP_METRICS : ['speed','distance','time'],
    NLP_QUESTIONS : ["what","how","what's"],
    NLP_UNITS : ['meter','km','sec','seconds','hours','hour'],
        

    METRIC_GROUP : {
        "distance": ["meter", "km", "miles"],
        "speed": ["km per hour", "meter per second", "knots"],
        "time": ["seconds", "minutes", "hours"],
    },

    METRIC_CONVERTION : {
        "distance": {
            "base": "km",
            "convertions": {
                "meter": function(value){
                    return value*0.001;
                },
                "miles": function(value){
                    return value*1.60934;
                }
            }
        },
        "speed": {
            "base": "km per hour",
            "convertions": {
                "meter per second": function(value){
                    return value*3.6;
                },
                "knots": function(value){
                    return value*1.852;
                }
            }
        },
        "time": {
            "base": "hours",
            "convertions": {
                "minutes": function(value){
                    return value * 0.0166667;
                },
                "seconds": function(value){
                    return value * 0.000277778;
                }
            }
        }
    }
};

module.exports = CONSTANTS;
