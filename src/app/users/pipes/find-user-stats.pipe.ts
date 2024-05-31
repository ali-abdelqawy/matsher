export const FindUserStatsPipe = (skip: number, limit: number, project: object) => [
  {
    $facet: {
      data: [
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            __v: 0,
            password: 0,
          },
        },
        {
          $lookup: {
            from: "propertyrequests",
            localField: "_id",
            foreignField: "createdById",
            pipeline: [
              {
                $group: {
                  _id: null,
                  totalPrices: {
                    $sum: "$priceSar",
                  },
                  count: {
                    $count: {},
                  },
                },
              },
            ],
            as: "propertyRequests",
          },
        },
        {
          $lookup: {
            from: "propertyads",
            localField: "_id",
            foreignField: "createdById",
            pipeline: [
              {
                $group: {
                  _id: null,
                  totalPrices: {
                    $sum: "$priceSar",
                  },
                  count: {
                    $count: {},
                  },
                },
              },
            ],
            as: "propertyAds",
          },
        },
        {
          $addFields: {
            totalRequestsAmount: {
              $ifNull: [
                {
                  $first: "$propertyRequests.totalPrices",
                },
                0,
              ],
            },
            requestsCount: {
              $ifNull: [
                {
                  $first: "$propertyRequests.count",
                },
                0,
              ],
            },
            totalAdsAmount: {
              $ifNull: [
                {
                  $first: "$propertyAds.totalPrices",
                },
                0,
              ],
            },
            adsCount: {
              $ifNull: [
                {
                  $first: "$propertyAds.count",
                },
                0,
              ],
            },
          },
        },
        {
          $project: project,
        },
      ],
      meta: [
        {
          $count: "total",
        },
      ],
    },
  },
];
