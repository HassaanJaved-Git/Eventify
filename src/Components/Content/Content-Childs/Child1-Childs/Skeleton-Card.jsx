import React from 'react'
import '../../../../Allcss/Skeleton.css'

const SkeletonCard = () => {
  return (
    <div className="row g-0 my-2">
  <div className="col-md-4">
    <div className="skeleton skeleton-img rounded-start"></div>
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="skeleton skeleton-text card-title"></h5>
      <p className="skeleton skeleton-text card-text"></p>
      <p className="skeleton skeleton-text card-text"></p>
    </div>
  </div>
</div>
  )
}

export default SkeletonCard
