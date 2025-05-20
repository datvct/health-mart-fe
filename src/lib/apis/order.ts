import api from '../axios';

const endpoint = '/orders';

class OrderClient {
  constructor(private readonly client = api) {}

  // Tạo Order (không bao gồm shippingAddress và items)
  async createOrder(orderData: OrderData): Promise<Order> {
    // Giả sử BE trả về kết quả theo cấu trúc { statusCode, message, data: order }
    const res = await this.client.post(endpoint, orderData);
    return res.data.data || res.data;
  }

  // Tạo Shipping Address cho Order
  async createShippingAddress(
    shippingData: ShippingAddressWithOrderId
  ): Promise<ShippingAddress> {
    const res = await this.client.post(`${endpoint}/shipping-addresses`, shippingData);
    return res.data.data || res.data;
  }

  // Tạo Order Items cho Order (gửi mảng các OrderItem)
  async createOrderItems(itemsData: OrderItem[]): Promise<OrderItem[]> {
    const res = await this.client.post(`${endpoint}/order-items`, itemsData);
    return res.data.data || res.data;
  }

  // Tạo Order Promotion (Discount)
  async createOrderPromotion(promotionData: CreateOrderPromotionRequest): Promise<OrderPromotion> {
    const res = await this.client.post(`${endpoint}/order-promotions`, promotionData);
    return res.data.data || res.data;
  }

  // Tạo Order và sau đó tạo Shipping Address, Order Items và Order Promotion nếu có
  async createOrderAndShippingAddress(
    orderData: OrderData & { promotion?: CreateOrderPromotionRequest }
  ): Promise<Order> {
    // Tách riêng shippingAddress, items và promotion khỏi payload order
    const { shippingAddress, items, promotion, ...orderPayload } = orderData;
    // Tạo Order đầu tiên
    const order = await this.createOrder(orderPayload);

    // Nếu có shippingAddress, tạo Shipping Address cho Order
    if (shippingAddress) {
      const shippingPayload: ShippingAddressWithOrderId = {
        ...shippingAddress,
        orderId: order.id,
      };
      const shipping = await this.createShippingAddress(shippingPayload);
      order.shippingAddress = shipping;
    }

    // Nếu có items, tạo Order Items cho Order (gán order_id cho từng item)
    if (items && items.length > 0) {
      const itemsPayload: OrderItem[] = items.map((item) => ({
        ...item,
        order_id: order.id,
      }));
      const createdItems = await this.createOrderItems(itemsPayload);
      order.items = createdItems;
    }

    // Nếu có thông tin promotion (Order Promotion), tạo Order Promotion cho đơn hàng
    if (promotion) {
      const promotionPayload: CreateOrderPromotionRequest = {
        // Ghi đè order_id từ đơn mới tạo
        order_id: order.id,
        discountCodeId: promotion.discountCodeId,
      };
      const promotionRes = await this.createOrderPromotion(promotionPayload);
      order.promotion = promotionRes;
    }

    return order;
  }

  async getOrders(): Promise<Order[]> {
    const res = await this.client.get(endpoint);
    return res.data;
  }

  async getOrderById(id: number): Promise<Order> {
    const res = await this.client.get(`${endpoint}/${id}`);
    return res.data;
  }

  async updateOrder(id: number, orderData: Partial<OrderData>): Promise<Order> {
    const res = await this.client.put(`${endpoint}/${id}`, orderData);
    return res.data;
  }

  async getDiscountCodeById(id: number): Promise<unknown> {
    const res = await this.client.get(`${endpoint}/discount-codes/${id}`);
    return res.data.data || res.data;
  }

  async getDiscountCodeByCode(code: string): Promise<Voucher> {
    const res = await this.client.get(`${endpoint}/discount-codes/by-code/${code}`);
    return res.data.data || res.data;
  }
}

// -------------------------
// Các interface cho API
// -------------------------

export interface ShippingAddress {
  recipientName: string;
  phoneNumber: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  pharmacy_id: number | null;
}

export interface ShippingAddressWithOrderId extends ShippingAddress {
  orderId: number;
}

export interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface OrderData {
  user_id?: number | null;
  total_price: number;
  discount: number;
  final_price: number;
  ship_method: 'HOME_DELIVERY' | 'PICK_UP';
  shippingAddress?: ShippingAddress;
  items?: OrderItem[];
}

export interface Order {
  id: number;
  user_id?: number | null;
  total_price: number;
  discount: number;
  final_price: number;
  ship_method: 'HOME_DELIVERY' | 'PICK_UP';
  created_at: string;
  shippingAddress?: ShippingAddress;
  items?: OrderItem[];
  promotion?: OrderPromotion; // Thông tin Order Promotion nếu có
}

export interface OrderPromotion {
  id: number;
  order?: {
    id: number;
  };
  discountCode?: {
    id: number;
    code?: string;
    discountType?: string;
    discountValue?: number;
    validFrom?: string;
    validUntil?: string;
    usageCount?: number;
    usageLimit?: number;
  };
}

export interface CreateOrderPromotionRequest {
  order_id: number;
  discountCodeId: number;
}


export interface Voucher {
  id: number;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
  discountValue: number;
  validFrom: string;
  validUntil: string;
  usageCount: number;
  usageLimit: number;
}

export const orderApi = new OrderClient();
