import React from "react";
import HtmlInputComponent from "../components/input/HtmlInputComponent";

const LetterFormFooterComponent = () => {
  return (
    <div className="flex-row">
      <HtmlInputComponent
        value={
          <div class="htmlInput_wrapper">
            <div class="quill htmlInput_input">
              <div class="ql-container ql-bubble">
                <div
                  class="ql-editor"
                  data-gramm="false"
                  contenteditable="true"
                  data-placeholder="Column 1"
                >
                  <p>test-ritesh</p>
                  <p>
                    <br />
                  </p>
                  <p>rgupta@groflex.io</p>
                  <p>Phone: +91 9370330473</p>
                  <p>E-Mail: rgupta@groflex.io</p>
                </div>
                <div
                  class="ql-clipboard"
                  contenteditable="true"
                  tabindex="-1"
                ></div>
                <div class="ql-tooltip ql-hidden">
                  <span class="ql-tooltip-arrow"></span>
                  <div class="ql-tooltip-editor">
                    <input
                      type="text"
                      data-formula="e=mc^2"
                      data-link="https://quilljs.com"
                      data-video="Embed URL"
                    />
                    <a class="ql-close"></a>
                  </div>
                  <div class="ql-toolbar">
                    <span class="ql-formats">
                      <button type="button" class="ql-bold">
                        <svg viewBox="0 0 18 18">
                          {" "}
                          <path
                            class="ql-stroke"
                            d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                          ></path>{" "}
                          <path
                            class="ql-stroke"
                            d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                          ></path>{" "}
                        </svg>
                      </button>
                      <button type="button" class="ql-italic">
                        <svg viewBox="0 0 18 18">
                          {" "}
                          <line
                            class="ql-stroke"
                            x1="7"
                            x2="13"
                            y1="4"
                            y2="4"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="5"
                            x2="11"
                            y1="14"
                            y2="14"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="8"
                            x2="10"
                            y1="14"
                            y2="4"
                          ></line>{" "}
                        </svg>
                      </button>
                      <button type="button" class="ql-underline">
                        <svg viewBox="0 0 18 18">
                          {" "}
                          <path
                            class="ql-stroke"
                            d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
                          ></path>{" "}
                          <rect
                            class="ql-fill"
                            height="1"
                            rx="0.5"
                            ry="0.5"
                            width="12"
                            x="3"
                            y="15"
                          ></rect>{" "}
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LetterFormFooterComponent;
