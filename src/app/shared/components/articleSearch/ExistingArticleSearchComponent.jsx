import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../oldConfig";

const ExistingArticleSearchComponent = ({ value, onChange }) => {
  const [article, setArticle] = useState(value);
  const [articleOptions, setArticleOptions] = useState([]);
  useEffect(() => {
    handleLoadOptions();
  }, []);

  const handleChange = (option) => {
    setArticle(option);
    onChange(option);
  };

  const handleLoadOptions = () => {
    const queryString = "";

    return groflexService
      .request(`${config.resourceHost}find/article/*?search=${queryString}`, {
        auth: true,
      })
      .then(({ body: { data } }) => {
        const options = data.map((item) => {
          return {
            label: `${item.title}`,
            displayLabel: item.title,
            value: item.id,
            isExisting: true,
          };
        });
        // return options;
        setArticleOptions(options);
      });
  };
  console.log(article);

  return (
    <SelectInput
      options={articleOptions}
      isCreatable
      onChange={handleChange}
      value={article}
      placeholder={"Article Name"}
    />
  );
};

export default ExistingArticleSearchComponent;
