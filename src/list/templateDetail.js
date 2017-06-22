import React, { Component } from 'react'
import * as util from '../redux/lib/utilities';
import EditForm from './EditForm.component';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

export default class TemplateDetail extends Component {

    static contextTypes = {
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array,
      arrPrintRoleCode: React.PropTypes.array
    }

    // static propTypes = {
    //   name: React.PropTypes.string,
    //   refName: React.PropTypes.string,      
    //   labelPrefix: React.PropTypes.string,
    //   labelSuffix: React.PropTypes.string,
    //   size: React.PropTypes.string,
    //   roles: React.PropTypes.object,
    //   userRole: React.PropTypes.object,
    //   value: React.PropTypes.string,
    //   sectionID: React.PropTypes.number,
    //   rowID: React.PropTypes.number,
    //   fieldID: React.PropTypes.number,
    //   colTableId: React.PropTypes.number,
    //   rowTableId: React.PropTypes.number,
    //   required: React.PropTypes.bool,
    //   rowAxisID:React.PropTypes.number,
    //   colAxisID:React.PropTypes.number
    // }

    constructor(props) {
        super(props);

        this.state = {           
            open: false
        }       
    }

    _goToDetail() {
        browserHistory.push("/home/?templateUID="+ this.props.data.UID +"&userUID=" + "f88209a6-d0ba-49fa-b1e9-cbb37a9e4108");        
    }

    _handleOpen(){
      this.setState({open: true});
    }

    _handleClose(){
      this.setState({open: false});
    }

    render() {

        var rTableRow = {
            display: "table-row"
        }
       
        var rTableCell = {
            display: "table-cell",
            padding: "3px 10px",
            border: "1px solid #999999"
        }

        var userCreated = (this.props.data.UserAccount)?this.props.data.UserAccount.UserName:'';
        return (
            <div style={{display: "table-row"}} key = {this.props.index}>
                               
                    
                    <div style={{display: "table-cell", padding: "3px 10px", border: "1px solid #999999"}}>{this.props.index}</div>
                    <div style={{display: "table-cell", padding: "3px 10px", border: "1px solid #999999"}}><a onClick={this._goToDetail.bind(this)}>{this.props.data.Name}</a></div>
                    <div style={{display: "table-cell", padding: "3px 10px", border: "1px solid #999999"}}>{moment(this.props.data.CreatedDate).format('DD/MM/YY HH:mm:ss')}</div>
                    <div style={{display: "table-cell", padding: "3px 10px", border: "1px solid #999999"}}>{userCreated}</div>
                    <div style={{display: "table-cell", padding: "3px 10px", border: "1px solid #999999"}}><a onClick={this._handleOpen.bind(this)}
                                                className="label label-sm label-success">
                                                Edit Form Properties
                                            </a>
                    </div>   
                    <EditForm   isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} data={this.props.data} 
                            arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode} 
                            arrPrintRoleCode={this.context.arrPrintRoleCode} />  
            </div>
        )
    }
}
