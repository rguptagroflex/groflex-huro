export const BasicCard = ({
  children,
  type,
  headingLeft,
  headingRight,
  isRaised,
  isPrimary,
  isSecondary,
  isInfo,
  isSuccess,
  isWarning,
  isDanger,
  isFlat,
  gutterBottom,
  footerContentLeft,
  footerContentRight,
  headingDescription,
}) => {
  const getCardType = () => {
    switch (type) {
      case "s-card":
        return "s-card";
      case "r-card":
        return "r-card";
      case "l-card":
        return "l-card";
      default:
        return "";
    }
  };

  const getCardClasses = () => {
    const classes = [];

    // Elevation
    isRaised && classes.push("is-raised");
    isFlat && classes.push("is-flat");

    // Margin
    gutterBottom && classes.push("has-margin-bottom");

    // Colors
    isPrimary && classes.push("is-primary");
    isSecondary && classes.push("is-secondary");
    isInfo && classes.push("is-info");
    isSuccess && classes.push("is-success");
    isWarning && classes.push("is-warning");
    isDanger && classes.push("is-danger");

    return classes.join(" ");
  };

  return (
    <div className={`${getCardType()} ${getCardClasses()}`}>
      <div className="card-head">
        {/* Card Heading */}
        <div className="left">
          <h1 className="title is-6">{headingLeft}</h1>
          <span>{headingDescription}</span>
        </div>

        <h1 className="right">{headingRight}</h1>
      </div>

      <div className="card-body">
        {/* Card Content */}
        {children}
      </div>

      <div className="card-foot">
        <div className="left">{footerContentLeft}</div>

        <div className="right">{footerContentRight}</div>
      </div>
    </div>
  );
};
