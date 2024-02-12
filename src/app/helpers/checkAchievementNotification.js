import invoiz from "services/invoiz.service";
import config from "oldConfig";
import NotificationService from "services/notification.service";

const getNotificationIcon = (serverIcon) => {
  let svgIconName = "";

  switch (serverIcon) {
    case "Rechnungs-Rockstar":
      svgIconName = "rechnungs_rockstar";
      break;

    case "Umsatzheld":
      svgIconName = "umsatzheld";
      break;

    case "Power-User":
      svgIconName = "power_user";
      break;

    case "Überzeugungskünstler":
      svgIconName = "ueberzeugungskuenstler";
      break;

    case `Everybody's Darling`:
      svgIconName = "everybodys_darling";
      break;

    case "Großfabrikant":
      svgIconName = "grossfabrikant";
      break;

    case "Großinvestor":
      svgIconName = "grossinvestor";
      break;

    case "Steuerberaters Liebling":
      svgIconName = "steuerberaters_liebling";
      break;

    case "Steuermann":
      svgIconName = "steuermann";
      break;

    default:
      break;
  }

  return svgIconName;
};

export const checkAchievementNotification = () => {
  invoiz
    .request(`${config.resourceHost}tenant/awards/notifications`, {
      auth: true,
    })
    .then(
      ({
        body: {
          data: { notifications },
        },
      }) => {
        if (notifications.length > 0) {
          notifications.forEach((notification) => {
            NotificationService.show({
              title: notification.icon,
              message: notification.text,
              points: notification.points,
              svgIcon: getNotificationIcon(notification.icon),
              onClick: () => {
                invoiz.router.redirectTo("/settings/account#achievements");
              },
            });
          });
        }
      }
    );
};
