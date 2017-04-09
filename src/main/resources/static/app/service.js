/**
 * Created by ya_000 on 1/17/2016.
 */

'use strict';
angular.module('myApp.services', ['ngRoute'])
    .service('serverRequestService', ['$q', '$http', '$rootScope',
        function ($q, $http, $rootScope) {

            var originatorEv;
            $rootScope.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $http.defaults.headers.common["Accept"] = "application/json";
            $http.defaults.headers.common["Content-Type"] = "application/json";

            var baseUrl = '/';
            $rootScope.baseUrl = baseUrl;
            $rootScope.showSidebar = false;

            // count server connection number
            $rootScope.serversConnectionsActive = 0;

            this.get = function (relUrl, params) {
                $rootScope.serversConnectionsActive++;
                var promise = $http.get(baseUrl + "/" + relUrl).then(function (response) {
                    $rootScope.serversConnectionsActive--;
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            };

            this.put = function (relUrl, object) {
                $rootScope.serversConnectionsActive++;
                var promise = $http.put(baseUrl + "/" + relUrl, object).then(function (response) {
                    $rootScope.serversConnectionsActive--;
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            };

            this.post = function (relUrl, object, params) {
                $rootScope.serversConnectionsActive++;
                var promise = $http.post(baseUrl + "/" + relUrl, object).then(function (response) {
                    $rootScope.serversConnectionsActive--;
                    return response.data;
                });
                // Return the promise to the controller
                return promise;

            };

            this.delete = function (relUrl) {
                $rootScope.serversConnectionsActive++;
                var promise = $http.delete(baseUrl + "/" + relUrl).then(function (response) {
                    $rootScope.serversConnectionsActive--;
                    return response.data;
                });

                // Return the promise to the controller
                return promise;
            };
        }])
