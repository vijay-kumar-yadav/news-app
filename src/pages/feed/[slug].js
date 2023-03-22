import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Toolbar } from "@/components/toolbar";
import { Loading } from "@/components/loading";
import { SubToolbar } from "@/components/subToolbar";
import styles from "../../styles/feed.module.css";
import { AiOutlineFrown } from "react-icons/ai";
import AppContext from "@/components/appContext";

export const Feed = ({ pageNumber }) => {
  const value = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [typeOfNews, setTypeOfNews] = useState("India");
  const categories = [
    "Business",
    "Entertainment",
    "India",
    "LifeStyle",
    "Politics",
    "ScienceAndTechnology",
    "Sports",
    "World",
  ];
  const router = useRouter();

  const callApi = async () => {
    const count = 10;
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        count,
        offset: (pageNumber - 1) * count,
        safeSearch: "Off",
        textFormat: "Raw",
        cc: "in",
        setLang: "EN",
        originalImg: "true",
        q: typeOfNews + " latest news",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_NEWS_KEY,
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };
    return await axios.request(options);
    //  await axios.get(
    //   `https://newsapi.org/v2/top-headlines?country=in&category=${typeOfNews}&pageSize=5&page=${pageNumber}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
    //     },
    //   }
    // );
  };
  useEffect(() => {
    setLoading(true);
    callApi()
      .then((apiResponse) => {
        setArticles(apiResponse.data.value);
        setLoading(false);
      })
      .catch((err) => {
        setArticles([]);
        setLoading(false);
      });
    return () => console.log("This will be logged on unmount");
  }, [typeOfNews, pageNumber]);

  return (
    <div
      className={
        value.state.isToggle ? "page-container-dark" : "page-container"
      }
    >
      <Toolbar />
      <SubToolbar
        typeOfNews={typeOfNews}
        categories={categories}
        setTypeOfNews={setTypeOfNews}
      />
      {loading && <Loading />}
      <div className={value.state.isToggle ? styles.mainDark : styles.main}>
        {articles.length === 0
          ? !loading && (
              <div
                className={
                  value.state.isToggle ? styles.noResultDark : styles.noResult
                }
              >
                <h1>No Feed Found</h1>
                <AiOutlineFrown size={48} />
              </div>
            )
          : !loading &&
            articles.map((article, index) => (
              <div
                key={index}
                className={value.state.isToggle ? styles.postDark : styles.post}
              >
                <h1 onClick={() => window.open(article.url, "_blank")}>
                  {article.name}
                </h1>
                <div
                  onClick={() => console.log(article)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontStyle: "italic",
                    color: value.state.isToggle ? "white" : "black",
                  }}
                >
                  <span>{new Date(article.datePublished).toDateString()}</span>
                  <span>
                    {new Date(article.datePublished).toTimeString().slice(0, 5)}
                  </span>
                </div>
                <p>{article.description}</p>
                {article.image && (
                  <img src={article.image.contentUrl} alt={index} />
                )}
              </div>
            ))}
      </div>
      {articles.length === 0
        ? ""
        : !loading && (
            <div
              className={
                value.state.isToggle ? styles.paginatorDark : styles.paginator
              }
            >
              <div
                className={pageNumber === 1 ? styles.disabled : styles.active}
                onClick={() => {
                  if (pageNumber > 1) {
                    router
                      .push(`/feed/${pageNumber - 1}`)
                      .then(() => window.scrollTo(0, 0));
                  }
                }}
              >
                Previous Page
              </div>
              <div>#{pageNumber}</div>
              <div
                className={
                  articles.length < 10 ? styles.disabled : styles.active
                }
                onClick={() => {
                  if (articles.length !== 0) {
                    router
                      .push(`/feed/${pageNumber + 1}`)
                      .then(() => window.scrollTo(0, 0));
                  }
                }}
              >
                Forward Page
              </div>
            </div>
          )}
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  return {
    props: {
      pageNumber: Number(pageContext.query.slug),
    },
  };
  // const pageNumber = Number.parseInt(pageContext.query.slug);
  // if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
  //   return {
  //     props: {
  //       articles: [],
  //       pageNumber: 1,
  //     },
  //   };
  // }
  // let typeOfNews = "";
  // if (pageContext.query.typeOfNews) {
  //   typeOfNews = context.query.typeOfNews;
  // }
  // const apiResponse = await axios.get(
  //   `https://newsapi.org/v2/top-headlines?country=in&category=${typeOfNews}&pageSize=5&page=${pageNumber}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
  //     },
  //   }
  // );
  // return {
  //   props: {
  //     articles: apiResponse.data.articles,
  //     pageNumber,
  //   },
  // };
};
export default Feed;
