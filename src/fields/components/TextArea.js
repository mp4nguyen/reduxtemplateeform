import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';
import EditField from './EditField.component';



export default class TextArea extends Component {

    static contextTypes = {
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array  
    }

    static propTypes = {
      name: React.PropTypes.string,
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

    // updateField(event){
    //     this.context.updateField(this.props.sectionID,this.props.rowID,this.props.fieldID,event.target.value);
    // }

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

        // var isConcat = false;
        // var isHaveCal = false;

        // if (this.props.roles) {
        //     arrRolesEdit =  this.props.roles.edit;
        //     arrRolesView =  this.props.roles.view.list;
        //     isVisible = util.getVisible(arrRolesView, userRoleStr);
        //     if (this.props.cal) {
        //         isConcat = this.props.cal.startsWith("CONCAT");
        //         isHaveCal=true;
        //     }
        //     if (this.props.preCal) {
        //         isConcat = this.props.preCal.startsWith("CONCAT");
        //         isHaveCal=true;
        //     }
        //     // if (isConcat == false && isHaveCal == true) {
        //     //     isDisabled = true;
        //     // }else{
        //     //     isDisabled = util.getDisabled(arrRolesEdit, userRoleStr);
        //     // }
        //     isDisabled = util.getDisabled(arrRolesEdit, userRoleStr);
        // }

        var type = this.props.type;
        var html = null;
        var display_name = null;
        if(this.props.permission === 'eformDev'){
            display_name = (
                <div style={{position: 'absolute', top: -30, left: 0, backgroundColor: 'green', color: 'white', padding: 5}}>
                    {this.props.name + ' ' + this.props.refTemp}
                </div>
            )
        }
        switch(type){
            case 'default':
                html = (
                    <textarea className={this.props.className} name={this.props.name} id={this.props.id} ref="input" placeholder={this.props.placeholder} disabled={isDisabled}/>
                )
                break;
            case 'eform_input_textarea':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        <EditField  isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} 
                                    rowID={this.props.rowID} fieldID={this.props.fieldID} field={this.props.field} roles = {this.props.roles}
                                    arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                        <div className="form-group" id={this.props.groupId}>
                            <div className="col-xs-12">
                                <textarea
                                    title={this.props.name}
                                    className={this.props.className}
                                    id={this.props.refTemp}
                                    name={this.props.name} ref="input" placeholder={this.props.placeholder}
                                    rows={this.props.rows}
                                    
                                    style={{width:'100%'}}
                                    
                                    onMouseDown={this.handleClick.bind(this)}
                                    readOnly
                                    />
                            </div>
                        </div>

                    </div>
                )
                break;
        }
        return html;

    }
}
