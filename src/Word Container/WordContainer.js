import React, { useState } from "react";
import { Formik, Form } from "formik";
import html2pdf from "html2pdf.js";
import FormikControl from "../Formik/FormikControl";

import "./WordContainer.css";
function WordContainer(props) {
  const [wordManifest, setWordManifest] = useState("");
  const [contentCount, setContentCount] = useState(0);

  const initialValues = {
    content: "",
  };

  function onSubmit(values) {
    let wordCountObj = {};
    let removeNotWordCh = /[^\w]/gm;
    let wordsArr = values.content.split(removeNotWordCh).filter((word) => word !== "");

    setContentCount(Number(wordsArr.length));

    for (let word of wordsArr) {
      !wordCountObj[word] ? (wordCountObj[word] = 1) : wordCountObj[word]++;
    }

    document.getElementById("count-result").style.border =
      Number(wordsArr.length) !== 0 ? "3px inset rgb(92, 167, 211)" : null;

    setWordManifest(wordCountObj);
  }

  function printList() {
    var divContents = document.getElementById("count-result").innerHTML;
    var a = window.open("", "", "height=500, width=500");
    a.document.write(divContents);
    a.print();
  }

  function download() {
    var element = document.getElementById("count-result");
    html2pdf(element);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="container">
        <FormikControl
          className="content-box"
          control="textarea"
          label="Enter Content Below"
          name="content"
        />
        <div className="btn-container">
          <button type="reset" className="clear-btn">
            Clear
          </button>
          <button type="submit" className="count-btn">
            Count
          </button>
        </div>
        <div className="print-save-btns">
          <button className="print-btn" onClick={printList}>
            Print
          </button>
          <button className="save-btn" onClick={download}>
            Save
          </button>
        </div>
        <div className="count-result" id="count-result">
          <div className="count-result-title">{`Content Count: ${contentCount}`}</div>
          <div className="entries-box">
            {Object.entries(wordManifest).map((word, index) => (
              <div key={index} className="each-entry">
                <span className="word">{word[0]}</span>
                <span className="count">{word[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default WordContainer;
