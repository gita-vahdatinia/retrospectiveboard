import React from 'react';
import CardPreview from './CardPreview';

const CardList = ({ category }) => (
  <div className="CardList">
    {category.map(cat =>
      <CardPreview key={cat.id} {...cat} />
    )}
  </div>
);


export default CardList;
