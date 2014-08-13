/**
 * Created by th3gr4bb3r on 7/21/14.
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