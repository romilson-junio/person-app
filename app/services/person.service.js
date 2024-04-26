(function () {
    "use strict";

    angular.module('app').service('PersonService', service);

        service.$inject = ['$http', 'constants'];

    function service($http, constants) {
        var vm = this;

        vm.save       = save;
        vm.listAll    = listAll;
        vm.search     = search;
        vm.removeById = removeById;
        vm.findById   = findById;
        vm.update     = update;
        vm.imc        = imc;
        
        /*vm.remove = remove;*/
        
        function save(model) {
            return $http.post(`${constants.URL_BASE}/persons`, model);
        }

        function update(model) {
            return $http.put(`${constants.URL_BASE}/persons/${model.id}`, model);
        }

        function findById(id) {
            return $http.get(`${constants.URL_BASE}/persons/${id}`);
        }

        function listAll() {
            return $http.get(`${constants.URL_BASE}/persons`);
        }

        function search(filter) {
            return $http.get(`${constants.URL_BASE}/persons/search`, {
                params: {
                    id: filter.id ? filter.id: null,
                    name: filter.name ? filter.name: null,
                    cpf: filter.cpf ? filter.cpf: null,
                    masculine: filter.masculine ? 'M': null,
                    feminine: filter.feminine ? 'F': null,
                }
            });
        }

        function removeById(id) {
            return $http.delete(`${constants.URL_BASE}/persons/${id}`);
        }

        function imc(id) {
            return $http.get(`${constants.URL_BASE}/persons/imc/${id}`);
        }


    }


})();