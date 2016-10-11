var app = angular.module('CoBo', []);

//this controller and factory send and recieve requests for a list of recipe entries
//search bar controller
app.controller('searchController', function($scope, searchFactory){
  $scope.searchRecipe = function(){
    console.log($scope.userSearch)
    searchFactory.searchRecipe($scope.userSearch)
      .then(function(response){
        console.log(response)
        $scope.recipeList = response.data.recipes;
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  }
})
app.factory("searchFactory", function($http){
  var searchRecipe = function(params){
    return $http({
      method: 'GET',
      url: 'http://localhost:8000/getRecipes',
      params: {
        q: params
      }
    })
  }
  return {
    searchRecipe: searchRecipe
  }
})






//this controller and factory should produce a new page with a specified recipe entry with its ingredients and directions
//controller of results
app.controller('resultsController', function($scope, $location, recipeViewFactory){
  $scope.recipeView = function(){
    recipeViewFactory.recipeView($scope.recipeEntry)
      .then(function(response){
        console.log("got to the response!")
      })
      .catch(function(err){
        console.log("You got an Error: ", err)
      })
  }
})

app.factory("recipeViewFactory", function($http){
  var recipeView = function(params){
    return $http({
      method: 'GET',
      url: 'http://localhost:8000/viewRecipe',
      params: params
    })
  }
  return {
    recipeView: recipeView
  }
})
/////////////////////////////////////////////////////





