import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "../Formik/FormikControl";

import "./WordContainer.css";
function WordContainer(props) {
  const [wordManifest, setWordManifest] = useState("")
  const [contentCount, setContentCount] = useState(0);

  const initialValues = {
    content: "",
  };

  function onSubmit(values) {
    let wordCountObj = {};
    let removeNotWordCh = /[^\w]/gm;
    let wordsArr = values.content.split(removeNotWordCh).filter((word) => word !== "");

    setContentCount(wordsArr.length);

    for (let word of wordsArr) {
      !wordCountObj[word] ? (wordCountObj[word] = 1) : wordCountObj[word]++;
    }
    
    setWordManifest(JSON.stringify(wordCountObj));
  }
  console.log(wordManifest, contentCount)

  return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="container">
          <FormikControl className='content-box' control="textarea" label="Enter Content Below" name="content" />
          <div className="btn-container">
            <button type="submit">Count</button>
            <button>Clear</button>
          </div>
          <div className="count-result">
            <span>Content Count: {contentCount}</span>
            <span>{wordManifest}</span>
          </div>
        </Form>
      </Formik>
  );
}

export default WordContainer;
