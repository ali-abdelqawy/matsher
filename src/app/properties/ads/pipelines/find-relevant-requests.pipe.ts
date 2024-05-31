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
      areaMeters: 1,
      priceSar: 1,
      priceByTen: {
        $divide: ["$priceSar", { $toDecimal: "10.00" }],
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
          $subtract: ["$priceSar", "$priceByTen"],
        },
        maxPrice: {
          $add: ["$priceSar", "$priceByTen"],
        },
        areaMeters: "$areaMeters",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$areaMeters", "$$areaMeters"],
                },
                {
                  $gte: ["$priceSar", "$$minPrice"],
                },
                {
                  $lte: ["$priceSar", "$$maxPrice"],
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
            areaMeters: { $toString: "$areaMeters" },
            priceSar: { $toString: "$priceSar" },
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
