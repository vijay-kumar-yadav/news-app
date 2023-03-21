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
  const [typeOfNews, setTypeOfNews] = useState("general");
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const router = useRouter();
  const callApi = async () => {
    return await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${typeOfNews}&pageSize=5&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  };
  useEffect(() => {
    setLoading(true);
    callApi()
      .then((apiResponse) => {
        setArticles(apiResponse.data.articles);
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
                  {article.title}
                </h1>
                <p>{article.description}</p>
                {article.urlToImage && <img src={article.urlToImage} />}
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
                className={pageNumber === 5 ? styles.disabled : styles.active}
                onClick={() => {
                  if (pageNumber < 5) {
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
