import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    updateNews();
    //eslint-disable-next-line
  }, []);

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // console.log("previous");
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c2d198675f8245f9b5e2c4f8fc96d9aa&page=${this.state.page - 1}&pageSize=${props.pageSize}`;

  // this.setState({loading : true})

  // let data = await fetch(url);
  // let parsedData = await data.json()
  // console.log(parsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading : false

  // })

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // console.log("Next");
  // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c2d198675f8245f9b5e2c4f8fc96d9aa&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  // this.setState({loading : true})
  // let data = await fetch(url);
  // let parsedData = await data.json()

  // this.setState({
  //   page: this.state.page + 1,
  //   articles: parsedData.articles,
  //   loading : false
  // })
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2 className="text-center main-heading text-light">
        Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        className="spin"
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
