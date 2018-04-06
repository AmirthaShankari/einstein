var CONSTANTS = require('./../constant.js');

var EINSTEIN_NLP = (function(){
    /**
     * parse
     * @param {*} string 
     */
    function parse(string){
        var arrMetrics = CONSTANTS.NLP_METRICS;
        var arrQuestions = CONSTANTS.NLP_QUESTIONS;
        var arrUnits = CONSTANTS.NLP_UNITS;
        
        inputString = string;

        console.log(inputString);

        //Flags for parsing
        var isMetric = false;
        var isQuestion = false;
        var isValueExpected = false;
        var isUnitExpected = false;
        var isValue = false;
        var isUnit = false;
        
        //Parse the input string to array
        var parsedInput = inputString.split(" ");
        var computationObject = { output : {},input : []};   

        //Parse the input array - BEGIN
        for(let i = 0; i < parsedInput.length; i++){
            //Setting of flags -- BEGIN
            if(arrQuestions.indexOf(parsedInput[i].toLowerCase()) >= 0){
                //Look for what needs to be found - question flag set
                isQuestion = true;
            }else if(arrMetrics.indexOf(parsedInput[i].toLowerCase()) >= 0){
                //Look for Metrics
                isMetric = true;
            }else if(isValueExpected && !isNaN(parseFloat(parsedInput[i])) && isFinite(parsedInput[i])){
                //Look for input value
                isValue = true;
            }else if((isUnitExpected && arrUnits.indexOf(parsedInput[i].toLowerCase()) >= 0)){
                //Look for unit
                isUnit = true;
            }else if(!isNaN(parseFloat(parsedInput[i])) && isFinite(parsedInput[i])){
                console.log(parsedInput[i]);
                isUnitExpected = true;
                var tempInputValue = parsedInput[i];
            }else{
                continue;
            }
            //Setting of flags -- END
            //Setting of computationObject -- BEGIN
            if(isQuestion && isMetric){
                //Setting of output metrics -- BEGIN
                computationObject.output.metric = parsedInput[i];
                isQuestion = false;
                isMetric = false;
                //Setting of output metrics -- END
            }else if(isMetric){
                //Setting of input metric details -- BEGIN
                let inputDetail = {};
                inputDetail.metric = parsedInput[i];
                isMetric = false;
                isValueExpected = true;
                
                if(tempInputValue !== undefined || tempInputValue !== null){

                   //  console.log(parsedInput[i]);
                    inputDetail.unit = parsedInput[i];
                    inputDetail.value = tempInputValue;
                    tempInputValue = null;
                    isMetric = false;

                }
                computationObject.input.push(inputDetail);
                //Setting of input metric details -- END
            }else if(isValue){
                //Associate the value to input metric -- BEGIN
                let inputMetric = computationObject.input.pop();
                inputMetric.value = parsedInput[i];
                computationObject.input.push(inputMetric);
                isValue = false;
                isValueExpected = false;
                isUnitExpected = true;
                //Associate the value to input metric -- END
            }else if(isUnit){
                    //Associate the value to input metric -- BEGIN
                    if(tempInputValue !== null){
                    //Handling only numbers without metric
                    // console.log("entering" + tempInputValue) ;
                    let inputDetail = {};
                    inputDetail.metric = parsedInput[i];
                    inputDetail.unit = parsedInput[i];
                    inputDetail.value = tempInputValue;
                    computationObject.input.push(inputDetail);

                    }else{
                    let inputMetric = computationObject.input.pop();
                    inputMetric.unit = parsedInput[i];
                    computationObject.input.push(inputMetric);
                    }
                
                isUnit = false
                isUnitExpected = false;
            }
            //Setting of computationObject-- END
        }
        let compObject = formatComputationalObject(computationObject);
        return compObject;           
    }

    function formatComputationalObject(compObject){
        var formattedObject = {input : {}, output : {}};
         formattedObject.output.metric = compObject.output.metric;
         for(let i = 0; i < compObject.input.length; i++){
             let metricDetail = compObject.input[i];
             formattedObject.input[metricDetail.metric] = {
                 "unit" : metricDetail.unit,
                 "value" : metricDetail.value
             }
         }
         return formattedObject;
    }
    
    return{
        parse: parse
    }
})();


module.exports = EINSTEIN_NLP;