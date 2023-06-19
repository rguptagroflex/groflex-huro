import React from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Button } from "../../shared/components/button/Button";
import { Input } from "../../shared/components/input/Input";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FileInput } from "../../shared/components/fileInput/FileInput";
import { TextArea } from "../../shared/components/textArea/TextArea";

const CreateArticle = () => {
  return (
    <PageContent
      title={"Create Article"}
      breadCrumbData={["Home", "Articles", "Create Article"]}
    >
      <div className="columns is-multiline">
        <div className="column is-7">
          <AdvancedCard
            type={"s-card"}
            footer
            footerContentRight={<Button isSuccess>Save</Button>}
          >
            <h2 className="title is-5 is-bold">Article Info</h2>
            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Article number *</label>
                  <Input placeholder={"Enter Article number"} type={"number"} />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>HSN/SAC Code *</label>
                  <Input type={"text"} placeholder={"E.g., 720991"} />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>Article name *</label>
                  <SelectInput
                    placeholder={<p>Search or type article name</p>}
                    options={[
                      { label: "Article 1", value: "article1" },
                      { label: "Article 2", value: "article2" },
                      { label: "Article 3", value: "article3" },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Article description</label>
                  <TextArea
                    rows={3}
                    placeholder="Enter Details"
                    onChange={() => {}}
                    value={""}
                  />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label>Article Image</label>
                  <FileInput
                    setCompanyInfo={"ompanyInfo"}
                    companyInfo={"companyInfo"}
                    label={"Upload logo"}
                    description={"(Upload jpeg/png image upto 2mb size)"}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>EAN *</label>
                  <Input placeholder={"Enter EAN"} type={"number"} />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>SKU *</label>
                  <Input placeholder={"Enter SKU"} type={"number"} />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Article category *</label>
                  <SelectInput
                    placeholder={<p>Search or type article name</p>}
                    options={[
                      { label: "Category 1", value: "article1" },
                      { label: "Category 2", value: "article2" },
                      { label: "Category 3", value: "article3" },
                    ]}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>HSN/SAC Code *</label>
                  <SelectInput
                    placeholder={<p>Search or type article name</p>}
                    options={[
                      { label: "Unit 1", value: "article1" },
                      { label: "Unit 2", value: "article2" },
                      { label: "Unit 3", value: "article3" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </AdvancedCard>
        </div>
      </div>
    </PageContent>
  );
};

export default CreateArticle;
