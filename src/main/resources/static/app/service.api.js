/**
 * Created by ya_000 on 1/17/2016.
 */

angular.module('myApp.api', ['ngRoute', 'myApp.services'])
    .service('apiService', ['serverRequestService', function (serverRequestService) {

        this.getAllDomains = function () {
            return serverRequestService.get('domains');
        };

        this.updateDomain = function (obj) {
            return serverRequestService.put('domains', obj);
        };

        this.deleteDomain= function (obj) {
            return serverRequestService.delete('domains/' + obj.domain);
        };

        this.addDomain = function (obj) {
            return serverRequestService.post('domains', obj);
        };

        this.stats = function () {
            return serverRequestService.get('domains/stats');
        };

    }])

    .service('apiServiceAccounts', ['serverRequestService', function (serverRequestService) {

        this.getAllUserAccounts = function () {
            return serverRequestService.get('accounts');
        };

        this.updateUserAccount = function (obj) {
            return serverRequestService.put('accounts', obj);
        };

        this.deleteUserAccount = function (obj) {
            return serverRequestService.delete('accounts/' + obj.id);
        };

        this.addUserAccount = function (obj) {
            return serverRequestService.post('accounts', obj);
        };

    }])


;