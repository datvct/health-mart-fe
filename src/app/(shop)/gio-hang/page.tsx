import AntdBreadcrumb from '../../../components/Breadcrumb';
import CartInfo from '../../../components/cart/CartInfo';

function CartPage() {
  return (
    <div className="container flex flex-col gap-2 sm:gap-5 py-2">
      <AntdBreadcrumb slug={['/gio-hang']} customTitles={{ '/gio-hang': 'Giỏ hàng' }} />
      <CartInfo />
    </div>
  );
}

export default CartPage;
