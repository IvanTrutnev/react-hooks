import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import TagList from "../../components/TagList";
import { CurrentUserContext } from "../../context/currentUser";
import { Redirect } from 'react-router-dom';

export const Article = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [currentUserState] = useContext(CurrentUserContext);
  const [{response: fetchArticleResponse, error: fetchArticleError, isLoading: fetchArticleLoading}, doFetch] = useFetch(apiUrl);
  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl);
  const [isSuccessFullDelete, setIsSuccessFullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }

    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username;
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setIsSuccessFullDelete(true);

  }, [deleteArticleResponse]);

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    })
  };

  if (isSuccessFullDelete) {
    return <Redirect to={`/`}/>
  }

  return <div className="article-page">
    <div className="banner">
      {!fetchArticleLoading && fetchArticleResponse && (
        <div className="container">
          <h1>{fetchArticleResponse.article.title}</h1>
          <div className="article-meta">
            <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
              <img src={fetchArticleResponse.article.author.image} alt=""/>
            </Link>
            <div className="info">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                {fetchArticleResponse.article.author.username}
              </Link>
              <span className="date">{fetchArticleResponse.article.createdAt}</span>
            </div>
            {isAuthor() && (
              <span>
                <Link className="btn btn-outline-secondary btn-sm"
                      to={`/articles/${fetchArticleResponse.article.slug}/edit`}>
                  <i className="ion-edit"/>
                  Edit article
                </Link>
                <button onClick={deleteArticle} className="btn btn-outline-danger btn-sm">
                  <i className="ion-trash-a"/>
                  Delete article
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
    <div className="container page">
      {fetchArticleLoading && <Loading/>}
      {fetchArticleError && <ErrorMessage/>}
      {!fetchArticleLoading && fetchArticleResponse && (
        <div className="row article-content">
          <div className="col-xs-12">
            <div>
              <p>{fetchArticleResponse.article.body}</p>
            </div>
            <TagList tags={fetchArticleResponse.article.tagList}/>
          </div>
        </div>
      )}
    </div>
  </div>;
};
