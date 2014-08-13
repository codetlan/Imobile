/**
 * @class Imobile.view.ventas.MonedasList
 * @extends extendsClass
 * Description Lista de las monedas
 */
Ext.define('APP.view.phone.ordenes.MonedasList', {
    extend: 'Ext.dataview.List',            
    requires: [],
    xtype: 'monedaslist',
    config: {     	
         itemTpl: ['<tpl for="."><tpl if ="Predeterminada == true"><div class="imobile-cliente-tpl direc-selected"><tpl else><div class="imobile-cliente-tpl"></tpl>', '<span><p><b>{CodigoMoneda}</b> {NombreMoneda}</p></span>', '<i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i></div></tpl>'].join(''),
        store: 'Monedas',
        selectedCls: 'direc-selected'
    	/*onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },*/
    }
});