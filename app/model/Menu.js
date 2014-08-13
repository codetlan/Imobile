/**
 * @class Vitared.model.Medic
 * @extends Ext.data.Model
 * The model for the medics
 * @oswaldo@codetlan.com
 * @codetlan
 */
Ext.define('Imobile.model.Menu', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'icon',
                type: 'string'
            },
            {
                name: 'action',
                type: 'string'
            }
        ]
    }
});
