(function () {
    "use strict";

    angular.module('app')
        .constant('constants', {
            URL_BASE: 'http://localhost:8080',
            MSGS: {
                ERRO_GERAL: 'Ocorreu algum problema. Tente novamente mais tarde.',
            },
        });

})();