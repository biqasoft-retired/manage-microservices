'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'app/users/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('navCtrl', ['$scope', '$rootScope', 'apiService', '$mdToast', '$mdDialog', function ($scope, $rootScope, apiService, $mdToast, $mdDialog) {

        apiService.stats().then(function (data) {
            $rootScope.stats = data;
        });

    }])

    .controller('View2Ctrl', ['$scope', '$rootScope', 'apiServiceAccounts', '$mdToast', '$mdDialog', function ($scope, $rootScope, apiServiceAccounts, $mdToast, $mdDialog) {

        $scope.allGoods = [];
        $scope.showJson = false;

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);

        $scope.getAllUsers = function () {
            apiServiceAccounts.getAllUserAccounts().then(function (data) {
                $scope.allGoods = data;
            });
        };
        $scope.getAllUsers();

        $scope.deleteDomainConfirmation = function (domain, ev) {
            $scope.currentDomainEditableModal = domain;
            $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'templates/modal/deleteUserAccount.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    console.log("qqq");
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.deleteDomainById = function (id) {
            apiServiceAccounts.deleteUserAccount(id).then(function (data) {
                $scope.getAllUsers();
                $scope.showSimpleToast("Удалено");
            });
            $mdDialog.hide();
        };

        $scope.showSimpleToast = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
            );
        };

        $scope.getToastPosition = function () {
            sanitizePosition();
            return Object.keys($scope.toastPosition)
                .filter(function (pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }

        $scope.currentDomainEditableModal = {};

        $scope.saveCurrentEditableDomain = function () {
            apiServiceAccounts.updateUserAccount($scope.currentDomainEditableModal);
            $mdDialog.hide();
        };

        $scope.editDomain = function (domain, ev) {
            $scope.currentDomainEditableModal = domain;
            $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'templates/modal/editDomain.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    console.log("qqq");
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

    }]);