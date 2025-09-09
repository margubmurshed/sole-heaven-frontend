export interface DailyUserStat {
  date: string;
  count: number;
}

export interface DailyOrderStat {
  date: string;
  count: number;
  totalRevenue: number;
  productsSold: number;
}

export interface PeriodSummary {
  count: number;
  totalRevenue: number;
  productsSold: number;
}

export interface IStats {
  usersPerDay: DailyUserStat[];
  ordersPerDay: DailyOrderStat[];
  thisWeek: {
    users: PeriodSummary;
    orders: PeriodSummary;
    revenue: number;
    productsSold: number;
  };
  lastWeek: {
    users: PeriodSummary;
    orders: PeriodSummary;
    revenue: number;
    productsSold: number;
  };
  growth: {
    users: string;
    orders: string;
    revenue: string;
    productsSold: string;
  };
}
