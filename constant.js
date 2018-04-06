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
        },
        "pwt" : {
            "group" : ["power", "work", "time"],
            "formula" : {
                "power" : function(input){
                    return input["work"].value/input["time"].value;
                },
                "work" : function(input){
                    return input["power"].value * input["time"].value;
                },
                "time" : function(input){
                    return input["work"].value / input["power"].value;
                }
            }
        }
    },

    NLP_METRICS : ['speed','distance','time'],
    NLP_QUESTIONS : ['what','how',"what's"],
    NLP_UNITS : ['meter','km','sec','seconds','hours','hour','cm'],
    NLP_SHAPES : ['circle','rectangle','square'],
    NLP_SURFACEAREA : ['area','perimeter','circumference'],
    NLP_SHAPESPARAM : ['side','radius','length','width'],
        

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
