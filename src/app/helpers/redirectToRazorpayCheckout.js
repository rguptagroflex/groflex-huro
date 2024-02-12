import invoiz from "services/invoiz.service";
import config from "oldConfig";
import { getResource } from "./resource";
import { loadRazorpayScript } from "./loadRazorpayScript";

export const redirectToRazorpay = async (planId, subscriptionDetail) => {
  const checkoutResult = await loadRazorpayScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );
  //const checkoutResult = await loadRazorpayScript('https://checkout.razorpay.com/v1/razorpay.js') Possibly can be used in the future for configuring specific payment methods
  console.log(subscriptionDetail.razorpaySubscription, planId);
  if (!checkoutResult) {
    return;
  }
  let url = "";

  if (planId) {
    url = config.account.endpoints.getRazorpayCheckoutPage + "/" + planId;
  }
  invoiz
    .request(url, {
      auth: true,
    })
    .then((response) => {
      const { orderId, key } = response.body.data.rzrResult;

      const options = {
        key: key,
        order_id: subscriptionId,
        name: "Imprezz",
        currency: "INR",
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
        handler: async function (response) {
          console.log(response);
          const data = {
            orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };

          setTimeout(() => {
            invoiz
              .request(config.account.endpoints.verifyRazorpayTransaction, {
                method: "POST",
                auth: true,
                data,
              })
              .then((res) => {
                invoiz.router.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }, 5000);
        },
        remember_customer: true,
        prefill: {
          name: invoiz.user.companyAddress.companyName,
          email: invoiz.user.userEmail,
          contact: invoiz.user.mobile,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    })
    .catch((error) => {
      invoiz.page.showToast({
        message: getResource("getSubscriptionStateErrorMessage"),
        type: "error",
      });
      throw error;
    });
};
