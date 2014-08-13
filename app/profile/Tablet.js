/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.profile.Tablet',{
    extend:'Ext.app.Profile',

    config:{
        name:'tablet',
        namespace:'tablet',
        controllers:['Main'],
        views:['Main']
    },

    isActive: function () {
        return !Ext.os.is.Phone;
    },

    launch: function(){
        Ext.Viewport.add(Ext.create('APP.view.tablet.Main'));
    }
});