var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

var ut = require ('../utilities-generate.js');

describe('test taille chaine', function(){
    it('should return 5'), function (){
        var data = ut.makeString(5);
        console.log(data);
            assert(5 == 5);
    }});
