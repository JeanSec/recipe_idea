var myApp = angular.module('myApp', [])

//define a service named monService
/*
myApp.service('monService', function ($http) {
    this.ingredients = 'pomme';
    this.add = function (Ingredient) {
        this.ingredients = this.ingredients + ', ' + Ingredient;
        return this.ingredients;
    };
    this.text_resp = '';

    this.request = function() {
    	var request_obj = $http({
  				method: 'GET',
  				url: 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=banania&search_simple=1&action=process&json=1'
					}).then(
					function successCallback(response) {
						console.log("success")
						this.text_resp = response.data;
						console.log("1")
						console.log(this.text_resp);
  					}, 
  					function errorCallback(response) {
  						console.log("error")
  						this.text_resp = "error server";
  					});
  		console.log("async");
  		console.log(this.text_resp)
    	}
    	console.log("2")
    	console.log(this.text_resp)
	});

*/

function filterBy(val,obj) {
  var result = Object.keys(obj).reduce(function(r, e) {
    if (e.toLowerCase().indexOf(val) != -1) {
      r[e] = obj[e];
    } else {
      Object.keys(obj[e]).forEach(function(k) {
        if (k.toLowerCase().indexOf(val) != -1) {
          var object = {}
          object[k] = obj[e][k];
          r[e] = object;
        }
      })
    }
    return r;
  }, {})
  return result;
}

myApp.controller('Controller', function($scope,$http) {
	$scope.mesIngredients = '';
	$scope.mareponse = '';
	$scope.im_arr = [];
	$scope.terms = '';
	$scope.request = function() {
    	var request_obj = $http({
  				method: 'GET',
  				url: 'https://world.openfoodfacts.org/cgi/search.pl?search_terms='
  				+ $scope.terms 
  				+'&search_simple=1'
  				+'sort_by=unique_scans_n'
  				+'&action=process&json=1'
					}).then(
					function successCallback(response) {
						$scope.mareponse = response.data;
						$scope.images($scope.mareponse);
  					}, 
  					function errorCallback(response) {
  						$scope.mareponse = "error server";
  					});
    	}
    $scope.images = function(resp_obj) {
    	var array = filterBy('products',resp_obj);
    	for (let i = 0; i < 5; i++) {
  			$scope.im_arr.push(array['products'][i]['image_url']);
		}
    }
});
