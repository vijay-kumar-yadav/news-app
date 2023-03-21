import { SearchBar } from "@/components/searchBar";
import { Toolbar } from "@/components/toolbar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/search.module.css";
import { AiOutlineFrown } from "react-icons/ai";
// import { SubToolbar } from "@/components/subToolbar";
import { Loading } from "@/components/loading";
import { Filter } from "@/components/filter";
import { useRouter } from "next/router";
import AppContext from "@/components/appContext";

export const Search = ({ pageNumber }) => {
  const router = useRouter();
  const value = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Day");
  const [text, setText] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  // const [typeOfNews, setTypeOfNews] = useState("general");
  // const categories = [
  //   "general",
  //   "business",
  //   "entertainment",
  //   "health",
  //   "science",
  //   "sports",
  //   "technology",
  // ];

  const callApi = async (query) => {
    setLoading(true);
    if (query.length === 0) {
      return [];
    } else {
      console.log("api 2 call");
      const count = 5;
      const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          count,
          offset: (pageNumber - 1) * count,
          safeSearch: "Off",
          textFormat: "Raw",
          setLang: "EN",
          originalImg: "true",
          freshness: filter,
          q: query + " latest news",
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_NEWS_BING_KEY,
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };
      const result = await axios.request(options);
      return result;
      // const result = await axios.get(
      //   `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=${filter}&pageSize=5&page=${pageNumber}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      //     },
      //   }
      // );
      // return result.data.articles;
    }
  };
  useEffect(() => {
    if (text.length === 0) return;
    var intr = setTimeout(() => {
      callApi(text)
        .then((res) => {
          setSearchedData(res.data.value);
          setLoading(false);
        })
        .catch((err) => {
          setSearchedData([]);
          setLoading(false);
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(intr);
  }, [filter, text, pageNumber]);

  const handleSearch = () => {
    setFilter("relevancy");
    if (text.trim().length === 0) return;

    setTimeout(() => {
      callApi(text)
        .then((data) => {
          setSearchedData(data);
          setLoading(false);
        })
        .catch((err) => {
          setSearchedData([]);
          setLoading(false);
          alert(err);
        });
    }, 1000);
  };
  return (
    <div
      className={
        value.state.isToggle ? "page-container-dark" : "page-container"
      }
    >
      <Toolbar />
      {/* <SubToolbar
        typeOfNews={typeOfNews}
        categories={categories}
        setTypeOfNews={setTypeOfNews}
      /> */}
      <SearchBar
        text={text}
        setText={setText}
        handleSearch={() => handleSearch()}
      />
      <div className={styles.filerDivContainer}>
        <Filter filter={filter} onSelect={(filter) => setFilter(filter)} />
      </div>
      {loading && <Loading />}

      <div className={value.state.isToggle ? styles.mainDark : styles.main}>
        {searchedData.length === 0
          ? !loading && (
              <div
                className={
                  value.state.isToggle ? styles.noResultDark : styles.noResult
                }
              >
                <h1>No Search Result</h1>
                <AiOutlineFrown size={48} />
              </div>
            )
          : !loading &&
            searchedData.map((article, index) => (
              <div
                key={index}
                className={value.state.isToggle ? styles.postDark : styles.post}
              >
                <h1 onClick={() => window.open(article.url, "_blank")}>
                  {article.name}
                </h1>
                <p>{article.description}</p>
                <div
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
                {/* {article.urlToImage && <img src={article.urlToImage} />} */}
              </div>
            ))}
      </div>
      {searchedData.length === 0
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
                      .push(`/search/${pageNumber - 1}`)
                      .then(() => window.scrollTo(0, 0));
                  }
                }}
              >
                Previous Page
              </div>
              <div>#{pageNumber}</div>
              <div
                className={
                  searchedData.length === 0 ? styles.disabled : styles.active
                }
                onClick={() => {
                  if (searchedData.length !== 0) {
                    router
                      .push(`/search/${pageNumber + 1}`)
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
};
export default Search;
