/*global require, describe, it*/
(function() {
	'use strict';
	var expect = require('chai').expect;
	var core = require('../src/core');

	var v1 = [
		'isArray',
		'isEmpty',
		'isFunction',
		'isInitialized',
		'isNull',
		'isNumber',
		'isObject',
		'isString'
	];

	describe('core', function() {
		it('implements all v1 methods', function() {
			expect(core).to.have.all.keys(v1);
		});

		describe('isEmpty', function() {
			describe('with array', function() {
				it('should return true with empty arrays', function() {
					expect(core.isEmpty([])).to.be.true;
				});
				it('should return false with arrays with gaps', function() {
					var arr = [];
					arr[125] = 'a';
					expect(core.isEmpty(arr)).to.be.false;
				});
				it('should return true with arrays ', function() {
					var arr = [];
					arr[125] = 'a';
					expect(core.isEmpty(arr)).to.be.false;
				});
				it('should return false with associative arrays', function() {
					var a = [];
					a[a] = 'a';
					expect(core.isEmpty(a)).to.be.false;
				});
			});

			describe('with string', function() {
				it('should return true with empty strings', function() {
					expect(core.isEmpty('')).to.be.true;
				});
				it('should return true with empty string objects', function() {
					expect(core.isEmpty(new String())).to.be.true;
				});
				it('should return false with not empty strings', function() {
					expect(core.isEmpty('hello world!')).to.be.false;
				});
				it('should return false with empty string objects', function() {
					expect(core.isEmpty(new String('hello world!'))).to.be.false;
				});
			});

			describe('with object', function() {
				it('should return true with empty objects', function() {
					expect(core.isEmpty({})).to.be.true;
				});
				it('should return true with object with empty values', function() {
					expect(core.isEmpty({ a: undefined })).to.be.true;
				});
				it('should return false with object with values', function() {
					expect(core.isEmpty({ a: 'a' })).to.be.false;
				});
			});
		});
	});

}());
