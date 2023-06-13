import React, { useState } from "react";

export const FileInput = ({
  label,
  description,
  setCompanyInfo,
  companyInfo,
}) => {
  const [sizeLimit, setSizeLimit] = useState(true);

  function handleInputLogo(event) {
    if (event.target.files[0].size > 2000000) {
      setSizeLimit(false);
      return;
    }

    setCompanyInfo({ ...companyInfo, logoPath: event.target.files[0] });
    setSizeLimit(true);
  }

  return (
    <div className="control">
      <div className="file is-boxed is-default">
        {companyInfo.logoPath ? (
          <div>
            <img
              alt="Not found"
              style={{
                width: "290px",
                height: "82px",
                objectFit: "contain",
              }}
              src={URL.createObjectURL(companyInfo.logoPath)}
            />
            <br />
            <a
              className="button h-button"
              onClick={() => setCompanyInfo({ ...companyInfo, logoPath: null })}
            >
              Change Logo
            </a>
          </div>
        ) : (
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(event) => {
                handleInputLogo(event);
              }}
            />
            <span className="file-cta">
              <span className="file-icon" style={{ color: "#00a353" }}>
                <i className="fas fa-upload"></i>{" "}
                <span className="column is-weight-700">{label}</span>
              </span>
              <span className="file-label m-t-10">
                <p style={{ color: sizeLimit === true ? "" : "red" }}>
                  {description}
                </p>
              </span>
            </span>
          </label>
        )}
      </div>
    </div>
  );
};
