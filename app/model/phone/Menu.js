/**
* @class APP.model.phone.Menu
* @extends Ext.data.Model
* El modelo para representar el menú principal
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Menu', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'name',
            type: 'string'
        },{
            name: 'icon',
            type: 'string'
        },{
            name: 'action',
            type: 'string'
        }]
    }
});