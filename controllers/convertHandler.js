function ConvertHandler() {
  this.validateInput = (input) => {
    /** 
     * no exponents
     * no addition
     * no subtraction
     * simple division (fraction-like) ok
     * no multi-step division (1/2/3)
     * Only L, kg, km, mi, lbs, gal handled at this time. More can be added.
    */
    if ( input === '' ){
      return {
        valid: false,
        message: 'invalid unit'
      };
    }
    
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    
    let validation = {};
    
    if(initNum === 'invalid number' || initUnit === 'invalid unit'){
      validation.valid=false;
      
      if(initNum === 'invalid number' && initUnit === 'invalid unit'){
        validation.message='invalid number and unit';
      } else if(initNum === 'invalid number'){
        validation.message='invalid number';
      } else if(initUnit === 'invalid unit'){
        validation.message='invalid unit';
      }
    } else {
      validation = {
        valid: true, 
        initNum, 
        initUnit
      };
    }

    return validation;
  };

  this.getConversionOutput = (input) => {
    const validatedInput = this.validateInput(input);
    if (validatedInput.valid){
      const { initNum, initUnit } = validatedInput;
      const returnUnit = this.getReturnUnit(initUnit);
      const returnNum = this.convert(initNum, initUnit);
      return {
        outType: 'json',
        output: {
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string: this.getString(initNum, initUnit, returnNum, returnUnit)
        }
      };
    } else {
      return {
        output: validatedInput.message,
        outType: 'text'
      }
    }

  }
  
  this.charCount = s => {
    const obj = {};
    for (const char of s) {
      obj[char] = (obj[char] || 0) + 1;
    }
    return obj;
  };
  
  this.getNum = function(input) {
    const parsedInput = input.replace(/[a-z]+$/i, '');
    if( parsedInput === ''){ return 1;}
    const charCounts = this.charCount(parsedInput);
    if (
      charCounts["/"] > 1 ||
      charCounts["."] > 2 ||
      /[^\d\.\/]+/.test(parsedInput)
    ){
      return "invalid number";
    }
    const splits = parsedInput.split('/');
    if ( splits.length > 2 ){ return 'invalid'; }
    if( splits.length === 1){
      if ( isNaN(splits[0]) ){ return 'invalid number';}
      return parseFloat(splits[0]);
    }
    if( splits.length === 2){
      if( isNaN(splits[0]) || isNaN(splits[1]) ){ return 'invalid number'}
      return parseFloat(splits[0]) / parseFloat(splits[1]);
    }
    return 'invalid number';
  };
  
  this.getUnit = function(input) {
    const parsedUnit = input.match(/[a-z]+$/i)
    switch(true){
      case /^km$/i.test(parsedUnit) : return 'km';
      case /^mi$/i.test(parsedUnit) : return 'mi';
      case /^lbs$/i.test(parsedUnit) : return 'lbs';
      case /^kg$/i.test(parsedUnit) : return 'kg';
      case /^gal$/i.test(parsedUnit) : return 'gal';
      case /^l$/i.test(parsedUnit) : return 'L';
      default: return 'invalid unit';
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(true){
      case /^km$/i.test(initUnit) : return 'mi';
      case /^mi$/i.test(initUnit) : return 'km';
      case /^lbs$/i.test(initUnit) : return 'kg';
      case /^kg$/i.test(initUnit) : return 'lbs';
      case /^gal$/i.test(initUnit) : return 'L';
      case /^l$/i.test(initUnit) : return 'gal';
    }
  };

  this.spellOutUnit = function(unit) {
    switch(true){
      case /^km$/i.test(unit) : return 'kilometers';
      case /^mi$/i.test(unit) : return 'miles';
      case /^lbs$/i.test(unit) : return 'pounds';
      case /^kg$/i.test(unit) : return 'kilograms';
      case /^gal$/i.test(unit) : return 'gallons';
      case /^l$/i.test(unit) : return 'liters';
    }
  };
  
  this.convert = function(initNum, initUnit) {
      // conversions listed in multiply order i.e. unit x factor, reverse this for the alternate direcation
    const conversionTable = {
      miToKm: 1.60934,
      kgToLbs: 0.453592,
      galToL: 3.78541
    };

    let value = 0;
    switch(initUnit){
      case 'km' : value = initNum / conversionTable.miToKm;break;
      case 'mi' : value = initNum * conversionTable.miToKm;break;
      case 'lbs' : value = initNum / conversionTable.kgToLbs;break;
      case 'kg' : value = initNum * conversionTable.kgToLbs;break;
      case 'L' : value = initNum / conversionTable.galToL;break;
      case 'gal' : value = initNum * conversionTable.galToL;break;
    }

    return parseFloat(value.toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
