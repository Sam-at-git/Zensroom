import React from 'react';
import { Components, registerComponent, withCurrentUser, getFragment, withMessages } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';

import Rooms from '../../modules/rooms/collection.js';

const RoomsNewForm = ({currentUser, closeModal, router, flash}, {intl}) =>

  <div>

    {Rooms.options.mutations.new.check(currentUser) ?
      <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc'}}>
        <h4><FormattedMessage id="rooms.create_new"/></h4>
        <Components.SmartForm 
          collection={Rooms}
          /*mutationFragment={getFragment('RoomsItemFragment')}*/
          successCallback={room => {
            closeModal();
            router.push({pathname: `/room/${room._id}`});
            flash(intl.formatMessage({id: 'rooms.created'}), 'success');
          }}
        /> 
      </div> :
      null
    }

  </div>

RoomsNewForm.contextTypes = {
  intl: intlShape
};

export default compose(
  withRouter,
  withMessages,
  withCurrentUser
)(RoomsNewForm);