import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard({category, name, imgSrc}) {

  return (
    <div>
      <Link to={`/products/${category}`} className="category-card">
        <img className='card-img' src={imgSrc} alt="img" />
        <p>{name}</p>
      </Link>
    </div>
  )
}

export default CategoryCard
