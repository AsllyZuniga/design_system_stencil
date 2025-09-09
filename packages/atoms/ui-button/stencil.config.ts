import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "ui-button",
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
    reactOutputTarget({
      stencilPackageName: "ui-button",
      customElementsDir: "dist/components",
      outDir: "../../react-library/lib/components/stencil-generated/button/",
      esModules: true,
    }),
  ],
};
