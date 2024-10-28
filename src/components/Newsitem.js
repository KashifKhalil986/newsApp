
import React from 'react'

const Newsitem =(props)=> {
 
    let {title ,description,imageUrl , newsUrl , author , publishedAt} = props;
    return (
      <div className="my-3">
     <div className="card" style={{width:'18rem'}}>
  <img src={imageUrl} style={{height:'13rem'}} className="card-img-top" alt="/"/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()} </small></p>
    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
 
}

export default Newsitem
