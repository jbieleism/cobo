var app = angular.module('CoBo', []);



app.controller('searchController', function($scope, searchFactory){
  $scope.searchRecipe = function(){
    console.log($scope.userSearch)
    searchFactory.searchRecipe($scope.userSearch)
      .then(function(response){
        $scope.recipeList = response.data.recipes;
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  }
})

app.controller('resultsController', function($scope, recipeFactory){
  $scope.recipeView = function(){
    recipeFactory.recipeView
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


app.factory("recipeFactory", function($http){
  var recipeView = function(params){
    return $http({
      method: 'GET',
      url: 'http://localhost:8000/viewRecipe',
      params:{

      }
    })
  }
})






