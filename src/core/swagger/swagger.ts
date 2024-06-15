import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { writeFileSync } from "fs";
import { join } from "path";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { PUBLIC_FOLDER_PATH } from "../constants";

export abstract class Swagger {
  private static getSpec() {
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
    });
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, undefined, {
      // @ts-ignore
      components: { schemas },
      info: {
        title: "Matsher API",
        description: "A matching system that connects property requests with relevant ads based on specific criteria.",
        version: "1.0.0",
      },
    });
    return JSON.stringify(spec);
  }

  static generate() {
    writeFileSync(join(PUBLIC_FOLDER_PATH, "swagger.json"), this.getSpec(), "utf8");
  }
}
