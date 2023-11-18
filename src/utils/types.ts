export {};

declare global {
  type ErrorObject = {
    url: string;
    method: string;
    status: number;
    timestamp: string;
    message: string;
    error: any;
    success: boolean;
  };

  type User = {
    email: string;
    emailVerified: boolean;
    history: string[];
  };

  type UserSummaryHistory = {
    type: "summary" | "article";
    title: string;
    category: string;
    content: string;
    date: string;
    _id: string;
  };
}
