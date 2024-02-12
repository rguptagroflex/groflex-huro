import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const saveProject = (project, requestData) => {
  return new Promise((resolve, reject) => {
    const url = `${config.resourceHost}project`;
    const method = "POST";

    if (requestData.customerData) {
      delete requestData.customerData.id;
    }

    invoiz
      .request(url, {
        auth: true,
        method,
        data: {
          projectData: project,
          depositInvoiceData: requestData,
        },
      })
      .then((response) => {
        const {
          body: {
            data: { projectId },
          },
        } = response;
        resolve(projectId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
