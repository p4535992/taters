//console.log("Loading rulGen");
var rule_set = rule_set || {};
var rulGenerator = (function( options ) {
    var debugCode = true;
    
    if (!Math.hasOwnProperty("seedrandom")) {
        // Does not exist, load it.
        return { error: "Load Failed - missing seedrandom library" };
    }
    

    // Establish our default settings
    var settings = $.extend({
            race        : '',
            profession  : '',
          
        }, options);
    
        // since javascript does not support POSIX character classes, 
    // we'll need our own version of [:punct:]
    var punct='\\['+ '\\!'+ '\\"'+ '\\#'+ '\\$'+   
          '\\%'+ '\\&'+ '\\\''+ '\\('+ '\\)'+  
          '\\*'+ '\\+'+ '\\,'+ '\\\\'+ '\\-'+  
          '\\.'+ '\\/'+ '\\:'+ '\\;'+ '\\<'+   
          '\\='+ '\\>'+ '\\?'+ '\\@'+ '\\['+
          '\\]'+ '\\^'+ '\\_'+ '\\`'+ '\\{'+
          '\\|'+ '\\}'+ '\\~'+ '\\]';
    
    // Expression for breaking into tokens.
    var tokenExp=new RegExp(     
       '\\s*'+            // discard possible leading whitespace
       '('+               // start capture group
         '\\.{3}'+            // ellipsis (must appear before punct)
       '|'+               // alternator
         '\\w+\\-\\w+'+       // hyphenated words (must appear before punct)
       '|'+               // alternator
         '\\w+\'(?:\\w+)?'+   // compound words (must appear before punct)
       '|'+               // alternator
         '\\w+'+              // other words
       '|'+               // alternator
         '['+punct+']'+        // punct
       ')'                // end capture group
     );
   
    // Number Expression
    var numberExp = /^\d+$/;   


    // generateRul - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Issue with IE and default value
    //function generateRul(requiredRule, optionalRuleSet = rule_set) {
    function generateRul(requiredRule, optionalRuleSet) {
        var result="";
        var optionalRuleSet = optionalRuleSet || rule_set;
        
        //console.log("RequiredRule:" + requiredRule);
        
        //Problem with IE
        //if (requiredRule in optionalRuleSet) {
        if (typeof(optionalRuleSet) === 'object') {
            if (optionalRuleSet.hasOwnProperty(requiredRule)) {
                var resultVal;
                resultVal = optionalRuleSet[requiredRule].randomElement();
                //console.log("selected rule:" + resultVal);
                
                //console.log("RRE:" + requiredRule, optionalRuleSet);
                //console.log("Result Value:" + resultVal);
                //console.log(resultVal.split(tokenExp));
                if (typeof(resultVal) === 'string') {
                    //console.log("attempting to parse:" + resultVal);
                    result = parseResultSet({ resultGroup: grep(resultVal.split(tokenExp)), rulSet: optionalRuleSet});
                } else {
                    //console.log("coud not parse");
                    //console.log(resultVal);
                    result = "COULD NOT PARSE";
                }
            } else {
                console.log("Not a rule");
            }
            
        } else {
            console.log("Rule set not defined");
        }
        
        //console.log("Should have result:" + result);
        if (typeof(result) === 'string') {
            result = result.replace("( ", "(");
            result = result.replace(" )", ")");
            result = result.replace(" s ", "s ");
            result = result.replace(" ,", ",");
            result = result.replace(" ,", ",");
            result = result.replace(" .", ".");
            result = result.replace('\" ', '\"');
            result = result.replace("with with", "with");
        } else {
            //console.log("RESULT IS not a string:" + requiredRule);
            //console.log(result);
            result = "";
        }
        return result;
    };
    

    function parseResultSet(resultsSet) {
        var result="";
        var optionalInclude = 0;
        var currentInclude = 0;
        var startExpression = 0;
        var expressionValue = 0;
        var addValue = 0;
        var subtractValue = 0;
        
        console.log(resultsSet);
        //ie not supported
        //resultsSet.resultGroup.forEach(function(element) {
        for (var elementIndex = 0; elementIndex < resultsSet.resultGroup.length; elementIndex++) {
            var element = resultsSet.resultGroup[elementIndex];
            //console.log(element);
            //console.log(elementIndex);
            //console.log(resultsSet.resultGroup.length);
            
            if (debugCode) {
                $("#genValues").append(element + "<hr>");
            }
            // Check to see if start of Optional Element
            if (element == "[") {
                optionalInclude++;
                //console.log("Optional Element:" + optionalInclude);
                if (optional()) {
                    currentInclude++;
                    //console.log("Including current:" + currentInclude);
                }
                continue; // return foreach
            }
            
            if (element == "]") {
                if (currentInclude == optionalInclude) {
                    currentInclude--;
                }
                optionalInclude--;
                continue; // return foreach
            }
            
            if (currentInclude != optionalInclude) {
                continue;
            }
            if (element == "{") {
                //console.log("start exp");
                startExpression++;
                continue; // return foreach
            }
            if (element == "}") {
                //console.log("end exp:" + expressionValue);
                result += expressionValue;
                startExpression--;
                continue; // return foreach
            }
            if (startExpression > 0) {
                if (element.indexOf("d") >=0) {
                    expressionValue = roll(element);
                    //console.log("Val:" + expressionValue);
                    continue; // return foreach
                }
                if (element = "+") {
                    addValue++;
                    continue; // return foreach
                }
                if (element = "-") {
                    subtractValue++;
                    continue; // return foreach
                }
                if ((subtractValue > 0) && (numberExp.match(element))) {
                    expressionValue -= element;
                    subtractValue--;
                    continue; // return foreach
                } 
            }
    
            // Check to see if element in set
            //console.log(rule_set);
            if (element in rule_set) {
                result+=generateRul(element);
            } else {
                result += element + " ";
            }
        };
        //console.log(result);
        return result;
    };
    
    
    // grep(ary[,filt]) - filters an array
    //   note: could use jQuery.grep() instead
    // @param {Array}    ary    array of members to filter
    // @param {Function} filt   function to test truthiness of member,
    //   if omitted, "function(member){ if(member) return member; }" is assumed
    // @returns {Array}  all members of ary where result of filter is truthy
    function grep (ary,filt) {
      var result=[];
      for(var i=0, len=ary.length; i<len; i++) {
        var member=ary[i]||'';
        if(filt && (typeof filt === 'Function') ? filt(member) : member) {
            //console.log(member);
          result.push(member);
        }
      }
      return result;
    };
    
    function optional() {
        if (Math.floor((Math.random() * 100) + 1) > 50) {
            return true;
        }
        
        return false;
    }
    
    function checkIfObjectIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
    
    // Return object with exposed methods.
    return {
        generateRul: generateRul
    }    
    
})(); // end rulGen