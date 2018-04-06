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
        var arrShapes = CONSTANTS.NLP_SHAPES;
        var arrSurfaceArea = CONSTANTS.NLP_SURFACEAREA;
        var arrShapeParams = CONSTANTS.NLP_SHAPESPARAM;
        
        inputString = string;

        console.log(inputString);

        //Flags for parsing
        var isMetric = false;
        var isQuestion = false;
        var isValue = false;
        var isUnit = false;
        var isShape = false;
        var isSurfaceArea = false;
        var isValueExpected = false;
        var isUnitExpected = false;
        var isShapeExpected = false;
        
        //Parse the input string to array
        var parsedInput = inputString.split(" ");
        var computationObject = { output : {}, input : [], shape : null};   

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
                isUnitExpected = true;
                var tempInputValue = parsedInput[i];
            }else if(isQuestion && arrSurfaceArea.indexOf(parsedInput[i].toLowerCase()) >= 0){
               isSurfaceArea = true;
            }else if(isShapeExpected && arrShapes.indexOf(parsedInput[i].toLowerCase()) >=0 ){
                isShape = true;
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
                    
                    let metricUnit;
                    //Fecting the complete unit detail -- BEGIN
                    if(parsedInput[i + 1] == "per" && arrUnits.indexOf(parsedInput[i+2]) >= 0){
                        metricUnit = parsedInput[i] + " " + parsedInput[i+1] + " " + parsedInput[i+2];
                    }else{
                        metricUnit = parsedInput[i];
                    }
                    //Fecting the complete unit detail -- END
                    //Associate the value to input metric -- BEGIN
                    if(tempInputValue !== null){
                        //Handling only numbers without metric
                        if(arrShapeParams.indexOf(parsedInput[i - 2]) >= 0){
                            let inputDetail = {};
                            inputDetail.metric = parsedInput[i - 2];
                            //let inputMetric = computationObject.input.pop();
                            inputDetail.unit = metricUnit;
                            inputDetail.value = tempInputValue;
                            computationObject.input.push(inputDetail);
                        }else{
                            let inputDetail = {};
                            inputDetail.metric = metricUnit;
                            inputDetail.unit = metricUnit;
                            inputDetail.value = tempInputValue;
                            computationObject.input.push(inputDetail);
                        }
                    }else{           
                    let inputMetric = computationObject.input.pop();
                    inputMetric.unit = metricUnit;
                    computationObject.input.push(inputMetric);
                    }
                
                isUnit = false
                isUnitExpected = false;
            }else if(isSurfaceArea){
                //Setting of output metrics -- BEGIN
                computationObject.output.metric = parsedInput[i];
                isQuestion = false;
                isSurfaceArea = false;
                isShapeExpected = true;
                //Setting of output metrics -- END

            }else if(isShape){
                //Setting input metric for shape
                computationObject.shape = parsedInput[i];
                isShape = false;
                isShapeExpected = false;
            }
            //Setting of computationObject-- END
        }
        let compObject = formatComputationalObject(computationObject);
        return compObject;           
    }

    //Format the computational object for math Operation.
    function formatComputationalObject(compObject){
        var formattedObject = {input : {}, output : {}, shape : null};
        formattedObject.output.metric = compObject.output.metric;
        formattedObject.shape = compObject.shape;
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