(function () {
    "use strict";

    angular.module('app').controller('PersonController', personController);
    personController.$inject = ['PersonService', '$filter', '$location', 'PersonService', 'toast'];

    function personController(service, $filter, $location, personService, toast) {
        var vm = this;

        var id = $location.search().id;
        if(id != undefined) {
            personService.findById(id)
                .then((response) => { 
                    let data = response.data;
                    let birthDate = data.birthDate.split('/');
                    let value = new Date(birthDate[1] + '-' + birthDate[0] + '-' + birthDate[2]);
                    vm.person = {
                        id: data.id,
                        name: data.name,
                        birthDate: value,
                        cpf: data.cpf.replaceAll('.','').replace('-',''),
                        sex: data.sex,
                        height: data.height,
                        weight: data.weight
                    }
                })
                .catch((error) => {alert(error.data.message)});
        }

        vm.person = {};
        vm.persons = [];

        /** Funções de Serviço */
        vm.list     = list;
        vm.save     = save;
        vm.remove   = remove;
        vm.search   = search;
        vm.imc      = imc;
        
        function save() {
            var person = {
                id: vm.person.id,
                name: vm.person.name,
                birthDate: $filter('date')(vm.person.birthDate, 'dd/MM/yyyy'),
                cpf: vm.person.cpf.replaceAll('.','').replace('-',''),
                sex: vm.person.sex,
                height: vm.person.height,
                weight: vm.person.weight
            }
        
            if(person.id == null) {
                
                service.save(person)
                    .then(() => {
                        toast.create('Operação realizada com sucesso!');
                        $location.path('/home'); 
                    })
                    .catch((error) => {
                        toast.create({message: error.data.message, className: 'alert-danger'});
                    });
            } else {
                
                service.update(person)
                    .then(() => { 
                        toast.create('Edição realizada com sucesso!');
                        $location.path('/home'); 
                    })
                    .catch((error) => {
                        toast.create({message: error.data.message, className: 'alert-danger'});
                    });
            }
            
            
        }

        function list() {
            personService.listAll()
                .then((response) => {
                    vm.persons = response.data
                    if(vm.persons.length == 0) {
                        toast.create({message: "Nenhum registro encontrado!", className: 'alert-warning'})
                    }
                })
                .catch((error) => {
                    toast.create({message: error.data.message, className: 'alert-danger'});
                });
            
        }

        function search() {
            personService.search(vm.filter)
                .then((response) => {
                    vm.persons = response.data
                    if(vm.persons.length == 0) {
                        toast.create({message: "Nenhum registro encontrado!", className: 'alert-warning'})
                    }
                })
                .catch((error) => {
                    toast.create({message: error.data.message, className: 'alert-danger'});
                });
        }

        function remove(id) {
            personService.removeById(id)
                .then(() => {
                    toast.create('Registro excluído com sucesso!');
                    list(); 
                })
                .catch((error) => {
                    toast.create({message: error.data.message, className: 'alert-danger'});
                });
        }

        function imc(id) {
            personService.imc(id)
                .then((response) => {
                    toast.create({
                        message: `O seu índice de massa corporal é: ${response.data}`,
                        className: 'alert-warning',
                        dismissible: false,
                        timeout: 10 * 1000
                    });
                })
                .catch((error) => {
                    toast.create({message: error.data.message, className: 'alert-danger'});
                });
        }

        /** Funções de Component */
        vm.back        = back;
        vm.validForm   = validForm;
        vm.filterClear = filterClear;

        function back() {
            window.history.back();
        }

        function validForm() {
            return vm.form.$valid;
        }

        function filterClear() {
            vm.filter.name = '';
            vm.filter.name = '';
            vm.filter.cpf  = '';
            vm.filter.feminine = false;
            vm.filter.masculine = false;
            search();
        }
        
    }

})();