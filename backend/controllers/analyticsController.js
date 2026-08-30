import { Parcel } from "../models/parcelSchema.js";
import {
  getDashboardsStatsData,
  getLastMonths,
} from "../services/analyticsServices.js";

/* -------------------------------------------------------------------------- */
/*                          Revenue Analytics                                */
/* -------------------------------------------------------------------------- */

export const getRevenueAnalytics = async (req, res, next) => {
  try {
    const data = await getDashboardsStatsData();

    return res.status(200).json({
      success: true,
      data: data.monthlyRevenue,
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                           Parcel Growth                                   */
/* -------------------------------------------------------------------------- */

export const getParcelGrowth = async (req, res, next) => {
  try {
    const data = await getDashboardsStatsData();

    return res.status(200).json({
      success: true,
      data: data.monthlyParcels,
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                            Top Cities                                     */
/* -------------------------------------------------------------------------- */

export const getTopCities = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 8, 20);

    const rows = await Parcel.aggregate([
      {
        $match: {
          destinationCity: {
            $type: "string",
            $ne: "",
          },
        },
      },

      {
        $group: {
          _id: "$destinationCity",
          parcels: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          parcels: -1,
        },
      },

      {
        $limit: limit,
      },

      {
        $project: {
          _id: 0,
          city: "$_id",
          parcels: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                        Delivery Performance                               */
/* -------------------------------------------------------------------------- */

export const getDeliveryPerformance = async (req, res, next) => {
  try {
    const months = getLastMonths(12);
    const startDate = months[0].start;

    const agg = await Parcel.aggregate([
      /* -------------------------------------------------------------------- */
      /*                              Filter                                  */
      /* -------------------------------------------------------------------- */

      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },

      /* -------------------------------------------------------------------- */
      /*                       Get Current Status                             */
      /* -------------------------------------------------------------------- */

      {
        $project: {
          y: {
            $year: "$createdAt",
          },

          m: {
            $month: "$createdAt",
          },

          currentStatus: {
            $ifNull: [
              {
                $arrayElemAt: ["$checkPoints.status", -1],
              },
              "arrived",
            ],
          },
        },
      },

      /* -------------------------------------------------------------------- */
      /*                             Group                                    */
      /* -------------------------------------------------------------------- */

      {
        $group: {
          _id: {
            y: "$y",
            m: "$m",
          },

          total: {
            $sum: 1,
          },

          delivered: {
            $sum: {
              $cond: [
                {
                  $eq: ["$currentStatus", "delivered"],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      /* -------------------------------------------------------------------- */
      /*                       Create Month Key                               */
      /* -------------------------------------------------------------------- */

      {
        $project: {
          _id: 0,

          key: {
            $concat: [
              {
                $toString: "$_id.y",
              },

              "-",

              {
                $cond: [
                  {
                    $lt: ["$_id.m", 10],
                  },

                  {
                    $concat: [
                      "0",
                      {
                        $toString: "$_id.m",
                      },
                    ],
                  },

                  {
                    $toString: "$_id.m",
                  },
                ],
              },
            ],
          },

          total: 1,
          delivered: 1,
        },
      },
    ]);

    /* ---------------------------------------------------------------------- */
    /*                          Convert To Map                                */
    /* ---------------------------------------------------------------------- */

    const byKey = {};

    for (const r of agg) {
      const deliveredPercentage =
        r.total > 0 ? Math.round((r.delivered / r.total) * 100) : 0;

      byKey[r.key] = {
        delivered: deliveredPercentage,
        pending: 100 - deliveredPercentage,
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                         Fill All Months                                */
    /* ---------------------------------------------------------------------- */

    const out = months.map((m) => {
      const performance = byKey[m.key] || {
        delivered: 0,
        pending: 0,
      };

      return {
        month: m.month,
        ...performance,
      };
    });

    return res.status(200).json({
      success: true,
      data: out,
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                         Analytics Summary                                 */
/* -------------------------------------------------------------------------- */

export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const data = await getDashboardsStatsData();

    const citiesServed = (await Parcel.distinct("destinationCity")).filter(
      Boolean,
    ).length;

    return res.status(200).json({
      success: true,

      totals: data.totals,

      statusDistribution: data.statusDistribution,

      citiesServed,
    });
  } catch (error) {
    next(error);
  }
};
