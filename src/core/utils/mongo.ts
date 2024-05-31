import { Model } from "mongoose";
import { FilterDto } from "../dto";
import { AggregateOptions } from "mongoose";
import { Paginator } from "./paginator";
import { Obj } from "./obj";
import { Formatter } from "./formatter";
import { isDate, isNumberString } from "class-validator";

export class Mongo {
  public static formatFilter(options: FilterDto & { fields: string[] }) {
    const { fields, limit, page } = options;
    return {
      skip: (page - 1) * limit,
      limit,
      project: fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
    };
  }

  static formatData(data: any[]) {
    return data.map((record) =>
      Object.keys(record).reduce(
        (formatted: any, key: string) => ({
          ...formatted,
          [key]: record[key],
          ...(isDate(record[key]) && {
            [key]: Formatter.date(record[key]),
          }),
          ...(isNumberString(record[key]) && {
            [key]: Formatter.number(record[key]),
          }),
        }),
        {}
      )
    );
  }

  public static async aggregate(params: {
    model: Model<any>;
    pipelineStages: any[];
    aggOptions?: AggregateOptions;
    limit: number;
    page: number;
  }) {
    const { model, pipelineStages, aggOptions, limit, page } = params;
    const [{ data, meta } = { data: [], meta: {} }] = await model.aggregate(pipelineStages, aggOptions);
    return { data: this.formatData(data), ...Paginator.getMetadata(meta[0].total, limit, page) };
  }

  public static getModelFields(model: Model<any>, type: "pick" | "omit" = "omit", fields: string[] = []) {
    const schemaTree = (model.schema as any).tree;
    const selectedFields = Obj.omit(Obj[type](schemaTree, fields), ["__v", "id"]);
    return Object.keys(selectedFields);
  }
}
