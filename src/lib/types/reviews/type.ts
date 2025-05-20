export type Review = {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  isHidden: boolean;
  createdAt: string;
  images: {
    id: number;
    img_url: string;
  }[];
  replies: {
    id: number;
    staffId: number;
    replyText: string;
    createdAt: string;
  }[];
};
