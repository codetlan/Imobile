/**
* @class APP.store.phone.Monedas
* @extends Ext.data.Store
* El store para las monedas
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Monedas', {
    extend: 'APP.core.data.Store',

    config: {
        model: 'APP.model.phone.Moneda',
        proxy: {
            url: '/iMobile/COK1_CL_Catalogos/ObtenerListaMonedasiMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            },
            extraParams: {
                type: 'json'
            }
        }
        /*data: [
            {CodigoMoneda: '$', NombreMoneda: 'Peso Mexicano'},
            {CodigoMoneda: 'USD', NombreMoneda: 'Dólar Americano'},
            {CodigoMoneda: 'JPN', NombreMoneda: 'Yen Japonés'},
            {CodigoMoneda: '€', NombreMoneda: 'Euro'},
            {CodigoMoneda: 'Q', NombreMoneda: 'Quetzal Guatemalteco'}
        ]*/
    }
});