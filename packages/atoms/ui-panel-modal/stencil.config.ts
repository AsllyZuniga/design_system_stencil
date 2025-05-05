import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "ui-panel-modal",
  plugins: [sass()],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
    },
    {
      type: "www",
      serviceWorker: null,
    },
  ],
};
