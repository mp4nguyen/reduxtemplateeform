import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';
import EditField from './EditField.component';




export default class SignatureDoctor extends Component {

    static contextTypes = {
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array  
    }

    static propTypes = {
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {           
            open: false
        }       
    }

    handleClick(e){
        e.preventDefault();
        if (e.button==2) { 
          this._handleOpen();        
        }
    }

    _handleOpen(){
      this.setState({open: true});
    }

    _handleClose(){
      this.setState({open: false});
    }

    render() {

        var isDisabled = false;
        var isVisible = true;

        if(this.props.isDisabled){
            isDisabled = this.props.isDisabled;
        }

        if(this.props.isVisible){
            isVisible = this.props.isVisible;
        }

        // var userRoleStr = this.props.userRole.RoleVs[0].RoleCode;

        // var arrRolesEdit =  null;
        // var arrRolesView =  null;
        
        // if (this.props.roles) {
        //     arrRolesEdit =  this.props.roles.edit;
        //     arrRolesView =  this.props.roles.view.list;    
        //     isDisabled=util.getDisabled(arrRolesEdit, userRoleStr);
        //     isVisible=util.getVisible(arrRolesView, userRoleStr);
        // }

        //console.log('vo render Signature Doctor');

        var type = this.props.type;
        var html = null;
        var htmlSignature = (this.imageSignature)?<img ref="sign"/>:'No signature';
        var display = (
            <div className="col-xs-12" style={{border: '1px solid green'}}>
                <input  type="text" name={this.props.name} className="form-control has-danger" 
                        onMouseDown={this.handleClick.bind(this)}                                                                           
                        readOnly
                />
            </div>
        )

        switch(type){
            case 'eform_input_image_doctor':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        <EditField  isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} rowID={this.props.rowID} 
                            fieldID={this.props.fieldID} field={this.props.field} roles = {this.props.roles}
                            arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                       
                            {display}
                       
                    </div>
                )
        }
        return html;

    }
}
