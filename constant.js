var CONSTANTS = {
    FORMULAS : {
        "sdt" : {
            "group" : ["speed", "distance", "time"],
            "formula" : {
                "speed" : function(input, output){
                    return Number(input["distance"].value/input["time"].value).toFixed(2) + " " + output.unit;
                },
                "distance" : function(input, output){
                    return Number(input["speed"].value * input["time"].value).toFixed(2) + " " + output.unit;
                },
                "time" : function(input, output){
                    return Number(input["distance"].value / input["speed"].value).toFixed(2) + " " + output.unit;
                }
            }
        },
        "pvc" : {
            "group" : ["power", "voltage", "current"],
            "formula" : {
                "power" : function(input, output){
                    return Number(input["voltage"].value * input["current"].value).toFixed(2) + " " + output.unit;
                },
                "voltage" : function(input, output){
                    return Number(input["power"].value / input["current"].value).toFixed(2) + " " + output.unit;
                },
                "current" : function(input, output){
                    return Number(input["power"].value / input["voltage"].value).toFixed(2) + " " + output.unit;
                }
            }
        }
    },

    NLP_METRICS : ['speed','distance','time','power','voltage','current'],
    NLP_QUESTIONS : ['what','how',"what's"],
    NLP_UNITS : ['mtr','km','sec','seconds','hr','minutes','cm','volt','amps'],
    NLP_SHAPES : ['circle','rectangle','square'],
    NLP_SURFACEAREA : ['area','perimeter','circumference'],
    NLP_SHAPESPARAM : ['side','radius','length','width'],
    NLP_BASEUNITS : {
        "km": ["kilometre", "kilometer","kilometres", "kilometers"],
        "mtr": ["metre","meter","meters","metres"],
        "hr": ["hour", "hours"],
        "minutes": ["minute"],
        "seconds": ["sec","second"],
        "cm" : ["cms","centimeter","centimetres","centimeters"],
        "volt" : ['volts'],
        "amps" : ['ampere','amp','amperes'],
        "watt": ['watts']
    },    

    METRIC_GROUP : {
        "distance": ["mtr", "km", "miles"],
        "speed": ["km per hour", "mtr per second", "knots"],
        "time": ["seconds", "minutes", "hr"],
        'power': ["watt"],
        'voltage': ["volt"],
        'current': ["amps"]
    },

    METRIC_CONVERTION : {
        "distance": {
            "base": "km",
            "convertions": {
                "mtr": function(value){
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
                "mtr per second": function(value){
                    return value*3.6;
                },
                "knots": function(value){
                    return value*1.852;
                }
            }
        },
        "time": {
            "base": "hr",
            "convertions": {
                "minutes": function(value){
                    return value * 0.0166667;
                },
                "seconds": function(value){
                    return value * 0.000277778;
                }
            }
        },
        "power": {
            "base": "watt",
            "convertions": {}
        },
        "voltage": {
            "base": "volt",
            "convertions": {}
        },
        "current": {
            "base": "amps",
            "convertions": {}
        }
    }
};

module.exports = CONSTANTS;
