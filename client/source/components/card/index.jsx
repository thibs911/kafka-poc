import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

class CardTemplate extends Component {
  render() {
    return (
      <Card>
        <CardText>{this.props.children}</CardText>
      </Card>
    );
  }
}

CardTemplate.propTypes = {
  children: PropTypes.element,
};

export default CardTemplate;
