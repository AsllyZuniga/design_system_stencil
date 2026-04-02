import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "stencil-library",
  plugins: [
    sass(),
  ],
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
    {
      type: "www",
      serviceWorker: null,
      copy: [
        {
          src: "demos",
          dest: "demos",
        },
      ],
    },
    reactOutputTarget({
      customElementsDir: "dist-custom-elements",
      outDir: "../react-library/src/components/stencil-generated/",
    }),
  ],
};