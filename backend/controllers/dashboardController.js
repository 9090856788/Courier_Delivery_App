import { getDashboardsStatsData } from "../services/analyticsServices.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await getDashboardsStatsData();
    const { _meta, ...payload } = data;
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
