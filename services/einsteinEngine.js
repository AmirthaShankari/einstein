var CONSTANTS = require('./../constant.js');
var EINSTEIN_NLP = require('./einsteinNLP.js');
var EINSTEIN_SERVICE = (function(){
    
    var obj = {
        "output" : {
            "metric" : "speed"
        },
        "input":{
            "distance" : {
                "value": 60,
                "unit" : "km"
            },
            "time" : {
                "value": 1,
                "unit" : "hours"
            }
        }
    }

    // Step 3: Calculate Result
    var calculateResult = function(computationObj, computationGroup){
       // console.log(computationGroup);
        var formula =  CONSTANTS.FORMULAS[computationGroup].formula[computationObj.output.metric];
       // console.log(computationObj.input);
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
        let missingValues = [];
        let report = {
            "isMissing": [],
            "missingData": {},
            "data": {}
        }
        for (let key in CONSTANTS.FORMULAS) {
            do{
                flag = true;
                for(let i = 0; i < checkList.length; i++){
                    if (CONSTANTS.FORMULAS[key].group.includes(checkList[i])) {
                        result = key;
                    } else {
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    if(CONSTANTS.FORMULAS[key].group.length != checkList.length){
                        missingValues = reportMissingValues(result, checkList);
                        report.isMissing = true;
                        report.missingData = missingValues;
                    } else {
                        report.isMissing = false;
                        report.data = result;
                    }
                }
            }while(!flag);
            console.log("report:");
            console.log(report);
            return report;
        }
    }

    var reportMissingValues = function(key, checkList){
        let missingElements = [];
        CONSTANTS.FORMULAS[key].group.forEach(function(element) {
            if(!checkList.includes(element)){
                missingElements.push(element);
            }
        });
        return missingElements;
    }

    // Step 1A: Convert to Base Metric Input
    var convertToBaseMetric = function(computationObj){
        let output = getMetricGroupName(computationObj.output.metric);
        console.log(output);
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
        var response = {};
        string = "what is the speed of the train if it is travelling at a distance of 10 kilometre in 2 hours";
        
        var computationObj = processInput(string);
        console.log(computationObj);
        computationObj = convertToBaseMetric(computationObj);
        console.log("After Base");
        console.log(computationObj);
        var computationGroup = {};
        var result = findComputationGroup(computationObj);
        response.metadata = result;
        if(!result.isMissing){
            computationGroup = result.data;
            var finalAnswer = calculateResult(computationObj, computationGroup);
            response.answer = finalAnswer;
        }
        return response;
        
    }

    return{
        execute: execute
    }
})();


module.exports = EINSTEIN_SERVICE;