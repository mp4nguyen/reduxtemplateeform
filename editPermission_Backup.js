import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

export default class EditPermission extends Component {

    static contextTypes = {      
      updateInfoHome: React.PropTypes.func,
      updateInfoSection: React.PropTypes.func,
      updateInfoRow: React.PropTypes.func
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
        
      console.log(' Row permission >>> componentWillMount >>> this.props',this.props);
        if (this.props.roles && this.props.roles.view) {
        
          this.setState({                                
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
                            edit_ORGANIZATION: false,


                          });
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(' Row permission >>> componentWillMount >>> this.props',this.props);
        
        if (this.props.roles && this.props.roles.view) {
        
          this.setState({                                
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
                            edit_ORGANIZATION: false,


                          });
        }        
    }

    

    _handleSubmit(){

      // console.log('isDelete, isOrder, valueOrder', isDelete, isOrder, valueOrder);
      var type = this.props.type;
    
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

      var valueUpdate = {             
        sectionID : null,
        rowID: null,
        roles: roles
      };

      if (type == 'home') {
        this.context.updateInfoHome(roles);
      }else if (type == 'section') {
        valueUpdate.sectionID = this.props.sectionID;
        this.context.updateInfoSection(valueUpdate);
      }else if (type == 'row') {
        console.log('vo row', valueUpdate);
        valueUpdate.sectionID = this.props.sectionID;
        valueUpdate.rowID = this.props.rowID;
        this.context.updateInfoRow(valueUpdate);
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
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._handleSubmit.bind(this)}
            />,
          ];

          var titleName = 'Edit Info Permission';

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
                  open={this.props.isOpenPermission}
                  onRequestClose={this.handleClose}
                >
                                                  
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


// <EditPermission isOpenPermission={this.state.openPermission} closeDialog={this._handleClosePermission.bind(this)} type = 'home' roles = {_roles} arrViewRoleCode = {arrViewRoleCode} arrEditRoleCode={arrEditRoleCode}/>
<EditPermission isOpenPermission={this.state.openPermission} closeDialog={this._handleClosePermission.bind(this)} type='section' roles = {this.props.section.roles} sectionID = {this.props.sectionID} />
<EditPermission isOpenPermission={this.state.openPermission} closeDialog={this._handleClosePermission.bind(this)} type='row' roles = {this.props.roles} sectionID = {this.props.sectionID} rowID = {this.props.rowID} />

<div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                      <Checkbox
                                        label={viewCodeItem.item}
                                        checked={viewCodeItem.value}
                                        labelStyle={{'font-size':'12'}}
                                        style={styles.checkbox}
                                        onCheck={this._onCheckSubChangeEdit.bind(this,viewCodeItem.code)}
                                      />
                                  </div>  


<div className ="col-lg-6 col-md-6 eform-font-sm eform-word-wrap">
                                        <Checkbox
                                          label={editCodeItem.item}
                                          checked={editCodeItem.value}
                                          labelStyle={{'font-size':'12'}}
                                          style={styles.checkbox}
                                          onCheck={this._onCheckSubChangeEdit.bind(this,editCodeItem.code)}
                                        />
                                    </div>                                           