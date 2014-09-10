/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.view.phone.login.LoginForm', {
    singleton: true,
    extend: 'Ext.form.Panel',
    xtype:'loginform',

    usuario: 'Código de usuario',
    contrasenia: 'Contraseña',
    ingresar: 'Ingresar',

    config: {
        padding: '15 15 15 15',
        defaults: {
            required: true,
            clearIcon: true
        },
    },

    initialize: function(){
         this.setItems(
        [{
            xtype: 'textfield',
            name: 'usuario',
            placeHolder: this.usuario
        },{
            xtype: 'passwordfield',
            name: 'password',
            margin:'5 0',
            placeHolder: this.contrasenia
        },{
            xtype: 'button',
            action:'login',
            text: this.ingresar,
            ui: 'btn-login-ui',
            itemId: 'login',
            margin:'5 0',
            handler: function(btn) {
                var form = btn.up('formpanel');

                form.fireEvent('logged', form);
            }
        },{
            xtype:'component',
            height:20
        },{
            xtype:'component',
            cls:'imobile-version',
            html:'Versión 1.0'
        },{
            xtype:'component',
            height:20
        },{
            xtype:'component',
            cls:'imobile-version',
            html:'<i class="icon-help-circled"></i>'
        }]);
         this.callParent(arguments);
    }    
});