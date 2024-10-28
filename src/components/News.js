import React, { useState ,useEffect } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const  News =(props)=> {



const capitalizeFirstLetter =(letter) =>{
    return letter.charAt(0).toUpperCase()+letter.slice(1);
       
}


    
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [totalResults, setTotalResult] = useState(0);



    const updateNews = async ()=> {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e500289a8b65427298e02f06c2d5fba3&page=${page}&pageSize=${props.pageSize}`;
        setLoading( true );
        let data = await fetch(url);
        let persondata = await data.json();
        setArticles(persondata.articles)
        setTotalResult(persondata.totalResults)
        setLoading(false)
   
    }
    useEffect(()=>{
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;
    },[])

   const handleNextClick = async () => {
           
        setPage(page + 1 );
      updateNews();
    }


    const handlePrevClick = async () => {
 
        setPage(page-1);
        updateNews();
    };

   
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{marginTop:'70px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Spinner />}
                <div className="row">
                    {articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <Newsitem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://bdc2020.o0bc.com/wp-content/uploads/2024/10/Hoax_Boston_Explosion_07595-67046bd711188-768x432.jpg"}
                                    newsUrl={element.url} author={element && element.author ? element.author : "Unknown"}
                                    publishedAt={element.publishedAt}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>
                        Preview &larr;
                    </button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
   

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News;



