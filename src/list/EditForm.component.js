import React, { Component } from 'react';
import {printRequest,postRequest,getRequest} from '../redux/lib/request';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

export default class EditForm extends Component {

    static contextTypes = {      
      updateInfoTemplate: React.PropTypes.func,      
      removeTemplate: React.PropTypes.func
    }

    static propTypes = {
      // sectionID: React.PropTypes.number,
      // section: React.PropTypes.object,
      // isOpen: React.PropTypes.bool,
      // addSection: React.PropTypes.func,
      // closeDialog: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        console.log('this props super', this.props);
        var arrViewCode = this.props.arrViewRoleCode;
        var arrEditCode = this.props.arrEditRoleCode;
        var arrPrintCode = this.props.arrPrintRoleCode;


        this.state = {           
            name:'',           
            printType: '',           
            arrViewCode : arrViewCode,
            arrEditCode : arrEditCode,
            arrPrintCode : arrPrintCode,
            formID:''
        }

    }

    // componentWillMount(){

    //     var formName = '';
    //     var formID='';

    //     if(this.props.data){          
    //       // console.log(' Editform >>> componentWillMount >>> this.props',this.props);

    //       formName = this.props.data.Name;
    //       formID = this.props.data.ID;

    //       var newArrView =[];
    //       var newArrEdit =[];
    //       var newArrPrint =[];
                  
    //       if (this.props.data.Roles && this.props.data.Roles.lẹngth>0) {
            
    //           var _arrViewCode = [];
    //           var _arrEditCode = [];
    //           var _arrPrintCode = [];

    //           for (var i = 0; i < this.props.data.Roles.length; i++) {
    //             var _item = '';
                
    //             _item = 'view_'+this.props.data.Roles[i].RoleCode;
                
    //             _arrViewCode.push({'code':_item, 'value':this.props.data.Roles[i].RelEFormTemplateRole.View == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});

    //             var _itemEdit='';
                
    //             _itemEdit = 'edit'+this.props.data.Roles[i].RoleCode;
                
    //             _arrEditCode.push({'code':_itemEdit, 'value':this.props.data.Roles[i].RelEFormTemplateRole.Edit == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});  

    //             var _itemPrint='';
                
    //             _itemPrint = 'print'+this.props.data.Roles[i].RoleCode;
                
    //             _arrPrintCode.push({'code':_itemPrint, 'value':this.props.data.Roles[i].RelEFormTemplateRole.Print == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});          
    //           }                    
                                    
    //           newArrView = _arrViewCode;
    //           newArrEdit = _arrEditCode;
    //           newArrPrint = _arrPrintCode;

                    
    //       }else{
    //           console.log('this.props.arrViewRoleCode 1', this.props.arrViewRoleCode);
    //           newArrView = this.props.arrViewRoleCode;
    //           newArrEdit = this.props.arrEditRoleCode;
    //           newArrPrint = this.props.arrPrintRoleCode;
    //       }
          
    //       this.setState({                                
    //                             name: formName,                                
    //                             printType: this.props.data.PrintType ? this.props.data.PrintType : 'itext',                                
    //                             arrViewCode : newArrView,
    //                             arrEditCode : newArrEdit,
    //                             arrPrintCode : newArrPrint,
    //                             formID: formID

    //                           });
    //     }
    // }

    componentWillReceiveProps(nextProps){
        console.log(' Editform >>> componentWillReceiveProps >>> this.props',this.props, 'length 1', this.props.data.Roles.length);

        var formName = '';
        var formID='';

        var lengthRoles = this.props.data.Roles.length;

        var self = this;

        if(this.props.data){          
          console.log('viiii',this.props.data.Roles, 'length', this.props.data.Roles.length);

          formName = this.props.data.Name;
          formID = this.props.data.ID;

          var newArrView =[];
          var newArrEdit =[];
          var newArrPrint =[];
                  
          if (this.props.data.Roles) {

              console.log('viiii length',this.props.data.Roles.lẹngth);

              if (lengthRoles>0) {

                console.log('viiii if',self.props.data.Roles, lengthRoles);
              
                var _arrViewCode = [];
                var _arrEditCode = [];
                var _arrPrintCode = [];

                for (var i = 0; i < lengthRoles; i++) {

                  console.log('_item view 000', this.props.data.Roles);
                  var _item = '';
                  
                  _item = 'view_'+this.props.data.Roles[i].RoleCode;
                  console.log('_item view', _item);
                  
                  _arrViewCode.push({'code':_item, 'value':this.props.data.Roles[i].RelEFormTemplateRole.View == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});

                  console.log('_arrViewCode >>>', _arrViewCode);

                  var _itemEdit='';
                  
                  _itemEdit = 'edit'+this.props.data.Roles[i].RoleCode;
                  
                  _arrEditCode.push({'code':_itemEdit, 'value':this.props.data.Roles[i].RelEFormTemplateRole.Edit == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});  

                  var _itemPrint='';
                  
                  _itemPrint = 'print'+this.props.data.Roles[i].RoleCode;
                  
                  _arrPrintCode.push({'code':_itemPrint, 'value':this.props.data.Roles[i].RelEFormTemplateRole.Print == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});          
                }                    
                                      
                newArrView = _arrViewCode;
                newArrEdit = _arrEditCode;
                newArrPrint = _arrPrintCode;

                console.log('newArrView >>>>>>', newArrView);

              }else{
                console.log('this.props.arrViewRoleCode 1', this.props.arrViewRoleCode);
                newArrView = this.props.arrViewRoleCode;
                newArrEdit = this.props.arrEditRoleCode;
                newArrPrint = this.props.arrPrintRoleCode;
              }

          }else{
              console.log('this.props.arrViewRoleCode 1', this.props.arrViewRoleCode);
              newArrView = this.props.arrViewRoleCode;
              newArrEdit = this.props.arrEditRoleCode;
              newArrPrint = this.props.arrPrintRoleCode;
          }
          
          this.setState({                                
                                name: formName,                                
                                printType: this.props.data.PrintType ? this.props.data.PrintType : 'itext',                                
                                arrViewCode : newArrView,
                                arrEditCode : newArrEdit,
                                arrPrintCode : newArrPrint,
                                formID: formID

                              });
        }
    }

    // componentDidUpdate(prevProps,prevState){
    //   console.log('prevProps', prevProps, 'this.props', this.props);  
    //   console.log('this.state componentDidUpdate', this.state); 

      

    //   if (this.state.name == undefined && this.props.data.Name) {

    //     if (this.props.data.Roles) {
            
    //       var _arrViewCode = [];
    //       var _arrEditCode = [];
    //       var _arrPrintCode = [];

    //       for (var i = 0; i < this.props.data.Roles.length; i++) {
    //         var _item = '';
            
    //         _item = 'view_'+this.props.data.Roles[i].RoleCode;
            
    //         _arrViewCode.push({'code':_item, 'value':this.props.data.Roles[i].RelEFormTemplateRole.View == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});

    //         var _itemEdit='';
            
    //         _itemEdit = 'edit'+this.props.data.Roles[i].RoleCode;
            
    //         _arrEditCode.push({'code':_itemEdit, 'value':this.props.data.Roles[i].RelEFormTemplateRole.Edit == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});  

    //         var _itemPrint='';
            
    //         _itemPrint = 'print'+this.props.data.Roles[i].RoleCode;
            
    //         _arrPrintCode.push({'code':_itemPrint, 'value':this.props.data.Roles[i].RelEFormTemplateRole.Print == "Y" ? true : false, 'item': this.props.data.Roles[i].RoleCode, 'ID': this.props.data.Roles[i].ID});          
    //       }                    
                                
    //       var newArrView = _arrViewCode;
    //       var newArrEdit = _arrEditCode;
    //       var newArrPrint = _arrPrintCode;

                
    //     }

    //     console.log('newArrView abc', newArrView, newArrEdit, newArrPrint)

    //     this.setState({
    //       name: this.props.data.Name,
    //       formID: this.props.data.ID,
    //       printType: this.props.data.PrintType,
    //       arrViewCode : newArrView,
    //       arrEditCode : newArrEdit,
    //       arrPrintCode : newArrPrint,
    //     })
    //   }          
    // }

    _handleSubmit(isDelete){

      console.log('this.state _handleSubmit', this.state);

      if (!isDelete) {      

        var Permission = [];
        var newName = this.state.name;
        var newForm = this.props.data;

        if (!newForm.Roles) {
          newForm["Roles"] = [];          
        }

        var _formID = this.state.formID;
        var _printType = this.state.printType;

        console.log('this.state.arrEditCode when submit',this.state.arrEditCode, this.props.arrEditRoleCode);

        for (var i = 0; i < this.props.arrEditRoleCode.length; i++) {
          
          Permission.push({
              RoleID: this.props.arrEditRoleCode[i].ID,
              View: this.state.arrViewCode[i].value ?  "Y" : "N",
              Edit: this.state.arrEditCode[i].value ?  "Y" : "N",
              Print: this.state.arrPrintCode[i].value ?  "Y" : "N",
              EFormTemplateID: this.state.formID
          })

          if (newForm.Roles.length>0) {
              console.log('newForm.Roles', newForm.Roles);
              if (newForm.Roles[i]) {
                  newForm.Roles[i].RelEFormTemplateRole = {
                  RoleID: this.state.arrEditCode[i].ID,
                  View: this.state.arrViewCode[i].value ?  "Y" : "N",
                  Edit: this.state.arrEditCode[i].value ?  "Y" : "N",
                  Print: this.state.arrPrintCode[i].value ?  "Y" : "N",
                  EFormTemplateID: this.state.formID
                }
              }              
          }else{

              var UID = i+1;
              var strUID = UID.toString() + UID.toString() + UID.toString();
              newForm.Roles.push({
                RelEFormTemplateRole : {
                                          RoleID: this.state.arrEditCode[i].ID,
                                          View: this.state.arrViewCode[i].value ?  "Y" : "N",
                                          Edit: this.state.arrEditCode[i].value ?  "Y" : "N",
                                          Print: this.state.arrPrintCode[i].value ?  "Y" : "N",
                                          EFormTemplateID: this.state.formID
                                        },
                CreatedBy:null,
                CreatedDate:null,
                Description:"desc1",
                ID:this.state.arrEditCode[i].ID,
                ModifiedBy:null,
                ModifiedDate:null,
                RoleCode:this.state.arrEditCode[i].item,
                RoleName:this.state.arrEditCode[i].item.toLowerCase(),
                UID:strUID
                 
              })
          }
          

        }      
        
        console.log('Permission to save', Permission);
        console.log('this.state submit', this.state);
        
        postRequest('/eformtemplate/saveRoles',{data: Permission}).then(responseRole => {  
          console.log('api roles');
          postRequest('/eformtemplate/updatePrintType',{userUID: "f88209a6-d0ba-49fa-b1e9-cbb37a9e4108", printType: _printType, id:_formID}).then(responsePrintType => {  
            console.log('api print type');
            
            newForm.Name = newName;
            newForm.PrintType = _printType

            console.log('newForm submit', newForm);
            
            postRequest('/eformtemplate/update',{ name: newName, id: _formID, userUID: "f88209a6-d0ba-49fa-b1e9-cbb37a9e4108"}).then(responseRole => {  
              console.log('api name');

              this.context.updateInfoTemplate(this.props.data.ID, newForm);      

            },function(err){
              console.log('err name',err);
            });          
          },function(err){
            console.log('err print type',err);
          });
        },function(err){
          console.log('err role',err);
        });
                 
      }else{

        var self = this;
        swal({
            title: 'Are you sure?',
            text: 'You will remove this eform',
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            allowOutsideClick: true,
            showLoaderOnConfirm: true
        }, function() {
            postRequest('/eformtemplate/remove',{ id: self.state.formID}).then(responseRemove => {  

                    swal("Success!", "Your e-form has been removed.", "success");    
                    self.context.removeTemplate(self.props.data.ID);                
                })
        })

        
      }
      this._handleClose();
    }


    _handleClose(){
        
        if(this.props.closeDialog){
            this.props.closeDialog()
        }
    };

    _onChange(componentName,event,value){
        // console.log('newOrEditSection._onChange: componentName = ',componentName);
        // console.log('newOrEditSection._onChange: value = ',value);
        
        this.setState({
          name: value
        });
    }

    _handlePrintTypeChange(event, index, value){
      this.setState({printType:value});
    }

    _onCheckViewAllChange(componentName,event,value){        
        var _arrViewCode = [];        
        for (var i = 0; i < this.props.arrViewRoleCode.length; i++) {
          _arrViewCode.push({'code':this.props.arrViewRoleCode[i].code, 'value': value, 'item': this.props.arrViewRoleCode[i].item });          
        }     
        this.setState({                                
                        arrViewCode : _arrViewCode                        
                      });
    }

    _onCheckEditAllChange(componentName,event,value){        
        var _arrEditCode = [];        
        for (var i = 0; i < this.props.arrEditRoleCode.length; i++) {
          _arrEditCode.push({'code':this.props.arrEditRoleCode[i].code, 'value': value, 'item' : this.props.arrEditRoleCode[i].item});          
        }     
        this.setState({                                
                        arrEditCode : _arrEditCode                       
                      });
    }

    _onCheckPrintAllChange(componentName,event,value){        
        var _arrPrintCode = [];        
        for (var i = 0; i < this.props.arrPrintRoleCode.length; i++) {
          _arrPrintCode.push({'code':this.props.arrPrintRoleCode[i].code, 'value': value, 'item' : this.props.arrPrintRoleCode[i].item});          
        }     
        this.setState({                                
                        arrPrintCode : _arrPrintCode                       
                      });
    }

    _onCheckSubChange(componentName,event,value){        
        var _arrViewCode = this.state.arrViewCode;    
        
        for (var i = 0; i < _arrViewCode.length; i++) {
          if (_arrViewCode[i].code == componentName ) {
              _arrViewCode[i].value = value;
          } 
        }      

        this.setState({                                
                        arrViewCode : _arrViewCode                        
                      });
    }

    _onCheckSubChangeEdit(componentName,event,value){      
    
        var _arrEditCode = this.state.arrEditCode;    
        
        for (var i = 0; i < _arrEditCode.length; i++) {
          if (_arrEditCode[i].code == componentName ) {
              _arrEditCode[i].value = value;
          } 
        }      

        this.setState({                                
                        arrEditCode : _arrEditCode                       
                      });
    }

    _onCheckSubChangePrint(componentName,event,value){      
    
        var _arrPrintCode = this.state.arrPrintCode;    
        
        for (var i = 0; i < _arrPrintCode.length; i++) {
          if (_arrPrintCode[i].code == componentName ) {
              _arrPrintCode[i].value = value;
          } 
        }      

        this.setState({                                
                        arrPrintCode : _arrPrintCode                       
                      });
    }

    

    render() {


        console.log('this.props>>> render', this.props);
        console.log('this.state>>> render', this.state);
        // console.log('this.state>>> inputText', this.state);

          const actions = [

            <FlatButton
              label="Delete Form"
              secondary={true}
              onTouchTap={this._handleSubmit.bind(this,true)}
            />,           
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._handleSubmit.bind(this,false)}
            />,
          ];

          var titleName = this.props.data? 'Edit Info Form: '+ this.props.data.Name:'Edit Info Form';

          var styles = {
            dialogRoot: {
              display: 'right',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 0,
              height: '100%'              
            },
            dialogContent: {
              position: 'relative',
              width: '100%',
              maxWidth: 600
            },
            dialogBody: {
              paddingBottom: 0
            }
          };

          return (
            <div>
                <Dialog                  
                  
                  title={titleName}
                  actions={actions}
                  modal={false}
                  
                  
                  bodyStyle={{overflow: 'auto', position: 'relative'}}
                  repositionOnUpdate={{false}}
                  autoScrollBodyContent={{true}}
                  autoDetectWindowHeight={{false}}

                  open={this.props.isOpen}
                  onRequestClose={this.handleClose}
                >

                  <div className="row">       
                          
                    <div className="col-md-12">
                      <TextField
                        style={{width:'100%'}} 
                        name='name'                   
                        floatingLabelStyle={{'font-size':'19'}}   
                        floatingLabelText="Template name"
                        floatingLabelFixed={true}
                        value={this.state.name}
                        onChange={this._onChange.bind(this,'name')}
                     />
                    </div>
                                                                                                                                            
                  </div>
                  <div className="row">       
                    <div className="col-md-6">
                      <TextField
                         style={{width:'100%'}} 
                         name='formID'                     
                         disabled={true}
                         floatingLabelText="ID"
                         floatingLabelFixed={true}
                         value={this.state.formID}
                      />
                    </div>                                                                                                                                 
                    <div className="col-md-6">
                      <SelectField
                          floatingLabelText="Print Type"
                          floatingLabelStyle={{'font-size':'19'}}
                          value={this.state.printType}
                          onChange={this._handlePrintTypeChange.bind(this)}
                      >
                          <MenuItem value={"itext"} primaryText="IText Report" />
                          <MenuItem value={"jasper"} primaryText="Jasper Report" />
                          <MenuItem value={"dynamicJasper"} primaryText="Dynamic Jasper Report" />                          
                      </SelectField>
                    </div>
                      
                  </div>
                  
                 
                  <div className="row" style={{'margin-top':'20px'}}>
                    <div className="col-md-12">
                      <div className="form-group">
                          <div className="icheck-inline">
                              <Checkbox                                
                                label="Check All View"
                                style={styles.checkbox}
                                onCheck={this._onCheckViewAllChange.bind(this,'checkAllView')}
                              />
                          </div>
                           {
                              this.state.arrViewCode.map((viewCodeItem, index) => (
                                  <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap" key={index}>
                                      <Checkbox
                                        label={viewCodeItem.item}
                                        checked={viewCodeItem.value}
                                        labelStyle={{'font-size':'12'}}
                                        style={styles.checkbox}
                                        onCheck={this._onCheckSubChange.bind(this,viewCodeItem.code)}
                                      />
                                  </div>   
                              ))
                            }
                      </div>                
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                          <div className="icheck-inline">
                              <Checkbox
                                label="Check All Edit"
                                style={styles.checkbox}
                                onCheck={this._onCheckEditAllChange.bind(this,'checkAllEdit')}
                              />
                          </div>

                           {
                                this.state.arrEditCode.map((editCodeItem, index) => (
                                    <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap" key={index}>
                                        <Checkbox
                                          label={editCodeItem.item}
                                          checked={editCodeItem.value}
                                          labelStyle={{'font-size':'12'}}
                                          style={styles.checkbox}
                                          onCheck={this._onCheckSubChangeEdit.bind(this,editCodeItem.code)}
                                        />
                                    </div>   
                                ))
                            }

                      </div>                
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                          <div className="icheck-inline">
                              <Checkbox
                                label="Check All Print"
                                style={styles.checkbox}
                                onCheck={this._onCheckPrintAllChange.bind(this,'checkAllPrint')}
                              />
                          </div>

                           {
                                this.state.arrPrintCode.map((printCodeItem, index) => (
                                    <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap" key={index}>
                                        <Checkbox
                                          label={printCodeItem.item}
                                          checked={printCodeItem.value}
                                          labelStyle={{'font-size':'12'}}
                                          style={styles.checkbox}
                                          onCheck={this._onCheckSubChangePrint.bind(this,printCodeItem.code)}
                                        />
                                    </div>   
                                ))
                            }

                      </div>                
                    </div>
                  </div>
                                     
               </Dialog>
            </div>
          );


    }

}
