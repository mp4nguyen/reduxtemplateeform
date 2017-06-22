import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';
import EditField from './EditField.component';



export default class Label extends Component {


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
        checked: React.PropTypes.bool,
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

    componentDidMount() {

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



    // onChange(event) {
    //     //console.log('checkbox change = ', event.currentTarget.checked);

    //     if(this.props.rowTableId >= 0 && this.props.colTableId >= 0){
    //         console.log('InputText: update value = ',event.currentTarget.checked);
    //         this.context.updateTableField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowTableId,this.props.colTableId,event.currentTarget.checked);
    //     }else{
    //         this.context.updateField(this.props.sectionID, this.props.rowID, this.props.fieldID, event.currentTarget.checked);
    //     }
    // }


    render() {
        var type = this.props.type;
        var html = null;
        var display_name = null;

        var cssCheckBox = "icheckbox_square-green";

        var isDisabled = false;
        var isVisible = true;

        if(this.props.isDisabled){
            isDisabled = this.props.isDisabled;
        }

        if(this.props.isVisible){
            isVisible = this.props.isVisible;
        }

        if (this.props.checked) {
            cssCheckBox = "icheckbox_square-green checked";
        }
        if (this.props.permission === 'eformDev') {
            display_name = ( < div style = {
                    { position: 'absolute', top: -30, left: 0, backgroundColor: 'green', color: 'white', padding: 5 }
                } > { this.props.name + ' ' + this.props.refTemp } < /div>)
            }
            switch (type) {
                case 'default':
                    html = ( < input type = "checkbox"
                    name = { this.props.name }
                    id = { this.props.id }
                    ref = "input"
                    value = { this.props.value }
                    disabled = { isDisabled }
                    />
                )
                break;
                case 'eform_input_check_checkbox':
                    html = ( 
                    < div className = { "dragField col-xs-" + this.props.size }
                        ref = "group" > { display_name } < div className = "form-group"
                        id = { this.props.groupId } >
                        <EditField  isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} 
                                    rowID={this.props.rowID} fieldID={this.props.fieldID} field={this.props.field} roles = {this.props.roles}
                                    arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                        < div className = "col-xs-12" >
                        < div className = "icheck-inline" >
                        < label ref = "label_checkbox"
                        onDoubleClick = { this.selection } >
                        < div className = { cssCheckBox }
                        style = {
                            { position: 'relative' }
                        } >
                        < input style = {
                            { labelHover: false, cursor: true, checkboxClass: 'icheckbox_square-green', position: 'absolute', opacity: 0 }
                        }
                        type = "checkbox"
                        name = { this.props.name }
                        checked = { this.props.checked }
                        title = { this.props.name }
                        tabIndex = "-1"
                        value = { this.props.value }
                        id = { this.props.refTemp }
                        
                         onMouseDown={this.handleClick.bind(this)} 
                         readOnly
                        /> < /div > < span > &nbsp; < /span> { this.props.label } < /label > < /div> < /div > < /div> < /div >
                    )
                    break;
            }
            return html
        }
    }
