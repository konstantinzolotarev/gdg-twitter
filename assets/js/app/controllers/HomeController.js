(function() {
  'use strict';

  angular.module('Twitter').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', Tweet];
  function HomeController($scope, Tweet) {
      $scope.tweets = Tweet.query();

      $scope.post = '';

      $scope.sendPost = function(post) {
        if (!post) {
          return;
        }
        var tweet = new Tweet({post: post});
        tweet.$save().then(function(tw) {
          $scope.tweets.splice(0, 0, tw);
          $scope.post = '';
        });
      };

      $scope.removeTweet = function(tweet, $index) {
        if (!confirm('Are you sure ?')) {
          return;
        }
        tweet.$remove().then(function() {
          $scope.tweets.splice($index, 1);
        });
      };
  };
})();
