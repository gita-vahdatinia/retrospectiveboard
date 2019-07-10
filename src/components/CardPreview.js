import React from 'react';

const CardPreview = (category ) => (
  <div className="CardPreview">
    <div className="category-name">
      {category.categoryName}
    </div>
    <div className="category-title">
      {category.categoryDescription}
    </div>
  </div>
);

export default CardPreview;
