/**
 * @class Imobile.view.favoritos.SeleccionadorProFav
 * @extends Ext.Toolbar
 * Es un seleccionador para elegir productos o favoritos
 */
Ext.define('Imobile.view.favoritos.SeleccionadorProFav', {
 	extend: 'Ext.Container',
 	xtype: 'seleccionadorprofav',
 	requires: ['Ext.Toolbar','Ext.SegmentedButton'],
 	config: {
 		//docked: 'top', 		
 		layout: 'fit',
 		//fullscreen: 'true',
 		items:[{
 			xtype:'toolbar',
 			docked: 'top',
 			items:[{
 				xtype:'spacer'
 			},{
 				xtype:'segmentedbutton',
 				items:[{
 					text:'Productos',
 					itemId: 'listarProductos'
 					},{
 					text:'Favoritos',
 					itemId: 'listarFavoritos',
                    pressed: true
                }]
 			},{
 				xtype:'spacer'
 			}]
 		},{ 			
	       xtype:'productoslist'
	       //html:'Lista de productos'
 		}]
 	}
 });