/**
 * Created by Danny Schreiber on 6/21/14.
 */

app.controller('MainController', function($scope, MainService){

    $scope.model = MainService.model;
    $scope.model.name = '';
    $scope.model.email = '';
    $scope.model.message = '';
    $scope.model.successMessage = '';

    $scope.model.send = function(name, email, message){
        $scope.model.sendMail(name, email, message);
        $scope.model.name = '';
        $scope.model.email = '';
        $scope.model.message = '';
        $scope.model.successMessage = 'Thank you!!  A representative will be in touch soon!';
    }

});