import React from 'react';
import {Card} from 'react-bootstrap'

const CardPreview = (category ) => (
  <div className="issues">
    <Card border="dark" >
      <Card.Header>
        {category.categoryName}
      </Card.Header>
      <Card.Body>
        {category.categoryDescription}
      </Card.Body>
    </Card>
  </div>
);

export default CardPreview;
