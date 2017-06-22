import React, { Component } from 'react'
import EditField from './EditField.component';



export default class Label extends Component {

    static contextTypes = {
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array  
    }

    static propTypes = {
      size: React.PropTypes.string,      
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
        var type = this.props.type;
        var html = null;
        var labelStyle = {
            "white-space": "pre-wrap"
        }
        
        switch(type){
          case 'default':
              html = (
                  <label>Label</label>
              )
              break;
          case 'eform_input_check_label_html':
              html = (
                  <div className={"dragula col-md-"+this.props.size} ref="group">
                      <EditField  isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} rowID={this.props.rowID} 
                            fieldID={this.props.fieldID} field={this.props.field} roles = {this.props.roles}
                            arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                      <div className="form-group" id={this.props.groupId}>
                          <div className="col-md-12">
                              <span className="form-control-static"
                                  dangerouslySetInnerHTML={{__html: this.props.label}} ref="label" onMouseDown={this.handleClick.bind(this)}  style = {labelStyle}
                                  readOnly
                                  />
                          </div>
                      </div>

                  </div>
              )
              break;
          case 'eform_input_check_label':
              html = (
                  <div className={"dragula col-xs-"+this.props.size} ref="group">
                      <EditField  isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} rowID={this.props.rowID} 
                            fieldID={this.props.fieldID} field={this.props.field} roles = {this.props.roles}
                            arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                      <div className="form-group" id={this.props.groupId}>
                          <div className="col-xs-12">
                              <span className="form-control-static" ref="label"  onMouseDown={this.handleClick.bind(this)}  style = {labelStyle} readOnly> 
                                  {this.props.label}
                              </span>
                          </div>
                      </div>
                  </div>
              )
        }

        return html;
  
    }
}
