var CONSTANTS = require('./../constant.js');
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
        var newComputationObj = {};
        return newComputationObj;
    }

    // Step 1: Process Input
    var processInput = function(string){

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