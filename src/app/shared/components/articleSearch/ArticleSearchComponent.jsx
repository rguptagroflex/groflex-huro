import React, { useState } from "react";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../newConfig";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { debounce } from "lodash";

const ArticleSearchComponent = ({ value, onChange }) => {
  const [article, setArticle] = useState(value);

  const handleChange = (option) => {
    setArticle(option);
    onChange(option);
  };

  const handleLoadOptions = (inputString) => {
    if (!inputString || inputString?.length < 3) return;
    const queryString = inputString.trim();

    return groflexService
      .request(`${config.resourceUrls.articleSearch}${queryString}`, {
        auth: true,
      })
      .then((response) => {
        const {
          body: { data: eanRecords },
        } = response;
        const mappedOptions = eanRecords.map((eanData) => {
          const { mrp, name } = eanData;
          return {
            label: `${name}, ${formatCurrency(mrp)}`,
            value: eanData.name,
            eanData,
          };
        });
        // console.log(mappedOptions, "Mapped options");
        return mappedOptions;
      });
  };

  const debouncedResults = debounce(handleLoadOptions, 300);

  return (
    <SelectInput
      isCreatable
      isAsync
      loadOptions={debouncedResults}
      onChange={handleChange}
      value={article}
      placeholder={"Article Name"}
    />
  );
};

export default ArticleSearchComponent;
