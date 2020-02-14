import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'

import ArticleForm from "../../components/ArticleForm";
import useFetch from "../../hooks/useFetch";

import { CurrentUserContext } from "../../context/currentUser";

const CreateArticle = () => {
  const apiUrl = `/articles`;
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [isSuccessfulSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  useEffect(() => {
    if (!response) {
      return
    }

    setIsSuccessfullSubmit(true);
  }, [response]);


  const handleSubmit = article => {
    console.log(article);
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  };

  if (!currentUserState.isLoggedIn) {
    return <Redirect to={`/`}/>
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`}/>
  }

  return <div>
    <ArticleForm errors={(error && error.errors) || []} initialValues={initialValues}
                 onSubmit={handleSubmit}/>
  </div>
};

export default CreateArticle;