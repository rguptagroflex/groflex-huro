import React, { useEffect, useRef, useState } from "react";
import q from "q";
import { fabric } from "fabric";
import { FeatherIcon } from "../featherIcon/FeatherIcon";
import groflexService from "../../services/groflex.service";
import resources from "../resources/resources";
import config from "../../../../oldConfig";
import { Button } from "../components/button/Button";
import _ from "lodash";
import LetterHeaderState from "../../enums/letter/letter-header-state.enum";
import { LetterFabricText } from "../../helpers/letterHeaderHelpers";
import CanvasColorPickerComponent from "../canvasColorPicker/CanvasColorPickerComponent";

const DEFAULT_FONT_SIZE = 18;
const KEY_CODES = config.KEY_CODES;

const SHIFT_STEP = 10;
const CANVAS_HEIGHT = 200;
const CANVAS_WIDTH = 937;
const OFFSET = 0;
const CANVAS_ZINDEX_OFFSET = 3;
const BOUNDING_BOX = {
  left: OFFSET,
  top: OFFSET,
  width: CANVAS_WIDTH - OFFSET * 2,
  height: CANVAS_HEIGHT - OFFSET * 2,
};
const CENTER = {
  x: BOUNDING_BOX.left + BOUNDING_BOX.width / 2,
  y: BOUNDING_BOX.top + BOUNDING_BOX.height / 2,
};
const H_SNAP_POINTS = [OFFSET, CENTER.y, CANVAS_WIDTH - OFFSET, CENTER.y];
const V_SNAP_POINTS = [CENTER.x, OFFSET, CENTER.x, CANVAS_HEIGHT - OFFSET];

const LetterHeaderComponent = ({ items }) => {
  //States
  const [imageUrl, setImageUrl] = useState();
  const [selectedElement, setSelectedElement] = useState();
  const [letterHeaderStates, setLetterHeaderStates] = useState({
    items,
    headerState:
      items?.length > 0 ? LetterHeaderState.DISPLAY : LetterHeaderState.EMPTY,
    loading: false,
    deleteButtonActive: false,
    textSelected: false,
    canHaveColor: false,
    hSnapVisible: false,
    vSnapVisible: false,
    wrapperVisible: false,
    textIsBold: false,
    textIsItalic: false,
    textIsUnderlined: false,
    textSupportsBold: false,
    textSupportsItalic: false,
    selectedFontSize: undefined,
    selectedFont: undefined,
    selectedFontColor: undefined,
    previousEl: undefined,
    fabricObjects: [],
  });

  //Refs

  const otherRefs = useRef({
    uploader: undefined,
    hSnap: undefined,
    fonts: config.letter.fonts,
    whenImageUploaded: q.defer(),
    isSaving: false,
    hasAddedText: false,
    addedTextAdditionalTop: 0,
    addedTextAdditionalLeft: 0,
  });

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  //Initializing canvas
  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
        height: CANVAS_HEIGHT,
        width: CANVAS_WIDTH,
      });
      const lineOptions = {
        stroke: "#ddd",
        fill: "transparent",
        selectable: false,
        opacity: 0,
      };
      const wrapperOptions = Object.assign({}, BOUNDING_BOX, lineOptions);
      // Hack: Show border from wrapper container (Canvas renders 0.5 pixels)
      wrapperOptions.width--;
      wrapperOptions.height--;
      const snapOptions = Object.assign(
        {},
        { strokeDashArray: [5] },
        lineOptions
      );
      const wrapper = new fabric.Rect(wrapperOptions);
      const vSnap = new fabric.Line(V_SNAP_POINTS, snapOptions);
      const hSnap = new fabric.Line(H_SNAP_POINTS, snapOptions);
      newCanvas
        .add(wrapper, hSnap, vSnap)
        .on("selection:created", handleSelection)
        .on("selection:updated", handleSelection)
        .on("selection:cleared", handleDeSelection)
        .on("object:moving", onCanvasObjectMoving);

      canvasRef.current = newCanvas;

      return () => {
        newCanvas.removeListeners();
        newCanvas.dispose();
      };
    }
  }, []);

  //useEffect For imageUrl
  useEffect(() => {
    if (imageUrl) {
      const canvas = canvasRef.current;
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(160);
        img.lockUniScaling = true;
        canvas.add(img);
        canvas.centerObject(img);
      });
    }
  }, [imageUrl]);

  const handleUploadBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const canvas = canvasRef.current;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        canvas.getObjects("image").forEach((obj) => {
          canvas.remove(obj);
        });
        setImageUrl(e.target.result);
      };
    }
  };

  const handleSelection = (event) => {
    const selectedObject = event.selected[0];
    setSelectedElement(selectedObject);
  };

  const handleDeSelection = (event) => {
    setSelectedElement();
  };

  const onCanvasObjectMoving = (obj) => {
    // restrict objects on canvas so they don't move out of the boundingBox and snap them
    // to the horizontal and vertical centers.

    const object = obj.target;
    object.set({
      padding: 0,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    });

    // snap to center
    const center = object.getCenterPoint();
    const threshold = 8;
    const snapX = _.inRange(
      center.x,
      CENTER.x - threshold,
      CENTER.x + threshold
    );
    const snapY = _.inRange(
      center.y,
      CENTER.y - threshold,
      CENTER.y + threshold
    );
    setLetterHeaderStates({
      ...letterHeaderStates,
      hSnapVisible: snapY,
      vSnapVisible: snapX,
      wrapperVisible: true,
    });
    object.setPositionByOrigin(
      new fabric.Point(
        snapX ? CENTER.x : center.x,
        snapY ? CENTER.y : center.y
      ),
      "center",
      "center"
    );
  };

  const handleAddTextToCanvas = () => {
    const canvas = canvasRef.current;
    const canvasCenterTop = CANVAS_HEIGHT / 2;
    const canvasCenterLeft = CANVAS_WIDTH / 2;

    let fabricObjects = canvas.getObjects();
    fabricObjects = fabricObjects.slice(CANVAS_ZINDEX_OFFSET);

    const textElements = fabricObjects.reduce((textElementList, obj, index) => {
      const objectType = obj.get("type");

      if (objectType === "i-text" && !obj._letterElementId) {
        textElementList.push(obj);
      }

      return textElementList;
    }, []);

    const font = _.find(otherRefs.current.fonts, { default: true });

    const defaultOptions = {
      fontFamily: font.name,
      fontSize: DEFAULT_FONT_SIZE,
      fontStyle: "normal",
      fontWeight: font.regular,
      left: canvasCenterLeft,
      top: canvasCenterTop,
      lockScalingX: true,
      lockScalingY: true,
      hasControls: false,
    };

    const fabricTextOptions = _.assign(
      {},
      defaultOptions,
      config.letter.fabricOptions
    );
    const text = new LetterFabricText(
      resources.str_yourText,
      fabricTextOptions
    );

    if (otherRefs.current.hasAddedText && textElements.length <= 29) {
      otherRefs.current.addedTextAdditionalTop = textElements.length * 10;
      otherRefs.current.addedTextAdditionalLeft = textElements.length * 10;

      if (textElements.length >= 27) {
        otherRefs.current.addedTextAdditionalTop =
          textElements.length * 10 - 27 * 10;
      } else if (textElements.length >= 18) {
        otherRefs.current.addedTextAdditionalTop =
          textElements.length * 10 - 18 * 10;
      } else if (textElements.length >= 9) {
        otherRefs.current.addedTextAdditionalTop =
          textElements.length * 10 - 9 * 10;
      }
    }

    otherRefs.current.hasAddedText = true;

    text.top -= text.height / 2 - otherRefs.current.addedTextAdditionalTop;
    text.left -= text.width / 2 - otherRefs.current.addedTextAdditionalLeft;

    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing().selectAll();
  };

  const handleDeleteElementFromCanvas = () => {
    const canvas = canvasRef.current;
    canvas.remove(selectedElement);
  };

  const handleClearALlElements = () => {
    canvasRef.current.clear();
  };

  const ContentForHeader = () => {
    let content;

    switch (letterHeaderStates.headerState) {
      case LetterHeaderState.DISPLAY:
        const displayItems = letterHeaderStates.items.map((item, index) => {
          const {
            type,
            x,
            y,
            sortId,
            metaData: {
              font,
              fontSize,
              fontWeight,
              italic,
              underline,
              color,
              width,
              height,
              html,
              imageUrl,
            },
          } = item;

          const position = buildLetterHeaderPosition({
            x,
            y,
            width,
            height,
            sortId,
            type,
          });

          let styles;

          switch (item.type) {
            case "image":
              styles = position;
              return (
                <img
                  src={`${config.imageResourceHost}${imageUrl}`}
                  style={styles}
                  key={`letter-header-item-${index}`}
                />
              );
            case "text":
              const styling = buildLetterHeaderStyles({
                font,
                fontSize,
                fontWeight,
                italic,
                underline,
                color,
              });
              styles = Object.assign({}, position, styling);
              return (
                <span style={styles} key={`letter-header-item-${index}`}>
                  {html}
                </span>
              );
            case "rectangle":
              styles = Object.assign({}, position, {
                "background-color": color,
              });
              return <div style={styles} key={`letter-header-item-${index}`} />;
          }
        });

        content = (
          <div
            className="headerDisplay"
            onClick={() => this.onHeaderDisplayClick()}
          >
            {displayItems}
          </div>
        );
        break;
      case LetterHeaderState.EMPTY:
        content = (
          <div
            className="headerEmpty"
            onClick={() => this.onHeaderEmptyClick()}
          >
            {/* <div className="headerEmpty_title">
								<b>{resources.str_logo}</b>
							{resources.str_hereSmall}
						</div>
						<span className="headerEmpty_subtitle">{resources.letterHeaderUploadCreateText}</span> */}
            <div className="logo-upload-area letter-headerEmpty_title">
              <label>
                <h5 className="row1">
                  {/* <img src="/assets/images/svg/impress_bild.svg" height="50" /> */}
                  Add logo or text
                </h5>
                <p className="row2">
                  {/* <span>{resources.str_logo}</span>
									{resources.str_hereSmall} */}
                  Upload company logo or add a text
                </p>
                <p className="row3">
                  {/* <span className="headerEmpty_subtitle">
										{resources.letterHeaderUploadCreateText}
									</span> */}
                  <div className="btn1">
                    <div className="btn1-name">
                      <SVGInline
                        width="17px"
                        height="17px"
                        svg={editSvgGreen}
                        className="vertically-middle u_mr_6"
                      />
                      <span>Upload</span>
                    </div>
                    <div className="btn1-subname">Or Drop a file</div>
                  </div>
                  <div className="or-div">OR</div>
                  <div className="btn2">
                    <div>
                      <SVGInline
                        width="17px"
                        height="17px"
                        svg={plusSvgGreen}
                        className="vertically-middle u_mr_6"
                      />
                      <span>Enter text</span>
                    </div>
                  </div>
                </p>
              </label>
            </div>
          </div>
        );
        break;
      case LetterHeaderState.EDIT:
        const uploadButton = (
          <div
            ref="uploadButton"
            className="button button-primary button-small button-icon-picture button-rounded"
            disabled={letterHeaderStates.loading}
          >
            {resources.letterHeaderUploadLogoText}
          </div>
        );

        this.setOpacity("hSnap", +letterHeaderStates.hSnapVisible);
        this.setOpacity("vSnap", +letterHeaderStates.vSnapVisible);
        this.setOpacity("wrapper", +letterHeaderStates.wrapperVisible);

        const fontBoldControl = this.createFontBoldControl();
        const fontUnderlineControl = this.createFontUnderlineControl();
        const fontItalicControl = this.createFontItalicControl();
        const fontFamilyControl = this.createFontFamilyControl();
        const fontSizeControl = this.createFontSizeControl();

        content = (
          <div>
            <LoaderComponent text="" visible={letterHeaderStates.loading} />
            <div
              className={`headerEdit document-edit ${
                letterHeaderStates.wrapperVisible ? "headerEdit-active" : ""
              }`}
            >
              <canvas ref="canvas" />
            </div>
            <form ref="form" className="form letterHeader_tools">
              <button ref="formSubmit" className="u_hidden" />
              <div className={"letterHeaderFontTools"}>
                <div className="letterHeaderTools_fontStyle">
                  {fontBoldControl}
                  {fontUnderlineControl}
                  {fontItalicControl}
                </div>
                {fontFamilyControl}
                {fontSizeControl}
                <CanvasColorPickerComponent
                  canvas={this.canvas}
                  visible={
                    letterHeaderStates.canHaveColor ||
                    letterHeaderStates.textSelected
                  }
                  value={letterHeaderStates.selectedFontColor}
                />
              </div>

              <div className="buttonRow">
                <div className="u_vc">
                  {uploadButton}
                  <button
                    type="button"
                    onClick={() => this.addText()}
                    className="button button-primary button-small button-icon-font button-rounded"
                  >
                    {resources.str_text}
                  </button>
                  <button
                    type="button"
                    disabled={!transactionStates.deleteButtonActive}
                    onClick={() => this.removeObject()}
                    className="button button-primary button-small button-rounded"
                  >
                    {resources.str_clear}
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
        break;
    }
  };

  return (
    <div className={"letter-header-component"}>
      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        onChange={handleImageUpload}
      />
      <div className="active-header">
        <canvas ref={canvasRef} />
      </div>
      <div className="canvas-action-buttons">
        <div className="letter-header-font-tools">
          {/* <CanvasColorPickerComponent
            canvas={canvasRef}
            visible={
              letterHeaderStates.canHaveColor || letterHeaderStates.textSelected
            }
            value={letterHeaderStates.selectedFontColor}
          /> */}
        </div>
        <div className="canvas-tools m-t-10">
          <Button isPrimary onClick={handleUploadBtnClick}>
            Upload Logo
          </Button>
          <Button
            className={"m-l-10"}
            isPrimary
            onClick={handleAddTextToCanvas}
          >
            Text
          </Button>
          <Button
            className={"m-l-10"}
            isPrimary
            onClick={handleClearALlElements}
          >
            Clear all elements
          </Button>
          <Button
            className={"m-l-10"}
            isPrimary={selectedElement}
            isDisabled={!selectedElement}
            onClick={handleDeleteElementFromCanvas}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterHeaderComponent;
