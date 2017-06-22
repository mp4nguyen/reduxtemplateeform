import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

export default class EditField extends Component {

    static contextTypes = {      
      updateInfoField: React.PropTypes.func
    }

    static propTypes = {
      sectionID: React.PropTypes.number,
      section: React.PropTypes.object,
      isOpen: React.PropTypes.bool,
      addSection: React.PropTypes.func,
      closeDialog: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        var arrViewCode = this.props.arrViewRoleCode;
        var arrEditCode = this.props.arrEditRoleCode;


        this.state = {
            name:'',
            ref:'',
            preCal:'',
            cal:'',
            label:'',
            labelPrefix:'',
            labelSuffix:'',
            name:'',
            value:null,
            size: 2,
            fieldID: null,
            orderPosition: null,

            arrViewCode : arrViewCode,
            arrEditCode : arrEditCode

        }

    }

    componentWillMount(){

        if(this.props.field){          
          // console.log(' EditField >>> componentWillMount >>> this.props',this.props);

          var newArrView =[];
          var newArrEdit =[];
                  
          if (this.props.field.roles) {
            if (this.props.field.roles && this.props.field.roles.view) {

              var _arrViewCode = [];
              var _arrEditCode = [];

              for (var i = 0; i < this.props.field.roles.view.list.length; i++) {
                var _item = '';
                if (this.props.field.roles.view.list[i].ref.split('_').length >2) {
                  _item = this.props.field.roles.view.list[i].ref.split('_')[1]+'_'+this.props.field.roles.view.list[i].ref.split('_')[2];
                }else{
                  _item = this.props.field.roles.view.list[i].ref.split('_')[1];
                }
                _arrViewCode.push({'code':this.props.field.roles.view.list[i].ref, 'value':this.props.field.roles.view.list[i].value == "yes" ? true : false, 'item': _item});

                var _itemEdit='';
                if (this.props.field.roles.edit[i].ref.split('_').length >2) {
                  _itemEdit = this.props.field.roles.edit[i].ref.split('_')[1]+'_'+this.props.field.roles.edit[i].ref.split('_')[2];
                }else{
                  _itemEdit = this.props.field.roles.edit[i].ref.split('_')[1];
                }
                _arrEditCode.push({'code':this.props.field.roles.edit[i].ref, 'value':this.props.field.roles.edit[i].value == "yes" ? true : false, 'item': _itemEdit});          
              }        

              if (this.props.arrViewRoleCode) {
                if (this.props.arrViewRoleCode.length > _arrViewCode.length) {
                  for (var i = _arrViewCode.length; i < this.props.arrViewRoleCode.length; i++) {                
                    _arrViewCode.push({'code':this.props.arrViewRoleCode[i].code, 'value':this.props.arrViewRoleCode[i].value == "yes" ? true : false, 'item': this.props.arrViewRoleCode[i].item});              
                  }
                  
                }
              }

              if (this.props.arrEditRoleCode) {
                if (this.props.arrEditRoleCode.length > _arrEditCode.length) {
                  for (var i = _arrEditCode.length; i < this.props.arrEditRoleCode.length; i++) {                
                    _arrEditCode.push({'code':this.props.arrEditRoleCode[i].code, 'value':this.props.arrEditRoleCode[i].value == "yes" ? true : false, 'item': this.props.arrEditRoleCode[i].item});              
                  }              
                }
              }

              
            
              // this.setState({                                
              //                   arrViewCode : _arrViewCode,
              //                   arrEditCode : _arrEditCode

              //                 });

              newArrView = _arrViewCode;
              newArrEdit = _arrEditCode;

            }else{
              // this.setState({                                

              //                   arrViewCode : this.props.arrViewRoleCode,
              //                   arrEditCode : this.props.arrEditRoleCode

              //                 });
              newArrView = this.props.arrViewRoleCode;
              newArrEdit = this.props.arrEditRoleCode;
            }
          }else{
              newArrView = this.props.arrViewRoleCode;
              newArrEdit = this.props.arrEditRoleCode;
          }
          
          this.setState({
                                ref: this.props.field.ref,            
                                name: this.props.field.name,
                                preCal:this.props.field.preCal,
                                cal:this.props.field.cal,
                                label:this.props.field.label,
                                labelPrefix:this.props.field.labelPrefix,
                                labelSuffix:this.props.field.labelSuffix,          
                                value:this.props.field.value,
                                size: this.props.field.size ? parseInt(this.props.field.size) : 2,
                                fieldID: this.props.fieldID,  

                                arrViewCode : newArrView,
                                arrEditCode : newArrEdit 

                              });
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log(' EditField >>> componentWillReceiveProps >>> this.props',this.props);
        
        if(this.props.field){          
          // console.log(' EditField >>> componentWillMount >>> this.props',this.props);

          var newArrView =[];
          var newArrEdit =[];
                  
          if (this.props.field.roles) {
            if (this.props.field.roles && this.props.field.roles.view) {

              var _arrViewCode = [];
              var _arrEditCode = [];

              for (var i = 0; i < this.props.field.roles.view.list.length; i++) {
                var _item = '';
                if (this.props.field.roles.view.list[i].ref.split('_').length >2) {
                  _item = this.props.field.roles.view.list[i].ref.split('_')[1]+'_'+this.props.field.roles.view.list[i].ref.split('_')[2];
                }else{
                  _item = this.props.field.roles.view.list[i].ref.split('_')[1];
                }
                _arrViewCode.push({'code':this.props.field.roles.view.list[i].ref, 'value':this.props.field.roles.view.list[i].value == "yes" ? true : false, 'item': _item});

                var _itemEdit='';
                if (this.props.field.roles.edit[i].ref.split('_').length >2) {
                  _itemEdit = this.props.field.roles.edit[i].ref.split('_')[1]+'_'+this.props.field.roles.edit[i].ref.split('_')[2];
                }else{
                  _itemEdit = this.props.field.roles.edit[i].ref.split('_')[1];
                }
                _arrEditCode.push({'code':this.props.field.roles.edit[i].ref, 'value':this.props.field.roles.edit[i].value == "yes" ? true : false, 'item': _itemEdit});          
              }        

              if (this.props.arrViewRoleCode) {
                if (this.props.arrViewRoleCode.length > _arrViewCode.length) {
                  for (var i = _arrViewCode.length; i < this.props.arrViewRoleCode.length; i++) {                
                    _arrViewCode.push({'code':this.props.arrViewRoleCode[i].code, 'value':this.props.arrViewRoleCode[i].value == "yes" ? true : false, 'item': this.props.arrViewRoleCode[i].item});              
                  }
                  
                }
              }

              if (this.props.arrEditRoleCode) {
                if (this.props.arrEditRoleCode.length > _arrEditCode.length) {
                  for (var i = _arrEditCode.length; i < this.props.arrEditRoleCode.length; i++) {                
                    _arrEditCode.push({'code':this.props.arrEditRoleCode[i].code, 'value':this.props.arrEditRoleCode[i].value == "yes" ? true : false, 'item': this.props.arrEditRoleCode[i].item});              
                  }              
                }
              }

              
            
              // this.setState({                                
              //                   arrViewCode : _arrViewCode,
              //                   arrEditCode : _arrEditCode

              //                 });

              newArrView = _arrViewCode;
              newArrEdit = _arrEditCode;
              // console.log('newArrView, newArrEdit',newArrView,newArrEdit);

            }else{
              // this.setState({                                

              //                   arrViewCode : this.props.arrViewRoleCode,
              //                   arrEditCode : this.props.arrEditRoleCode

              //                 });
              newArrView = this.props.arrViewRoleCode;
              newArrEdit = this.props.arrEditRoleCode;
            }
          }else{
              newArrView = this.props.arrViewRoleCode;
              newArrEdit = this.props.arrEditRoleCode;          
          }
          
          this.setState({
                                ref: this.props.field.ref,            
                                name: this.props.field.name,
                                preCal:this.props.field.preCal,
                                cal:this.props.field.cal,
                                label:this.props.field.label,
                                labelPrefix:this.props.field.labelPrefix,
                                labelSuffix:this.props.field.labelSuffix,          
                                value:this.props.field.value,
                                size: this.props.field.size ? parseInt(this.props.field.size) : 2,
                                fieldID: this.props.fieldID,  

                                arrViewCode : newArrView,
                                arrEditCode : newArrEdit 

                              });
        }
    }

    

    _handleSubmit(isDelete, isOrder, valueOrder){

      // console.log('isDelete, isOrder, valueOrder', isDelete, isOrder, valueOrder);

      if (!isDelete) {

        if (!isOrder) {

          var listRoleEdit=[];
          var listRoleView=[];

          for (var i = 0; i < this.state.arrEditCode.length; i++) {
            listRoleEdit.push({'id': i+1, 'ref': this.state.arrEditCode[i].code, 'value': this.state.arrEditCode[i].value ?  "yes" : "no"});
            listRoleView.push({'id': i+1, 'ref': this.state.arrViewCode[i].code, 'value': this.state.arrViewCode[i].value ?  "yes" : "no"});
          }
          
          var roles = {
              edit: listRoleEdit,
              view: {
                list:  listRoleView,
                option: "hide"
              }
          }                

          var valueUpdate = {             
            sectionID : null,
            rowID: null,
            roles: roles
          };

          // console.log('roles submit', roles);

          var FieldUpdate = {  
            ref: this.state.ref,            
            name: this.state.name,
            preCal:this.state.preCal,
            cal:this.state.cal,
            label:this.state.label,
            labelPrefix:this.state.labelPrefix,
            labelSuffix:this.state.labelSuffix,          
            value:this.state.value,
            size: this.state.size,
            roles: roles
          };
          this.context.updateInfoField(this.props.sectionID, this.props.rowID, this.props.fieldID, FieldUpdate, isDelete,isOrder,valueOrder);  
        }else{// order field
          this.context.updateInfoField(this.props.sectionID, this.props.rowID, this.props.fieldID, FieldUpdate, isDelete,isOrder,valueOrder);  
        }           
      }else{
        this.context.updateInfoField(this.props.sectionID, this.props.rowID, this.props.fieldID, FieldUpdate, isDelete,isOrder,valueOrder);
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
        var object = {};
        object[componentName] = value;
        this.setState(object);
    }

    _handleSizeChange(event, index, value){
      this.setState({size:value});
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

    

    render() {


        // console.log('this.props>>> inputText', this.props);
        // console.log('this.state>>> inputText', this.state);

          const actions = [

            <FlatButton
              label="Delete Field"
              secondary={true}
              onTouchTap={this._handleSubmit.bind(this,true,false,-1)}
            />,
            <FlatButton
              label="Order Field"              
              onTouchTap={this._handleSubmit.bind(this,false,true,this.state.orderPosition)}
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
              onTouchTap={this._handleSubmit.bind(this,false,false,-1)}
            />,
          ];

          var titleName = this.props.field? 'Edit Info Field: '+ this.props.field.name:'Edit Info Field';

          var styles = {
            dialogRoot: {
              display: 'right',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 0,              
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
                  contentStyle={ styles.dialogContent }
                  
                  style={ styles.dialogRoot }
                  

                  title={titleName}
                  actions={actions}
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this.handleClose}

                  bodyStyle={{overflow: 'auto', position: 'relative'}}
                  repositionOnUpdate={{false}}
                  autoScrollBodyContent={{true}}
                  autoDetectWindowHeight={{false}}
                >

                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                         style={{width:'100%'}} 
                         name='ref'                     
                         disabled={true}
                         floatingLabelText="Ref"
                         floatingLabelFixed={true}
                         value={this.state.ref}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        style={{width:'100%'}} 
                        name='name'                   
                        floatingLabelStyle={{'font-size':'19'}}   
                        floatingLabelText="Field name"
                        floatingLabelFixed={true}
                        value={this.state.name}
                        onChange={this._onChange.bind(this,'name')}
                     />
                    </div>
                  </div>

                    
                    
                   <TextField
                      style={{width:'100%'}} 
                      name='preCal'    
                      floatingLabelStyle={{'font-size':'19'}}                     
                      floatingLabelText="PreCal"
                      floatingLabelFixed={true}
                      value={this.state.preCal}
                      onChange={this._onChange.bind(this,'preCal')}
                   />                    
                   <TextField
                      style={{width:'100%'}} 
                      name='cal'                      
                      floatingLabelStyle={{'font-size':'19'}}   
                      floatingLabelText="Calculation"
                      floatingLabelFixed={true}
                      value={this.state.cal}
                      onChange={this._onChange.bind(this,'cal')}
                   />

                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                        style={{width:'100%'}} 
                        name='label' 
                        floatingLabelStyle={{'font-size':'19'}}                        
                        floatingLabelText="Label"
                        floatingLabelFixed={true}
                        value={this.state.label}
                        onChange={this._onChange.bind(this,'label')}
                     />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        style={{width:'100%'}} 
                        name='labelPrefix'                      
                        floatingLabelStyle={{'font-size':'19'}}   
                        floatingLabelText="LabelPrefix"
                        floatingLabelFixed={true}
                        value={this.state.labelPrefix}
                        onChange={this._onChange.bind(this,'labelPrefix')}
                     />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                        style={{width:'100%'}} 
                        name='labelSuffix'                      
                        floatingLabelStyle={{'font-size':'19'}}   
                        floatingLabelText="LabelSuffix"
                        floatingLabelFixed={true}
                        value={this.state.labelSuffix}
                        onChange={this._onChange.bind(this,'labelSuffix')}
                     />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        style={{width:'100%'}} 
                        name='value'                      
                        floatingLabelStyle={{'font-size':'19'}}   
                        floatingLabelText="Value"
                        floatingLabelFixed={true}
                        value={this.state.value}
                        onChange={this._onChange.bind(this,'value')}
                     />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <SelectField
                          floatingLabelText="Size"
                          floatingLabelStyle={{'font-size':'19'}}
                          value={this.state.size}
                          onChange={this._handleSizeChange.bind(this)}
                      >
                          <MenuItem value={1} primaryText="1" />
                          <MenuItem value={2} primaryText="2" />
                          <MenuItem value={3} primaryText="3" />
                          <MenuItem value={4} primaryText="4" />
                          <MenuItem value={5} primaryText="5" />
                          <MenuItem value={6} primaryText="6" />
                          <MenuItem value={7} primaryText="7" />
                          <MenuItem value={8} primaryText="8" />
                          <MenuItem value={9} primaryText="9" />
                          <MenuItem value={10} primaryText="10" />
                          <MenuItem value={11} primaryText="11" />
                          <MenuItem value={12} primaryText="12" />
                      </SelectField>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                              <TextField
                                style={{width:'100%'}} 
                                name='fieldID'    
                                disabled={true}                  
                                floatingLabelStyle={{'font-size':'19'}}   
                                floatingLabelText="Field Pos."
                                floatingLabelFixed={true}
                                value={this.state.fieldID}
                                onChange={this._onChange.bind(this,'fieldID')}
                             />
                            </div>
                            <div className="col-md-6">
                              <TextField
                                style={{width:'100%'}} 
                                name='orderPosition'                      
                                floatingLabelStyle={{'font-size':'19'}}   
                                floatingLabelText="Order Pos."
                                floatingLabelFixed={true}
                                value={this.state.orderPosition}
                                onChange={this._onChange.bind(this,'orderPosition')}
                             />  
                            </div>
                        </div>
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
                                  <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
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
                                    <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
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
                                     
               </Dialog>
            </div>
          );


    }

}
