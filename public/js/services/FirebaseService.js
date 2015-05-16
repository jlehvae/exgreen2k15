angular.module('app').service('FirebaseService', function($firebaseArray) {
    var baseUrl = "https://luminous-fire-393.firebaseio.com";
    var ref = new Firebase(baseUrl + "/temperature");

    this.getStatistics = function() {
        return $firebaseArray(ref);
    }
});
