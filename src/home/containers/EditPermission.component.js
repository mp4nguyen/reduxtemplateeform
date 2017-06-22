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

        var arrViewCode = this.props.arrViewRoleCode;
        var arrEditCode = this.props.arrEditRoleCode;


        this.state = {           

            arrViewCode : arrViewCode,
            arrEditCode : arrEditCode
            
        }

    }

    componentWillMount(){
        
      console.log(' Row permission >>> componentWillMount >>> this.props',this.props);
        if (this.props.roles && this.props.roles.view) {

          var _arrViewCode = [];
          var _arrEditCode = [];

          for (var i = 0; i < this.props.roles.view.list.length; i++) {
            var _item = '';
            if (this.props.roles.view.list[i].ref.split('_').length >2) {
              _item = this.props.roles.view.list[i].ref.split('_')[1]+'_'+this.props.roles.view.list[i].ref.split('_')[2];
            }else{
              _item = this.props.roles.view.list[i].ref.split('_')[1];
            }
            _arrViewCode.push({'code':this.props.roles.view.list[i].ref, 'value':this.props.roles.view.list[i].value == "yes" ? true : false, 'item': _item});

            var _itemEdit='';
            if (this.props.roles.edit[i].ref.split('_').length >2) {
              _itemEdit = this.props.roles.edit[i].ref.split('_')[1]+'_'+this.props.roles.edit[i].ref.split('_')[2];
            }else{
              _itemEdit = this.props.roles.edit[i].ref.split('_')[1];
            }
            _arrEditCode.push({'code':this.props.roles.edit[i].ref, 'value':this.props.roles.edit[i].value == "yes" ? true : false, 'item': _itemEdit});          
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

          var arrViewCode = 
        
          this.setState({                                
                            arrViewCode : _arrViewCode,
                            arrEditCode : _arrEditCode

                          });
        }else{
          this.setState({                                

                            arrViewCode : this.props.arrViewRoleCode,
                            arrEditCode : this.props.arrEditRoleCode

                          });
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(' Row permission >>> componentWillMount >>> this.props',this.props);
        
        if (this.props.roles && this.props.roles.view) {

          var _arrViewCode = [];
          var _arrEditCode = [];

          for (var i = 0; i < this.props.roles.view.list.length; i++) {
            var _item = '';
            if (this.props.roles.view.list[i].ref.split('_').length >2) {
              _item = this.props.roles.view.list[i].ref.split('_')[1]+'_'+this.props.roles.view.list[i].ref.split('_')[2];
            }else{
              _item = this.props.roles.view.list[i].ref.split('_')[1];
            }
            _arrViewCode.push({'code':this.props.roles.view.list[i].ref, 'value':this.props.roles.view.list[i].value == "yes" ? true : false, 'item': _item});

            var _itemEdit='';
            if (this.props.roles.edit[i].ref.split('_').length >2) {
              _itemEdit = this.props.roles.edit[i].ref.split('_')[1]+'_'+this.props.roles.edit[i].ref.split('_')[2];
            }else{
              _itemEdit = this.props.roles.edit[i].ref.split('_')[1];
            }
            _arrEditCode.push({'code':this.props.roles.edit[i].ref, 'value':this.props.roles.edit[i].value == "yes" ? true : false, 'item': _itemEdit});          
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

          var arrViewCode = 
        
          this.setState({                                
                            arrViewCode : _arrViewCode,
                            arrEditCode : _arrEditCode

                          });
        }else{
          this.setState({                                

                            arrViewCode : this.props.arrViewRoleCode,
                            arrEditCode : this.props.arrEditRoleCode

                          });
        }
    }

    

    _handleSubmit(){

      // console.log('isDelete, isOrder, valueOrder', isDelete, isOrder, valueOrder);
      var type = this.props.type;

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

          console.log('this.state.arrViewCode>>>>>>>', this.state.arrViewCode);

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
