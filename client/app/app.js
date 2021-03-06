var app = angular.module('CoBo', []);

//this controller and factory send and recieve requests for a list of recipe entries
//search bar controller
app.controller('searchController', function($scope, searchFactory, recipeViewFactory){
  $scope.flag = true;
  $scope.currentRecipe = {};
  var recipeList = $scope.recipeList;
  $scope.searchRecipe = function(){
    console.log($scope.userSearch)
    searchFactory.searchRecipe($scope.userSearch)
      .then(function(response){
        console.log(response)
        $scope.recipeList = response.data.recipes;
        //rounds the social ranking
        $scope.recipeList.forEach(function(recipe){
          recipe["social_rank"] = Math.floor(recipe["social_rank"])
        })
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  }
  $scope.recipeView = function(id){
    $scope.flag = true;
    console.log("suh bruh", id)
    recipeViewFactory.recipeView(id)
      .then(function(response){

        $scope.currentRecipe = response.data.recipe;
        console.log($scope.currentRecipe.ingredients)
      })
      .catch(function(err){
        console.log('You have made a grave error: ', err)
      })
      console.log($scope.flag)
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


app.factory("recipeViewFactory", function($http){
  var recipeView = function(params){

    console.log("some params yo:", params)
    return $http({
      method: 'GET',
      url: 'http://localhost:8000/viewRecipe',
      params: {
        id: params
      }
    })
  }
  return {
    recipeView: recipeView
  }
})


/////////////////////////////////////////////////////





