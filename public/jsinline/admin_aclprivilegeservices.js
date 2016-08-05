$(document).ready(function () {

/**
 * easyui tree extend for 'unselect' event
 * @author Mustafa Zeynel Dağlı
 * @since 04/04/2016
 */
/*$.extend($.fn.tree.methods,{
        unselect:function(jq,target){
                return jq.each(function(){
                        var opts = $(this).tree('options');
                        $(target).removeClass('tree-node-selected');
                        if (opts.onUnselect){
                                opts.onUnselect.call(this, $(this).tree('getNode',target));
                        }
                });
        }
});*/

/**
 * privileges datagrid
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
$('#tt_grid_dynamic_privileges').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillPrivilegesOfRolesList_sysAclPrivilege',
            sort : 'id',
            order : 'desc',
            /*machine_groups_id : null,
            filterRules:null*/
    },
    width : '100%',
    singleSelect:true,
    pagination : true,
    collapsible:true,
    method:'get',
    idField:'id',
    //fit:true,
    //fitColumns : true,
    remoteFilter: true,
    remoteSort:true,
    multiSort:false,
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'privilege_name',title:'Yetki',sortable:true,width:200},
            {field:'role_name_tr',title:'Rol',sortable:true,width:200},
            {field:'resource_name',title:'Resource',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    var u = '<button style="padding : 2px 4px;" title="Servis Atamaları Yap"  class="btn btn-info" type="button" onclick="return privilegeServiceAttachDialog('+row.id+', { privilege_name : \''+row.privilege_name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                                                     role_name_tr : \''+row.role_name_tr+'\',\n\
                                                                                                                                                                                                     resource_name : \''+row.resource_name+'\'} );"><i class="fa fa-exchange"></i></button>';
                    return u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic_privileges').datagrid('enableFilter');


/**
 * ACL roles datagrid is being filled
 * @since 13/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillRolesPropertiesList_sysAclRoles',
            sort : 'id',
            order : 'desc',
            /*machine_groups_id : null,
            filterRules:null*/
    },
    width : '100%',
    singleSelect:true,
    pagination : true,
    collapsible:true,
    method:'get',
    idField:'id',
    //fit:true,
    //fitColumns : true,
    remoteFilter: true,
    remoteSort:true,
    multiSort:false,
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'name_tr',title:'Rol',sortable:true,width:200},
            {field:'name',title:'Rol Eng.',sortable:true,width:200},
            {field:'parent_name',title:'Bağlı Rol',sortable:true,width:100},
            {field:'inherited_name',title:'Kök Rol',sortable:true,width:100},
            {field:'resource_name',title:'ACL Resource',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveACLRolesWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveACLRolesWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteACLRoleUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateACLRoleDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       description : \''+row.description+'\',\n\
                                                                                                                                                                       resource_id : '+row.resource_id+',\n\
                                                                                                                                                                       resource_name : \''+row.resource_name+'\',\n\
                                                                                                                                                                       name_tr : \''+row.name_tr+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');


/*
* 
* @type @call;$@call;loadImager
* @Since 28/07/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for roles tree 
* this imager goes to #loading-image div in html.
* imager will be removed on resource / roles tree onLoadSuccess method.
*/
var loader = $("#loading-image").loadImager();

/**
 * multilanguage plugin 
 * @type Lang
 */
var lang = new Lang();
lang.dynamic($('#ln').val(), '/plugins/jquery-lang-js-master/langpack/'+$('#ln').val()+'.json');
lang.init({
    defaultLang: 'en'
});
lang.change($('#ln').val());

var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
/*
* ACL resource and rol tree
* Mustafa Zeynel Dağlı
* 28/07/2016
*/
$('#tt_tree_menu2').tree({  
    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillResourceGroups_sysAclResources&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
    method: 'get',
    animate: true,
    checkbox: false,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
         loader.loadImager('removeLoadImage');
    },
    formatter: function (node) {
        var s = node.text;
        var id = node.id;
        
        if (node.attributes.root == 'false') {
            s += '&nbsp;<i class="fa fa-level-down" title="Role bağlı yetkileri tabloya doldur" onclick="fillPrivilegeDatagrid('+id+', '+node.resource_id+');"></i>';
            return s;

        } 
        return s;
    }
    
});

/**
 * privilege datagrid is filled due to Resource/role tree role id
 * @param {type} id
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.fillPrivilegeDatagrid = function(id, resource_id) {
    var loaderInsertBlock = $("#loading-image-crud").loadImager();
    loaderInsertBlock.loadImager('appendImage');
    
    var id = id;
    $('#tt_grid_dynamic_privileges').datagrid({  
        url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillPrivilegesOfRolesList_sysAclPrivilege',
            sort : 'id',
            order : 'desc',
            role_id : id,
            resource_id: resource_id,
        }, 
        onLoadSuccess : function(data) {
            loaderInsertBlock.loadImager('removeLoadImage');
        }
    });
    $('#tt_grid_dynamic_privileges').datagrid('reload');
    $('#tt_grid_dynamic_privileges').datagrid('enableFilter');
}
      

// Left menuyu oluşturmak için çağırılan fonksiyon...
$.fn.leftMenuFunction();


/**
 * wrapper for ACL privilege and Rest Services attachment process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.privilegeServiceAttachDialog = function (id, row) {
    window.gridReloadController = false;
    
    var rrp_id = id;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.resource_name + '" Resource, "'+ row.role_name_tr + '" Rolü, "'+ row.privilege_name + '" Yetkisinde işlem yapmaktasınız ...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="aclServiceFormPopup" method="get" class="form-horizontal">\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="padding-top: 10px;" >\n\
                                                            <label class="col-sm-2 control-label">Servisler</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="nonAttachedTree">\n\
                                                                    <div class="input-group-addon" >\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <ul id="tt_tree_services_popup" class="easyui-tree" ></ul>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Yetkiye Atanmış Servisler</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group" id="attachedTags">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div style="margin-bottom: -10px;" class="tag-container-popup">\n\
                                                                     <ul id="test-cabin-popup" class="tag-box"></ul>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateACLRoleWrapper(event, '+id+');">\n\
                                                                 <i class="fa fa-save"></i> Güncelle </button>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                     return $message;
                 },
         type: BootstrapDialog.TYPE_PRIMARY,
         onshown : function () {  
            window.tagBuilderPopup = $('#test-cabin-popup').tagCabin({
                tagCopy      : false,
                tagDeletable : true,  
                tagBox       : $('.tag-container-popup').find('ul'),
                dataMapper   : {attributes : Array('rrp_id',
                                                    'restservices_id',
                                                    'resource_id',
                                                    'role_id',
                                                    'privilege_id',
                                                    'services_group_id')} 
            });
        
            window.tagBuilderPopup.tagCabin({ 
                onTagRemoved : function(event, data) {
                    var elementData = data.element;
                    var id = data.id;
                    window.deleteServicePrivilegeDialog(id, elementData);

                }
             });
            
            var nonAttachedTreeLoadImage = $("#nonAttachedTree").loadImager();
            nonAttachedTreeLoadImage.loadImager('appendImage');
             
            var attachedTagsLoadImage = $("#attachedTags").loadImager();
            attachedTagsLoadImage.loadImager('appendImage');
            
            var ajPopUpMachProp = $('#test-cabin-popup').ajaxCallWidget({
                    proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data : {
                        url:'pkFillRestServicesOfPrivileges_sysAclRrpRestservices' ,
                        language_code : $('#langCode').val(),
                        id : id,
                        pk : $("#pk").val()
                    }
            })
            ajPopUpMachProp.ajaxCallWidget ({
                  onError : function (event, textStatus, errorThrown) {
                      dm.dangerMessage({
                          onShown : function () {
                             var loader = $("#loading-image-crud-popup").loadImager();
                             loader.loadImager('appendImage');
                          }
                      });
                      dm.dangerMessage('show', 'Kategoriye Ait Makina Özellikleri Yüklenememiştir...',
                                               'Kategoriye ait makina özellikleri yüklenememiştir,msistem yöneticisi ile temasa geçiniz...');
                  },
                  onSuccess : function (event, data) {  
                     attachedTagsLoadImage.loadImager('removeLoadImage');
                     
                    
                    
                    window.tagBuilderPopup.tagCabin('addTags', data);
                  },
                  onErrorDataNull : function (event) {
                      wm.warningMessage('resetOnShown');
                      wm.warningMessage('show', 'Servis Bulunamamıştır', 'Yetkiye atanmış servis bulunamamıştır!');
                      attachedTagsLoadImage.loadImager('removeLoadImage');
                      
                  },
            }) 
            ajPopUpMachProp.ajaxCallWidget('call');
            
            $('#tt_tree_services_popup').tree({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillNotInRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '&rrp_id='+id,
                method: 'get',
                animate: true,
                checkbox: false,
                cascadeCheck: false,
                lines: true,
                onLoadSuccess: function (node, data) {
                     nonAttachedTreeLoadImage.loadImager('removeLoadImage');
                 },
                onSelect: function(node) { 
                },
                formatter: function (node) {
                    var s = node.text;
                    var id = node.id;
                    var services_group_id = node.attributes.services_group_id;
                    if (node.attributes.root == 'false') {
                        s += '&nbsp;<i class="fa fa-level-down" title="Servisi Yetkiye Bağla" onclick="attachServiceToPrivilege('+rrp_id+', '+id+' , '+services_group_id+', \''+node.text+'\');"></i>';
                        return s;

                    } 
                    return s;
                 }
             }); 
         },
         onhide : function() {
             /*if(window.gridReloadController == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }*/
         },
     });
     return false;
}

/**
 * wrapper class for pop up and delete service from specific
 * ACL privilege
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 29/07/2016
 */
window.deleteServicePrivilegeDialog= function(id, element){
    var id = id;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteServicePrivilege(id, element);
    }
    });
    wcm.warningComplexMessage('show', 'Makina Özelliğini Kategoriden Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Makina özelliğini kategoriden  silmek üzeresiniz, makina özelliği silme işlemi geri alınamaz!! ');
}

/**
 * delete service from a specific ACL privilege
 * @param {type} id
 * @param {type} element
 * @param {type} machine_group_id
 * @returns {undefined}
 * @since 29/07/2016
 */
window.deleteServicePrivilege = function(id, element) {
    var loader = $("#loading-image-crud-popup").loadImager();  
    loader.loadImager('appendImage');
    //var ajPopUpDelete = $(window).ajaxCall({
    var ajPopUpDelete = $("#loading-image-crud-popup").ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkDelete_sysAclRrpRestservices' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    });
    ajPopUpDelete.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {  
                 dm.dangerMessage('resetOnShown');  
                 dm.dangerMessage('show', 'Yetki / Servis Silme İşlemi Başarısız...',
                                           'Yetkiden servis silinememiştir, sistem yöneticisi ile temasa geçiniz...');
                 console.error('"pkDelete_sysAclRrpRestservices" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 sm.successMessage({ 
                     onShown : function() {
                         loader.loadImager('removeLoadImage');
                         parentNode = $('#tt_tree_services_popup').tree('find', element.attr('data-services_group_id'));
                         $('#tt_tree_services_popup').tree('select', parentNode.target);
                         $('#tt_tree_services_popup').tree('expand', parentNode.target);
                         //$('#tt_tree_services_popup').tree('collapseAll');
                         
                         $('#tt_tree_services_popup').tree('append', {
                            parent: parentNode.target,
                            data: [{
                                    attributes:{
                                                active: 0, 
                                                description: '',
                                                last_node : 'true',
                                                root : 'false',
                                                service : 'true',
                                                services_group_id : element.attr('data-services_group_id'),
                                                },
                                    id: element.attr('data-restservices_id'),
                                    text: element.text(),
                                    checked: false,
                                    state : 'open',
                                },]
                        });
                        window.tagBuilderPopup.tagCabin('removeTag', element);
                     }
                 });
                 sm.successMessage('show', 'Yetki / Servis Silme İşleminiz Başarılı...',
                                           'Yetki / Servis  silme işleminiz başarılı...')
             },                                   
     });
     ajPopUpDelete.ajaxCall('call');
}


/**
 * attach rest service end point and ACL privilege
 * @param {type} rrp_id
 * @param {type} restservices_id
 * @param {type} service_name
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 29/07/2016
 */
window.attachServiceToPrivilege = function(rrp_id, restservices_id, services_group_id, service_name) {
    var loader = $("#loading-image-crud-popup").loadImager();
    loader.loadImager('appendImage');
    
    var ajServiceAttach = $(window).ajaxCall({
            proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data : {
                url:'pkInsert_sysAclRrpRestservices' ,
                language_code : $('#langCode').val(),
                rrp_id : rrp_id,
                restservices_id : restservices_id,
                description : '',
                pk : $("#pk").val()
            }
    })
    ajServiceAttach.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
              dm.dangerMessage({
                  onShown : function () {
                     
                  }
              });
              dm.dangerMessage('show', 'Service Yetkiye Atanamamıştır!...',
                                       'Service ilgili yetkiye atanamamıştır,sistem yöneticisi ile temasa geçiniz...');
          },
          onSuccess : function (event, data) {
            var id = data.lastInsertId;
            sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                    window.tagBuilderPopup.tagCabin('addTagManuallyDataAttr', 
                                                            id, 
                                                            service_name,
                                                            {services_group_id : services_group_id,
                                                             rrp_id : rrp_id,
                                                             restservices_id : restservices_id,
                                                             description : ''});

                    selectedTreeItem = $('#tt_tree_services_popup').tree('find', restservices_id);
                    $('#tt_tree_services_popup').tree('remove', selectedTreeItem.target);
            
                 }
             });
             sm.successMessage('show', 'Servis Yetki Atama İşlemi Başarılı...', 
                                       'Servise yetki atama işlemi gerçekleştirdiniz... ',
                                       data);  
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     loader.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Servis Yetki İşlemi Başarısız...', 
                                       'Servis ilgili yetki ile daha önce ilişkilendirilmiştir, yeni bir servis deneyiniz... ');
          },
    }); 
    ajServiceAttach.ajaxCall('call');
}



    
/**
 * wrapper class for pop up and delete ACL role ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.deleteACLRoleUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteACLRoleUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'ACL Rol Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'ACL rol (Kaynak) silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete ACL role
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 13/07/2016
*/
window.deleteACLRoleUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysAclRoles' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'ACL Rol  Silme İşlemi Başarısız...',
                                     'ACL rol  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclResources" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    
                    var node = $('#tt_tree_menu2').tree('find', id);
                    $('#tt_tree_menu2').tree('remove', node.target);
                    
                    $('#tt_grid_dynamic').datagrid('reload');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                }
            });
            sm.successMessage('show', 'ACL Rol Silme İşleminiz Başarılı...',
                                      'ACL rol  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert ACL role
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.insertACLServicesWrapper = function (e) {
 e.preventDefault();
 var ddData = $('#dropdownACLResources').data('ddslick');
 
 if ($("#aclServiceForm").validationEngine('validate')) {
     
     if(!ddData.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'ACL Resource (Kaynak) Seçiniz', 'Lütfen ACL resource (kaynak) seçiniz!');
         return false;
     }
     insertACLRol();
 }
 return false;
}
   
   
   
/**
 * wrapper for ACL role update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.updateACLRoleDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" ACL rolünü güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="aclServiceFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Rol Eng.</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name+'" name="name_popup" id="name_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Rol</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name_tr+'" name="name_tr_popup" id="name_tr_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">ACL Resource</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownACLResourcesPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="description_popup" id="description_popup" placeholder="Açıklama ...">'+row.description+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateACLRoleWrapper(event, '+id+');">\n\
                                                                 <i class="fa fa-save"></i> Güncelle </button>\n\
                                                             <!--<button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
                                                                 <i class="fa fa-remove"></i> Reset </button>-->\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                     return $message;
                 },
         type: BootstrapDialog.TYPE_PRIMARY,
         onshown : function () {         
            $('#aclServiceFormPopup').validationEngine();
             
            $("#mach-prod-box-popup").loadImager();
            $("#mach-prod-box-popup").loadImager('appendImage');
            
            var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data: { url:'pkFillResourcesDdList_sysAclResources' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxACLResourcesPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                         'ACL resource (kaynak) bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#mach-prod-box-popup').loadImager('removeLoadImage');
                    $('#dropdownACLResourcesPopup').ddslick({
                            height : 200,
                            data : data, 
                            width:'98%',
                            search : true,
                            //imagePosition:"right",
                            onSelected: function(selectedData){
                                if(selectedData.selectedData.value>0) {
                                    /*$('#tt_tree_menu').tree({
                                        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                    });*/
                             }
                         }   
                    });  
                    $('#dropdownACLResourcesPopup').ddslick('selectByValue', 
                                                {index: ''+row.resource_id+'' ,
                                                 text : ''+row.resource_name+''}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                              'ACL resource (kaynak) bulunamamıştır...');
                 },
            }) 
            ajaxACLResourcesPopup.ajaxCallWidget('call');
            
            
         },
         onhide : function() {
             if(window.gridReloadController == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }

         },
     });
     return false;
}

/**
 * update ACL role wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.updateACLRoleWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#aclServiceFormPopup").validationEngine('validate')) {
     
     var ddData = $('#dropdownACLResourcesPopup').data('ddslick');
    if(ddData.selectedData.value>0) {
        updateACLRole(id);
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'ACL Resource Seçiniz', 'Lütfen ACL resource seçiniz!')
    }
    return false;
 }
 return false;
}

/**
 * update ACL role
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.updateACLRole = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownACLResourcesPopup').data('ddslick');
     var resource_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclRoles' ,
                         id : id,
                         name : $('#name_popup').val(),
                         name_tr : $('#name_tr_popup').val(),
                         description : $('#description_popup').val(),
                         parent_id: 0,
                         inherited_id: 0,
                         resource_id : resource_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol Güncelleme İşlemi Başarısız...', 
                                      'ACL rol güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclRoles" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'ACL Rol Güncelleme İşlemi Başarılı...', 
                                       'ACL rol güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol Güncelleme İşlemi Başarısız...', 
                                      'ACL rol güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclRoles" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol Güncelleme İşlemi Başarısız...', 
                                      'ACL rol güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert ACL rol
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.insertACLRol = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var name_tr = $('#name_tr').val();
     var description = $('#description').val();
     
     var ddData = $('#dropdownACLResources').data('ddslick')
     var resource_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysAclRoles' ,
                         name : name,
                         name_tr : name_tr,
                         description : description,
                         parent : 0,
                         inherited_id : 0,
                         resource_id : resource_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'ACL Rol  Ekleme İşlemi Başarısız...', 
                                       'ACL rol ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysAclRoles" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#aclServiceForm')[0].reset();  
                     
                     $('#tt_tree_menu2').tree('append', {
                        data: [{
                                attributes:{ active: 0 },
                                id: data.lastInsertId,
                                text: name,
                                checked: false,
                                state : 'open',
                            },]
                    });

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillRolesPropertiesList_sysAclRoles',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'ACL Rol Kayıt İşlemi Başarılı...', 
                                       'ACL rol kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'ACL Rol Kayıt İşlemi Başarısız...', 
                                       'ACL rol  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysAclRoles" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol  Kayıt İşlemi Başarısız...', 
                                     'ACL rol  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAclRoles" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#aclServiceForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'ACL Rol Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile ACL rol  kaydı yapılmıştır, yeni bir ACL rol deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive ACL rol
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.activePassiveACLRolesWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveACLRole(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'ACL Rol Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'ACL rol aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive ACL rol
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.activePassiveACLRole = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysAclRoles' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol Aktif/Pasif İşlemi Başarısız...', 
                                      'ACL rol aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclRoles" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'ACL Rol Aktif/Pasif İşlemi Başarılı...', 
                                       'ACL rol aktif/pasif işlemini gerçekleştirdiniz... ',
                                       data);
            if($(domElement).hasClass("fa-minus-circle")){
                $(domElement).removeClass("fa-minus-circle");
                $(domElement).addClass("fa-plus-circle");
                
                $(domElement).parent().removeClass("btn-primary");
                $(domElement).parent().addClass("btn-warning");
            } else if($(domElement).hasClass("fa-plus-circle" )) {
                $(domElement).removeClass("fa-plus-circle");
                $(domElement).addClass("fa-minus-circle");
                
                $(domElement).parent().removeClass("btn-warning");
                $(domElement).parent().addClass("btn-primary");
            }
                
                
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol Aktif/Pasif İşlemi Başarısız...', 
                                      'ACL rol aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclRoles" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Rol Aktif/Pasif İşlemi Başarısız...', 
                                      'ACL rol aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
