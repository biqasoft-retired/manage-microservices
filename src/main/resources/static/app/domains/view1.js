'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'app/domains/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$rootScope', 'apiService', '$mdToast', '$mdDialog', function ($scope, $rootScope, apiService, $mdToast, $mdDialog) {

        $scope.allGoods = [];
        $scope.showJson = false;

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({},last);

        $scope.getAllDomain = function () {
            apiService.getAllDomains().then(function (data) {
                $scope.allGoods = data;
            });
        };
        $scope.getAllDomain();

        $scope.deleteDomainConfirmation = function(domain,ev) {
            $scope.currentDomainEditableModal = domain;
            $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'templates/modal/deleteDomain.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {
                    console.log("qqq");
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.deleteDomainById = function (id) {
            apiService.deleteDomain(id).then(function (data) {
                $scope.getAllDomain();
                $scope.showSimpleToast("Удалено");
            });
            $mdDialog.hide();
        };

        $scope.showSimpleToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
            );
        };

        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }

        window.addEventListener('error', function (err) {
            $scope.showSimpleToast (err);
        });

        $scope.currentDomainEditableModal = {};

        $scope.saveCurrentEditableDomain = function () {
            apiService.updateDomain($scope.currentDomainEditableModal);
            $mdDialog.hide();
        };

        $scope.editDomain = function(domain,ev) {
            $scope.currentDomainEditableModal = domain;
            $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'templates/modal/editDomain.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {
                    console.log("qqq");
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

    }]);