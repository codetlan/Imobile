/**
 * @class APP.model.Language
 * @extends Ext.data.Model
 * El modelo de los idiomas
 */
Ext.define('APP.core.data.Language', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
               name: 'idioma',
               type: 'array'
            }
/*        es: {
            Login: {
                "usuario": "Código de Usuario",
                "password": "Contraseña",
                "sinUsuario": "No existe el usuario",
                "sinServer": "No se puede encontrar el servidor",
                "errorPass": "La Contraseña para el usuario no es válida",
                "footerHtml": "Footer in English",
                "mask": "accediendo"                
            }
        },

        en: {

        }*/]
    }
});