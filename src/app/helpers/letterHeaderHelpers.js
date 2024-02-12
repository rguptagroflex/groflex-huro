import _ from "lodash";
import q from "q";
import config from "oldConfig";
import { fabric } from "fabric";
import LetterElement from "models/letter/letter-element.model";

const buildLetterHeaderPosition = ({ x, y, width, height, sortId, type }) => {
  return {
    position: "absolute",
    whiteSpace: "pre",
    zIndex: sortId,
    left: `${x}px`,
    top: `${y}px`,
    height:
      type === "image" || type === "rectangle" ? `${height}px` : undefined,
    width: type === "image" || type === "rectangle" ? `${width}px` : undefined,
  };
};

const buildLetterHeaderStyles = ({
  font,
  fontSize,
  fontWeight,
  italic,
  underline,
  color,
}) => {
  return {
    fontFamily: `"${font}"`,
    fontSize: `${fontSize}px`,
    fontWeight,
    fontStyle: italic ? "italic" : undefined,
    textDecoration: underline ? "underline" : undefined,
    lineHeight: `${fontSize}px`,
    color,
  };
};

const letterElementsToFabricObjects = (letterElementsCollection) => {
  const promises = buildPromises(letterElementsCollection);
  return q.all(promises);
};

const fabricObjectToImageLetterElement = (fabricObject, letterElement) => {
  letterElement =
    letterElement instanceof LetterElement
      ? letterElement
      : new LetterElement();

  letterElement.type = "image";
  letterElement.sortId = fabricObject._sortId;
  letterElement.x = fabricObject.getLeft();
  letterElement.y = fabricObject.getTop();
  letterElement.metaData.width = fabricObject.getWidth();
  letterElement.metaData.height = fabricObject.getHeight();

  return letterElement;
};

const fabricObjectToTextLetterElement = (fabricObject, letterElement) => {
  letterElement =
    letterElement instanceof LetterElement
      ? letterElement
      : new LetterElement();

  const fontColor =
    fabricObject.getFill() === "rgb(0,0,0)"
      ? "#000000"
      : fabricObject.getFill();

  letterElement.type = "text";
  letterElement.sortId = fabricObject._sortId;
  letterElement.x = fabricObject.getLeft();
  letterElement.y = fabricObject.getTop();
  letterElement.metaData.html = fabricObject.getText();
  letterElement.metaData.font = fabricObject.getFontFamily();
  letterElement.metaData.color = fontColor;
  letterElement.metaData.fontSize = fabricObject.getFontSize();
  letterElement.metaData.fontWeight = fabricObject.getFontWeight();
  letterElement.metaData.bold = fabricObject.getFontWeight() === 700;
  letterElement.metaData.italic = fabricObject.getFontStyle() === "italic";
  letterElement.metaData.underline =
    fabricObject.getTextDecoration() === "underline";

  return letterElement;
};

const fabricObjectToShapeLetterElement = (fabricObject, letterElement) => {
  letterElement =
    letterElement instanceof LetterElement
      ? letterElement
      : new LetterElement();

  const shapeColor =
    fabricObject.getFill() === "rgb(0,0,0)"
      ? "#000000"
      : fabricObject.getFill();

  letterElement.type = "rectangle";
  letterElement.sortId = fabricObject._sortId;
  letterElement.x = fabricObject.getLeft();
  letterElement.y = fabricObject.getTop();
  letterElement.metaData = letterElement.metaData || {};
  letterElement.metaData.color = shapeColor;
  letterElement.metaData.width = fabricObject.getWidth();
  letterElement.metaData.height = fabricObject.getHeight();

  return letterElement;
};

const LetterFabricText = fabric.util.createClass(fabric.IText, {
  insertNewline: function () {
    this.exitEditing();
  },
  // paste: function(e) {
  // 	e.stopImmediatePropagation();
  // 	e.preventDefault();
  // }
});

const getTextOptions = function getTextOptions(letterElement) {
  return _.assign(
    {
      fontFamily: letterElement.metaData.font,
      fontWeight: letterElement.metaData.fontWeight,
      color: letterElement.metaData.color,
      fontSize: letterElement.metaData.fontSize,
      fontStyle: letterElement.metaData.italic ? "italic" : "normal",
      textDecoration: letterElement.metaData.underline ? "underline" : "",
      left: parseFloat(letterElement.x),
      top: parseFloat(letterElement.y),
    },
    config.letter.fabricOptions
  );
};

const getShapeOptions = function getShapeOptions(letterElement) {
  return _.assign(
    {
      color: letterElement.metaData.color,
      left: parseFloat(letterElement.x),
      top: parseFloat(letterElement.y),
      width: letterElement.metaData.width,
      height: letterElement.metaData.height,
    },
    config.letter.fabricShapeOptions
  );
};

const buildText = function buildText(letterElement) {
  const deferred = q.defer();

  const text = new LetterFabricText(
    letterElement.metaData.html,
    getTextOptions(letterElement)
  );
  text._letterElementId = letterElement.id;
  text._sortId = letterElement.sortId;

  deferred.resolve(text);

  return deferred.promise;
};

const buildImage = function buildImage(letterElement) {
  const deferred = q.defer();

  const url = `${config.imageResourceHost}${letterElement.metaData.imageUrl}`;
  const imageOptions = _.assign(
    {
      width: letterElement.metaData.width,
      height: letterElement.metaData.height,
      left: parseFloat(letterElement.x),
      top: parseFloat(letterElement.y),
    },
    config.letter.fabricOptions
  );

  fabric.Image.fromURL(
    url,
    function (image) {
      if (!image) {
        deferred.reject(`Could not retrieve image from url: ${url}`);
      }
      deferred.resolve(image);
    },
    imageOptions
  );

  return deferred.promise
    .then((image) => {
      image._letterElementId = letterElement.id;
      image._letterPaperImageId = letterElement.letterPaperImageId;
      image._sortId = letterElement.sortId;
      return image.set(imageOptions).setCoords();
    })
    .catch((error) => {
      throw new Error(`LetterElements to FabricObjects Utils: ${error}`);
    });
};

const buildShape = function buildShape(letterElement) {
  const shape = new fabric.Rect(getShapeOptions(letterElement));
  shape._letterElementId = letterElement.id;
  shape._sortId = letterElement.sortId;

  return q(shape);
};

const buildPromises = (letterElementsCollection) =>
  letterElementsCollection.reduce((fabricObjects, letterElement) => {
    let promise;
    switch (letterElement.type) {
      case "image":
        promise = buildImage(letterElement);
        break;
      case "text":
        promise = buildText(letterElement);
        break;
      case "rectangle":
        promise = buildShape(letterElement);
        break;
    }
    fabricObjects.push(promise);
    return fabricObjects;
  }, []);

export {
  buildLetterHeaderPosition,
  buildLetterHeaderStyles,
  letterElementsToFabricObjects,
  fabricObjectToImageLetterElement,
  fabricObjectToTextLetterElement,
  fabricObjectToShapeLetterElement,
  LetterFabricText,
};
