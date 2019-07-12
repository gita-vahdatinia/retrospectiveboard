import React from 'react';
import {Card} from 'react-bootstrap'

const CardPreview = (category ) => (
  <div className="issues">
    <Card>
      <Card.Body className="card_body">
        {category.categoryDescription}
      </Card.Body>
    </Card>
  </div>
);

export default CardPreview;
