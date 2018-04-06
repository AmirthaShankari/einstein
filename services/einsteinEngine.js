var CONSTANTS = require('./../constant.js');
var EINSTEIN_NLP = require('./einsteinNLP.js');
var EINSTEIN_SERVICE = (function(){
    
    var obj = {
        "output" : {
            "metric" : "speed",
            "unit" : "kmph"
        },
        "input":{
            "distance" : {
                "value": 50,
                "unit" : "km"
            },
            "time" : {
                "value": 2,
                "unit" : "hr"
            }
        }
    }

    // Step 3: Calculate Result
    var calculateResult = function(computationObj, computationGroup){
        var formula =  CONSTANTS.FORMULAS[computationGroup].formula[computationObj.output.metric];
        console.log(computationObj.input);
        console.log(formula);
        return formula(computationObj.input)
    }

    // Step 2: Find Computation Group
    var findComputationGroup = function(obj){
        let checkList = [];
        checkList.push(obj.output.metric);
        for (let k in obj.input) {
            checkList.push(k);
        }
        let flag = true;
        let result = "";
        for (let key in CONSTANTS.FORMULAS) {
            checkList.forEach(function(element) { 
                if (CONSTANTS.FORMULAS[key].group.includes(element)) {
                    result = key;
                }else{
                    flag = false;
                }
            });
        }
        if(flag){
            return result;
        }
    }

    // Step 1A: Convert to Base Metric Input
    var convertToBaseMetric = function(computationObj){
        let output = getMetricGroupName(computationObj.output.metric)
        let newComputationObj = {
            "output": {
                "metric" : output,
                "unit" : CONSTANTS.METRIC_CONVERTION[output].base
            },
            "input": {}
        };
        for (let key in computationObj.input) {
            let input = getMetricGroupName(key);
            let unit = computationObj.input[key].unit;
            let val = computationObj.input[key].value;
            if(CONSTANTS.METRIC_CONVERTION[input].base != unit) {
                let valueFunction = CONSTANTS.METRIC_CONVERTION[input].convertions[unit];
                val = valueFunction(computationObj.input[key].value);
            }
            newComputationObj.input[input] = {
                "value": val,
                "unit" : CONSTANTS.METRIC_CONVERTION[input].base
            }
        }
        return newComputationObj;
    }
    // Traverse and obtain the metric group name
    var getMetricGroupName = function(val){
        for (var key in CONSTANTS.METRIC_GROUP) {
            if(key == val || CONSTANTS.METRIC_GROUP[key].includes(val)){
                return key;
            }
        }
    }

    // Step 1: Process Input
    var processInput = function(string){
        return EINSTEIN_NLP.parse(string);
    }

    // Step 0: Execute
    var execute = function(string){
        var computationObj = obj;
        // var computationObj = processInput(string);
        // computationObj = convertToBaseMetric(computationObj)
        var computationGroup = findComputationGroup(computationObj);
        var result = calculateResult(computationObj, computationGroup);
        console.log(result);
    }

    return{
        execute: execute
    }
})();


module.exports = EINSTEIN_SERVICE;