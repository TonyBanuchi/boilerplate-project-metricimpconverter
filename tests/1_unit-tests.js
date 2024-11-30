const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Number Input', () =>{
        //convertHandler should correctly read a whole number input.
        assert.equal(convertHandler.getNum('5gal'),5,'Test 1: whole number, failed!');
        //convertHandler should correctly read a decimal number input.
        assert.equal(convertHandler.getNum('5.5gal'),5.5,'Test 2: decimal number, failed!');
        //convertHandler should correctly read a fractional input.
        assert.equal(convertHandler.getNum('5/5gal'),1,'Test 3: fractional number, failed!');
        //convertHandler should correctly read a fractional input with a decimal.
        assert.equal(convertHandler.getNum('5.5/11gal'),0.5,'Test 4: fractional and decimal, failed!');
        //convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
        assert.equal(convertHandler.getNum('5/2/1gal'),'invalid number','Test 5: double fraction number, failed!');
        //convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
        assert.equal(convertHandler.getNum('gal'),1,'Test 6: no number, failed!');
    });


    suite('Unit Input', () =>{
        //convertHandler should correctly read each valid input unit.
        assert.equal(convertHandler.getUnit('gal'),'gal','Test 7: input unit-gal, failed!');
        assert.equal(convertHandler.getUnit('l'),'L','Test 8: input unit-L, failed!');
        assert.equal(convertHandler.getUnit('mi'),'mi','Test 9: input unit-mi, failed!');
        assert.equal(convertHandler.getUnit('km'),'km','Test 10: input unit-km, failed!');
        assert.equal(convertHandler.getUnit('kg'),'kg','Test 11: input unit-kg, failed!');
        assert.equal(convertHandler.getUnit('lbs'),'lbs','Test 12: input unit-lbs, failed!');
        //convertHandler should correctly return an error for an invalid input unit.
        assert.equal(convertHandler.getUnit('g'),'invalid unit','Test 13: invalid unit, failed!');
    });

    suite('Return Units', () => {
        //convertHandler should return the correct return unit for each valid input unit.
        assert.equal(convertHandler.getReturnUnit('gal'),'L','Test 14: return unit-gal, failed!');
        assert.equal(convertHandler.getReturnUnit('l'),'gal','Test 15: return unit-L, failed!');
        assert.equal(convertHandler.getReturnUnit('mi'),'km','Test 16: return unit-mi, failed!');
        assert.equal(convertHandler.getReturnUnit('km'),'mi','Test 17: return unit-km, failed!');
        assert.equal(convertHandler.getReturnUnit('kg'),'lbs','Test 18: return unit-kg, failed!');
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg','Test 19: return unit-lbs, failed!');
    });

    suite('Spelled out units', () =>{
        //convertHandler should correctly return the spelled-out string unit for each valid input unit.
        assert.equal(convertHandler.spellOutUnit('gal'),'gallons','Test 20: spelled unit-gal, failed!');
        assert.equal(convertHandler.spellOutUnit('l'),'liters','Test 21: spelled unit-L, failed!');
        assert.equal(convertHandler.spellOutUnit('mi'),'miles','Test 22: spelled unit-mi, failed!');
        assert.equal(convertHandler.spellOutUnit('km'),'kilometers','Test 23: spelled unit-km, failed!');
        assert.equal(convertHandler.spellOutUnit('kg'),'kilograms','Test 24: spelled unit-kg, failed!');
        assert.equal(convertHandler.spellOutUnit('lbs'),'pounds','Test 25: spelled unit-lbs, failed!');
    });

    suite('Conversions', () => {
        //convertHandler should correctly convert gal to L.
        assert.equal(convertHandler.convert(1,'gal'),3.78541,'Test 26: conversion gal-L, failed!');
        //convertHandler should correctly convert L to gal.
        assert.equal(convertHandler.convert(1,'L'),0.26417,'Test 27: conversion L-gal, failed!');
        //convertHandler should correctly convert mi to km.
        assert.equal(convertHandler.convert(1,'mi'),1.60934,'Test 28: conversion mi-km, failed!');
        //convertHandler should correctly convert km to mi.
        assert.equal(convertHandler.convert(1,'km'),0.62137,'Test 29: conversion km-mi, failed!');
        //convertHandler should correctly convert lbs to kg.
        assert.equal(convertHandler.convert(1,'lbs'),2.20462,'Test 30: conversion lbs-kg, failed!');
        //convertHandler should correctly convert kg to lbs
        assert.equal(convertHandler.convert(1,'kg'),0.45359,'Test 31: conversion kg-lbs, failed!');
    });
});