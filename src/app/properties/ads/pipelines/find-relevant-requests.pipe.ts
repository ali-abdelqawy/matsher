import { Types } from "mongoose";

export const FindRelevantRequestsPipe = (id: string, skip: number, limit: number, project: object) => [
  {
    $match: {
      _id: new Types.ObjectId(id),
    },
  },
  {
    $project: {
      _id: 0,
      area: 1,
      "price.value": 1,
      priceByTen: {
        $divide: ["$price.value", new Types.Decimal128("10.00")],
      },
      district: 1,
    },
  },
  {
    $lookup: {
      from: "propertyrequests",
      let: {
        district: "$district",
        minPrice: {
          $subtract: ["$price.value", "$priceByTen"],
        },
        maxPrice: {
          $add: ["$price.value", "$priceByTen"],
        },
        area: "$area",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$area.value", "$$area.value"],
                },
                {
                  $eq: ["$area.unit", "$$area.unit"],
                },
                {
                  $gte: ["$price.value", "$$minPrice"],
                },
                {
                  $lte: ["$price.value", "$$maxPrice"],
                },
                {
                  $eq: ["$district", "$$district"],
                },
              ],
            },
          },
        },
        {
          $addFields: {
            "area.value": { $toString: "$area.value" },
            "price.value": { $toString: "$price.value" },
          },
        },
        {
          $sort: {
            refreshedAt: -1,
          },
        },
        { $project: project },
        {
          $facet: {
            data: [
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
            meta: [
              {
                $count: "total",
              },
            ],
          },
        },
        {
          $unwind: "$meta",
        },
      ],
      as: "relevantRequests",
    },
  },
  {
    $project: {
      relevantRequests: 1,
    },
  },
  {
    $unwind: "$relevantRequests",
  },
  {
    $replaceRoot: { newRoot: "$relevantRequests" },
  },
];
