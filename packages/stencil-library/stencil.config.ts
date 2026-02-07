import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "stencil-library",

  outputTargets: [
    {
      type: "dist",
      dir: "dist",
    },
    {
      type: "dist-custom-elements",
      dir: "dist-custom-elements",
      customElementsExportBehavior: "auto-define-custom-elements",
      externalRuntime: false,
      generateTypeDeclarations: true,
    },

    reactOutputTarget({
      customElementsDir: "dist-custom-elements",
      outDir: "../react-library/src/components/stencil-generated/",
    }),

    {
      type: "www",
      serviceWorker: null,
      copy: [
        {
          src: "../../../node_modules/@fortawesome/fontawesome-free/webfonts",
          dest: "webfonts",
        },
        {
          src: "demos",
          dest: "demos",
        },
      ],
    },
  ],
};
