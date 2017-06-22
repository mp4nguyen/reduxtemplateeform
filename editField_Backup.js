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

            view_ADMIN:false,
            view_PATIENT:false,
            view_INTERNAL_PRACTITIONER:false,
            view_ASSISTANT:false,
            view_EXTERTAL_PRACTITIONER:false,
            view_ORGANIZATION:false,

            edit_ADMIN:false,
            edit_PATIENT:false,
            edit_INTERNAL_PRACTITIONER:false,
            edit_ASSISTANT:false,
            edit_EXTERTAL_PRACTITIONER:false,
            edit_ORGANIZATION:false

        }

    }

    componentWillMount(){

        if(this.props.field){          
          // console.log(' EditField >>> componentWillMount >>> this.props',this.props);
            if (this.props.roles) {
            
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

                                view_ADMIN:this.props.roles.view.list[0].value == "yes" ? true : false,
                                view_PATIENT:this.props.roles.view.list[2].value == "yes" ? true : false,
                                view_INTERNAL_PRACTITIONER:this.props.roles.view.list[4].value == "yes" ? true : false,
                                view_ASSISTANT:this.props.roles.view.list[1].value == "yes" ? true : false,
                                view_EXTERTAL_PRACTITIONER:this.props.roles.view.list[3].value == "yes" ? true : false,
                                view_ORGANIZATION:this.props.roles.view.list[5].value == "yes" ? true : false, 

                                edit_ADMIN:this.props.roles.edit[0].value == "yes" ? true : false,
                                edit_PATIENT:this.props.roles.edit[2].value == "yes" ? true : false,
                                edit_INTERNAL_PRACTITIONER:this.props.roles.edit[4].value == "yes" ? true : false,
                                edit_ASSISTANT:this.props.roles.edit[1].value == "yes" ? true : false,
                                edit_EXTERTAL_PRACTITIONER:this.props.roles.edit[3].value == "yes" ? true : false,
                                edit_ORGANIZATION:this.props.roles.edit[5].value == "yes" ? true : false,


                              });
            }else{
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

                                view_ADMIN: false,
                                view_PATIENT: false,
                                view_INTERNAL_PRACTITIONER: false,
                                view_ASSISTANT: false,
                                view_EXTERTAL_PRACTITIONER: false,
                                view_ORGANIZATION: false, 

                                edit_ADMIN: false,
                                edit_PATIENT: false,
                                edit_INTERNAL_PRACTITIONER: false,
                                edit_ASSISTANT: false,
                                edit_EXTERTAL_PRACTITIONER: false,
                                edit_ORGANIZATION: false
                            });             
            }
          }
    }

    componentWillReceiveProps(nextProps){
        //console.log(' EditField >>> componentWillMount >>> this.props',this.props);
        if(this.props.field){
            if (this.props.roles) {
            
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

                                view_ADMIN:this.props.roles.view.list[0].value == "yes" ? true : false,
                                view_PATIENT:this.props.roles.view.list[2].value == "yes" ? true : false,
                                view_INTERNAL_PRACTITIONER:this.props.roles.view.list[4].value == "yes" ? true : false,
                                view_ASSISTANT:this.props.roles.view.list[1].value == "yes" ? true : false,
                                view_EXTERTAL_PRACTITIONER:this.props.roles.view.list[3].value == "yes" ? true : false,
                                view_ORGANIZATION:this.props.roles.view.list[5].value == "yes" ? true : false, 

                                edit_ADMIN:this.props.roles.edit[0].value == "yes" ? true : false,
                                edit_PATIENT:this.props.roles.edit[2].value == "yes" ? true : false,
                                edit_INTERNAL_PRACTITIONER:this.props.roles.edit[4].value == "yes" ? true : false,
                                edit_ASSISTANT:this.props.roles.edit[1].value == "yes" ? true : false,
                                edit_EXTERTAL_PRACTITIONER:this.props.roles.edit[3].value == "yes" ? true : false,
                                edit_ORGANIZATION:this.props.roles.edit[5].value == "yes" ? true : false,

                              });
            }else{
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

                                view_ADMIN: false,
                                view_PATIENT: false,
                                view_INTERNAL_PRACTITIONER: false,
                                view_ASSISTANT: false,
                                view_EXTERTAL_PRACTITIONER: false,
                                view_ORGANIZATION: false, 

                                edit_ADMIN: false,
                                edit_PATIENT: false,
                                edit_INTERNAL_PRACTITIONER: false,
                                edit_ASSISTANT: false,
                                edit_EXTERTAL_PRACTITIONER: false,
                                edit_ORGANIZATION: false
                            });             
            }
        }
    }

    

    _handleSubmit(isDelete, isOrder, valueOrder){

      console.log('isDelete, isOrder, valueOrder', isDelete, isOrder, valueOrder);

      if (!isDelete) {

        if (!isOrder) {

          var listRoleEdit=[
            {id:1, ref:'edit_ADMIN', value:this.state.edit_ADMIN ? "yes" : "no"},
            {id:2, ref:'edit_ASSISTANT', value:this.state.edit_ASSISTANT ? "yes" : "no"},
            {id:3, ref:'edit_PATIENT', value:this.state.edit_PATIENT ? "yes" : "no"},
            {id:4, ref:'edit_EXTERTAL_PRACTITIONER', value:this.state.edit_EXTERTAL_PRACTITIONER ? "yes" : "no"},
            {id:5, ref:'edit_INTERNAL_PRACTITIONER', value:this.state.edit_INTERNAL_PRACTITIONER ? "yes" : "no"},
            {id:6, ref:'edit_ORGANIZATION', value:this.state.edit_ORGANIZATION ? "yes" : "no"},

          ];

          var listRoleView=[
            {id:1, ref:'view_ADMIN', value:this.state.view_ADMIN ? "yes" : "no"},
            {id:2, ref:'view_ASSISTANT', value:this.state.view_ASSISTANT ? "yes" : "no"},
            {id:3, ref:'view_PATIENT', value:this.state.view_PATIENT ? "yes" : "no"},
            {id:4, ref:'view_EXTERTAL_PRACTITIONER', value:this.state.view_EXTERTAL_PRACTITIONER ? "yes" : "no"},
            {id:5, ref:'view_INTERNAL_PRACTITIONER', value:this.state.view_INTERNAL_PRACTITIONER ? "yes" : "no"},
            {id:6, ref:'view_ORGANIZATION', value:this.state.view_ORGANIZATION ? "yes" : "no"},

          ];

          var roles = {
              edit: listRoleEdit,
              view: {
                list:  listRoleView,
                option: "hide"
              }
          }

          console.log('roles submit', roles);

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
        console.log('newOrEditSection._onChange: componentName = ',componentName);
        console.log('newOrEditSection._onChange: value = ',value);
        var object = {};
        object[componentName] = value;
        this.setState(object);
    }

    _handleSizeChange(event, index, value){
      this.setState({size:value});
    }

    _onCheckViewAllChange(componentName,event,value){        
        this.setState({
            view_ADMIN:value,
            view_PATIENT:value,
            view_INTERNAL_PRACTITIONER:value,
            view_ASSISTANT:value,
            view_EXTERTAL_PRACTITIONER:value,
            view_ORGANIZATION:value
        });
    }

    _onCheckEditAllChange(componentName,event,value){        
        this.setState({
            edit_ADMIN:value,
            edit_PATIENT:value,
            edit_INTERNAL_PRACTITIONER:value,
            edit_ASSISTANT:value,
            edit_EXTERTAL_PRACTITIONER:value,
            edit_ORGANIZATION:value
        });
    }

    _onCheckSubChange(componentName,event,value){        
        var object = {};
        object[componentName] = value;
        this.setState(object);
    }

    

    render() {

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
                  bodyStyle={ styles.dialogBody }
                  style={ styles.dialogRoot }
                  repositionOnUpdate={ false }

                  title={titleName}
                  actions={actions}
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this.handleClose}
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
                          <div className = "row">
                              
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="ADMIN"
                                    checked={this.state.view_ADMIN}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'view_ADMIN')}
                                  />
                              </div>
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="ASSISTANT"
                                    checked={this.state.view_ASSISTANT}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'view_ASSISTANT')}
                                  />
                              </div>
                          </div>
                          <div className = "row">
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="PATIENT"
                                    checked={this.state.view_PATIENT}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'view_PATIENT')}
                                  />
                              </div>
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="EXTERNAL_PRACTITIONER"
                                    checked={this.state.view_EXTERTAL_PRACTITIONER}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'view_EXTERTAL_PRACTITIONER')}
                                  />
                              </div>
                          </div>
                          <div className = "row">
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="INTERNAL_PRACTITIONER"
                                    checked={this.state.view_INTERNAL_PRACTITIONER}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'view_INTERNAL_PRACTITIONER')}
                                  />
                              </div>
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="ORGANIZATION"
                                    checked={this.state.view_ORGANIZATION}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'view_ORGANIZATION')}
                                  />
                              </div>
                          </div>
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

                          <div className = "row">
                              
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="ADMIN"
                                    checked={this.state.edit_ADMIN}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'edit_ADMIN')}
                                  />
                              </div>
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="ASSISTANT"
                                    checked={this.state.edit_ASSISTANT}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'edit_ASSISTANT')}
                                  />
                              </div>
                          </div>
                          <div className = "row">
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="PATIENT"
                                    checked={this.state.edit_PATIENT}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'edit_PATIENT')}
                                  />
                              </div>
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="EXTERNAL_PRACTITIONER"
                                    checked={this.state.edit_EXTERTAL_PRACTITIONER}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'edit_EXTERTAL_PRACTITIONER')}
                                  />
                              </div>
                          </div>
                          <div className = "row">
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="INTERNAL_PRACTITIONER"
                                    checked={this.state.edit_INTERNAL_PRACTITIONER}
                                    labelStyle={{'font-size':'12'}}
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'edit_INTERNAL_PRACTITIONER')}
                                  />
                              </div>
                              <div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                  <Checkbox
                                    label="ORGANIZATION"
                                    checked={this.state.edit_ORGANIZATION}
                                    labelStyle={{'font-size':'12'}}                                    
                                    style={styles.checkbox}
                                    onCheck={this._onCheckSubChange.bind(this,'edit_ORGANIZATION')}
                                  />
                              </div>
                          </div>
                      </div>                
                    </div>
                  </div>
                                     
               </Dialog>
            </div>
          );


    }

}
