/**
 * @class Core.data.Store
 * @extends Ext.data.Store
 * store genereico para aplicacion
 */
Ext.define('APP.core.data.Store', {
    extend: 'Ext.data.Store',
    config: {
        autoLoad: false,
        listeners: {
            beforeload: function (store, operation, ops) {
                var me = this,
                    extraParams = store.getProxy().getExtraParams();
                me.params.auth_token = localStorage.getItem("Token");
                me.params.idioma = localStorage.getItem("idioma");
                me.params.Token = localStorage.getItem("Token");
                me.params.CodigoUsuario = localStorage.getItem("CodigoUsuario");
                me.params.CodigoSociedad = localStorage.getItem("CodigoSociedad");
                me.params.CodigoDispositivo = localStorage.getItem("CodigoDispositivo");
                me.params.Elementos = 50;

                if (store.getProxy().getUrl().search('http') == -1) {
                    store.getProxy().setUrl('http://' + localStorage.getItem("dirIP") + store.getProxy().getUrl());
                }

                if (me.resetParams) {
                    store.getProxy().setExtraParams(me.params);
                    me.resetParams = false;
                } else {
                    store.getProxy().setExtraParams(me.mergePropertiesObject(extraParams, me.params));
                }
            }
        }
    },

    setParams: function (params, resetParams) {
        var me = this;

        me.params = params;
        me.resetParams = resetParams;
    },

    mergePropertiesObject: function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    },

    resetCurrentPage: function () {
        var me = this;
        me.currentPage = 1;
    }
});
