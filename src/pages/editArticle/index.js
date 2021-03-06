import React, { useContext, useEffect, useState } from "react";
import ArticleForm from "../../components/ArticleForm";
import useFetch from "../../hooks/useFetch";
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from "../../context/currentUser";

const EditArticle = ({match}) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [currentUserState] = useContext(CurrentUserContext);
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
  const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfulSubmit, setIsSuccessfullSubmit] = useState(false);

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSuccessfullSubmit(true)
  }, [updateArticleResponse, setIsSuccessfullSubmit]);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    })
  };

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to={`/`}/>
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${slug}`}/>
  }

  return (<ArticleForm onSubmit={handleSubmit} errors={(updateArticleError && updateArticleError.errors) || {}}
                       initialValues={initialValues}/>)
};

export default EditArticle;