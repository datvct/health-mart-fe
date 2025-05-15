import AntdBreadcrumb from '../../../components/Breadcrumb';
import CartInfo from '../../../components/cart/CardInfo';

function CartPage() {
  return (
    <div className="container flex flex-col gap-5 py-2">
      <AntdBreadcrumb slug={['/gio-hang']} customTitles={{ '/gio-hang': 'Giỏ hàng' }} />
      {/* <EmptyCart /> */}
      <CartInfo />
      {/* <ReleatedProduct /> */}
    </div>
  );
}

export default CartPage;
