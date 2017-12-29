import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class TicketsPage extends React.Component {
  componentDidMount() {
    // pull if there aren't any in state already
    console.error('Reloading tickets page one every reload');
    this.props.dispatch(actions.refreshAllTickets());
    // if(this.props.state.allTicketsData.length == 0) {
    //   this.props.dispatch(actions.refreshAllTickets());
    // }
  }
  render() {
    const {allTicketsData} = this.props.state;
    return (
      <div className='jumbotron'>
        <span>
          <div className="row">
            <div className='col-8'>
              <div>
                {allTicketsData.length && allTicketsData.map((ticket) => {
                  return <span key={ticket.ticket + ticket.priceAndTime}><a href={'http://localhost:4444/getticket?ticket=' + ticket.ticket + '&priceAndTime=' + ticket.priceAndTime}>{ticket.ticket} {ticket.type} {ticket.userId} {ticket.side} {ticket.price} {ticket.priceAndTime}</a><br /><br /></span>;
                })}
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}
export default connect((state) => {
  return {state};
})(TicketsPage);
