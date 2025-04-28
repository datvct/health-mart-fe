"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Category = {
  id: string;
  name: string;
  description: string;
  content: string;
};

const categories: Category[] = [
  {
    id: "1",
    name: "Giới thiệu nhà thuốc",
    description: "",
    content: `I. Về chúng tôi  
Trực thuộc Công ty cổ phần bán lẻ kỹ thuật số FPT – thành viên Tập đoàn FPT, hệ thống Nhà thuốc FPT Long Châu là một trong những chuỗi bán lẻ dược phẩm uy tín tại Việt Nam. Với hơn 1000 Nhà thuốc tại hơn 63 tỉnh thành (cuối năm 2022), FPT Long Châu chuyên cung cấp đa dạng các loại thuốc kê đơn, không kê đơn, các sản phẩm thực phẩm chức năng, trang thiết bị y tế, dược mỹ phẩm và nhiều sản phẩm chăm sóc sức khoẻ, tiêu dùng hàng ngày,...
II. Sứ mệnh  
Hệ thống Nhà thuốc FPT Long Châu luôn mong muốn được chăm sóc, phục vụ sức khỏe cộng đồng với chất lượng tốt nhất và giá cả hợp lý.

III. Giá trị cốt lõi  
1. Chất lượng tốt - Uy tín hàng đầu

Tất cả các Nhà thuốc trực thuộc hệ thống đều đạt chuẩn Thực hành thuốc tốt – GPP, với đội ngũ dược sĩ có chuyên môn và giàu kinh nghiệm.

Cam kết tư vấn cho khách hàng theo tiêu chí 4 đúng:  
- Đúng thuốc  
- Đúng liều  
- Đúng cách  
- Đúng giá  

Tất cả thuốc và sản phẩm tại chuỗi nhà thuốc FPT Long Châu đều được nhập từ chính hãng, được kiểm soát chất lượng theo quy trình chặt chẽ và bán đúng với giá niêm yết.

2. Khách hàng là trọng tâm

Nhà thuốc FPT Long Châu không ngừng cải thiện chất lượng dịch vụ từ những điều nhỏ nhất, nhằm nâng cao trải nghiệm khách hàng, đem lại sự hài lòng nhất cho Quý khách.  
- Tư vấn thuốc nhanh  
- Hỗ trợ đổi trả cho các đơn hàng trong vòng 30 ngày  
- Giao hàng tận nơi`,
  },
  {
    id: "2",
    name: "Giấy phép kinh doanh",
    description: "",
    content: `
      <p class="mb-4 font-semibold text-center">Danh sách Giấy phép kinh doanh Nhà thuốc Long Châu</p>
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2 text-left">#</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Giấy phép</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Ngày cấp</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Ngày hết hạn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">1</td>
            <td class="border border-gray-300 px-4 py-2">71/2023/ĐKKD/NC/HL</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2023</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2026</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">2</td>
            <td class="border border-gray-300 px-4 py-2">71/2023/ĐKKD/NC/HL</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2023</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2026</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">3</td>
            <td class="border border-gray-300 px-4 py-2">71/2023/ĐKKD/NC/HL</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2023</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2026</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">4</td>
            <td class="border border-gray-300 px-4 py-2">71/2023/ĐKKD/NC/HL</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2023</td>
            <td class="border border-gray-300 px-4 py-2">07/01/2026</td>
          </tr>
        </tbody>
      </table>
`},
  {
    id: "3",
    name: "Quy chế hoạt động",
    description: "",
    content: `
      <strong>Quy chế hoạt động website/ứng dụng thương mại điện tử bán hàng</strong><br/><br/>

      <strong>I. Nguyên tắc chung</strong><br/>
      Website/ứng dụng thương mại điện tử bán hàng do Công ty Cổ phần dược phẩm FPT Long Châu (<strong>Nhà thuốc Long Châu</strong>) thực hiện hoạt động và vận hành. Đối tượng phục vụ là tất cả khách hàng trên 63 tỉnh thành Việt Nam có nhu cầu mua hàng nhưng không có thời gian đến shop hoặc đặt trước để đảm bảo có hàng khi đến shop.<br/><br/>

      <strong>II. Quy định chung</strong><br/>
      <strong>Tên miền website thương mại điện tử bán hàng:</strong> Website <a href="https://nhathuoclongchau.com.vn" target="_blank" rel="noopener noreferrer" class="text-blue-600">https://nhathuoclongchau.com.vn</a> do Công ty Cổ phần dược phẩm FPT Long Châu phát triển, được gọi tắt là <a href="https://nhathuoclongchau.com.vn" target="_blank" rel="noopener noreferrer" class="text-blue-600">nhathuoclongchau.com.vn</a> hoặc “website.”<br/><br/>
      <strong>Tên miền ứng dụng thương mại điện tử bán hàng:</strong> Ứng dụng <a href="https://nhathuoclongchau.com.vn" target="_blank" rel="noopener noreferrer" class="text-blue-600">Long Châu – Chuyên gia thuốc</a> do Công ty Cổ phần dược phẩm FPT Long Châu phát triển trên iOS và Android, được gọi tắt là “Long Châu – Chuyên gia thuốc” hoặc “ứng dụng.”<br/><br/>
      <strong>Định nghĩa chung:</strong><br/>
      - <strong>Người bán:</strong> Công ty Cổ phần dược phẩm FPT Long Châu.<br/>
      - <strong>Người mua:</strong> Công dân Việt Nam trên toàn quốc (có thể đăng ký tài khoản hoặc không).<br/>
      - <strong>Thành viên:</strong> Bao gồm cả người mua và người tham khảo thông tin trên website/ứng dụng.<br/><br/>

      <strong>III. Quy trình giao dịch</strong><br/>
      <strong>Dành cho người mua hàng:</strong><br/>
      <strong>Bước 1:</strong> Tìm kiếm và chọn sản phẩm cần mua.<br/>
      <strong>Bước 2:</strong> Xem thông tin chi tiết sản phẩm.<br/>
      <strong>Bước 3:</strong> Điền đầy đủ thông tin mua hàng (Họ tên, Số điện thoại, Email); chọn phương thức nhận hàng (“Nhận tại nhà thuốc” hoặc “Giao hàng tận nơi”) và phương thức thanh toán (Tiền mặt / Thẻ ATM / Thẻ tín dụng).<br/>
      <strong>Bước 4:</strong> Click “Hoàn tất đặt hàng” để hoàn tất giao dịch.<br/>
      <strong>Bước 5:</strong> Sau khi đơn hàng được nhận, Nhà thuốc Long Châu liên hệ qua số 1800 6928 để xác thực thông tin.<br/>
      <strong>Bước 6:</strong> Giao hàng tận nơi hoặc khách hàng đến trực tiếp cửa hàng để nhận hàng.<br/><br/>

      <strong>Dành cho bên bán hàng – Nhà thuốc Long Châu:</strong><br/>
      - Niêm yết thông tin sản phẩm: hình ảnh thực tế hoặc do hãng cung cấp, bài viết giới thiệu, thông tin chi tiết sản phẩm.<br/>
      - Nhập liệu qua công cụ quản lý nội bộ.<br/>
      - Định dạng hình ảnh sử dụng: jpg, png.<br/><br/>

      <strong>Quy trình giao nhận vận chuyển</strong><br/>
      Nhà thuốc Long Châu thực hiện giao hàng trên toàn quốc theo các hình thức:<br/>
      - Giao hàng tận nơi;<br/>
      - Giữ hàng tại cửa hàng.<br/>
      Miễn phí giao hàng với hóa đơn từ 300.000 đồng nếu giao trong cùng tỉnh/thành phố với cửa hàng gần nhất. Với các trường hợp khác, nhân viên sẽ tư vấn chi tiết.<br/><br/>

      <strong>IV. Quy trình thanh toán</strong><br/>
      Các phương thức thanh toán gồm:<br/>
      1. <strong>Thanh toán trực tiếp:</strong> Người mua đến cửa hàng và thanh toán bằng tiền mặt, thẻ ATM hoặc thẻ tín dụng.<br/>
      2. <strong>Thanh toán sau (COD):</strong> Giao hàng và thu tiền tận nơi.<br/>
      3. <strong>Thanh toán online:</strong> Người mua thanh toán qua thẻ ATM nội địa hoặc thẻ tín dụng sau khi xác thực đơn hàng.<br/><br/>

      <strong>V. Đảm bảo an toàn giao dịch</strong><br/>
      - Người mua cung cấp đầy đủ thông tin (tên, địa chỉ, số điện thoại, email) khi đặt hàng.<br/>
      - Thanh toán trực tuyến được xử lý qua hệ thống ngân hàng liên kết, đảm bảo bảo mật.<br/><br/>

      <strong>VI. Bảo vệ thông tin cá nhân khách hàng</strong><br/>
      Nhà thuốc Long Châu cam kết bảo mật thông tin cá nhân của khách hàng theo chính sách bảo mật. Thông tin chỉ được thu thập khi có sự đồng ý và lưu trữ cho đến khi khách hàng yêu cầu hủy bỏ.<br/><br/>

      <strong>VII. Quản lý thông tin xấu</strong><br/>
      Thành viên phải tự chịu trách nhiệm bảo mật thông tin đăng ký và không được thay đổi, sao chép hay truyền bá thông tin nếu không có sự đồng ý của Nhà thuốc Long Châu.<br/><br/>

      <strong>XI. Điều khoản áp dụng</strong><br/>
      Mọi tranh chấp sẽ được giải quyết trên cơ sở thương lượng; nếu không, vụ việc sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh. Quy chế có hiệu lực từ ngày ban hành và có thể được điều chỉnh theo thông báo của Nhà thuốc Long Châu.
      `
  },
  {
    id: "4",
    name: "Chính sách đặt cọc",
    description: "",
    content: `
      <strong class="text-2xl">Quy trình đặt cọc mua hàng tại Long Châu</strong><br/>
      <img src="/images/chinhsachdatcoc.jpg" alt="Chính sách đặt cọc" class="mb-4 w-full"/>
      *Liên hệ <a href="tel:18006928" class="text-blue-600">1800 6928</a> - Tư Vấn miễn phí<br/><br/>

      <strong class="text-2xl">Những câu hỏi thường gặp khi đặt cọc tại Long Châu</strong><br/><br/>

      <strong>1. Khi nào tôi cần đặt cọc?</strong><br/>
      Khi khách hàng mua hàng hóa số lượng lớn hoặc có nhu cầu mua 
      hàng hóa là hàng đặc biệt đặc chủng thì cần tiến hành đặt cọc 
      cho đơn hàng này.<br/><br/>

      <strong>2. Tôi cần đặt cọc bao nhiêu?</strong><br/>
      Quý Khách cần đặt cọc 30% tổng giá trị đơn hàng.<br/><br/>

      <strong>3. Thời gian nhận hàng sau khi đặt cọc như thế nào?</strong><br/>
      Theo qui định, Long Châu tiếp nhận thông tin và xử lý đơn hàng, trong 
      vòng 15 ngày kể từ ngày đặt cọc đầu tiên Long Châu sẽ liên hệ khách 
      hàng nhận đơn hàng đã đặt cọc.<br/><br/>

      <strong>4. Khi không còn nhu cầu mua hàng nữa, tôi hủy cọc được không?</strong><br/>
      Khi có nhu cầu hủy cọc, khách hàng cần thông báo với Long Châu để được hỗ trợ.
      Ngoài ra, sau 15 ngày kể từ ngày đặt cọc đầu tiên khách hàng 
      không đến Long Châu để nhận hàng thì được xem như là hủy cọc 
      và Long Châu không hỗ trợ hoàn tiền trong trường hợp này.<br/><br/>

      <strong>5. Khi hủy cọc tôi có nhận được 100% giá trị đã đặt cọc không?</strong><br/>
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2 text-left">Thời gian</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Trường hợp</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Chi phí đặt cọc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">24 giờ</td>
            <td class="border border-gray-300 px-4 py-2">Khách hàng hủy cọc</td>
            <td class="border border-gray-300 px-4 py-2">Hoàn 100% giá trị đặt cọc (Hủy cọc không mất phí)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Sau 24 giờ</td>
            <td class="border border-gray-300 px-4 py-2">Khách hàng hủy cọc</td>
            <td class="border border-gray-300 px-4 py-2">Không hoàn tiền (Hủy cọc mất phí)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Từ 2 - 15 ngày</td>
            <td class="border border-gray-300 px-4 py-2">Long Châu không đủ hàng để giao cho khách hàng</td>
            <td class="border border-gray-300 px-4 py-2">Hoàn 100% giá trị đặt cọc (Hủy cọc không mất phí)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Từ 2 - 15 ngày</td>
            <td class="border border-gray-300 px-4 py-2">Long Châu đủ hàng để giao cho khách hàng nhưng khách hàng hủy cọc</td>
            <td class="border border-gray-300 px-4 py-2">Không hoàn tiền (Hủy cọc mất phí)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Sau 15 ngày</td>
            <td class="border border-gray-300 px-4 py-2">Khách hàng không đến lấy sản phẩm, hệ thống tự động hủy đơn cọc</td>
            <td class="border border-gray-300 px-4 py-2">Không hoàn tiền (Hủy cọc mất phí)</td>
          </tr>
        </tbody>
      </table>
      <br/><br/>

      <strong>6. Tôi muốn thay đổi sản phẩm khác với sản phẩm đã đặt cọc được không?</strong><br/>
      Khách hàng có ý định thay đổi sản phẩm khác với sản phẩm được đặt cọc ban đầu. 
      Khách hàng cần thông báo với Long Châu để được hỗ trợ.<br/>
      Trong trường hợp sản phẩm thay đổi:<br/>
      Có giá trị thấp hơn giá trị đặt cọc, khách hàng được hoàn lại phần tiền chênh lệch.<br/>
      Có giá trị cao hơn giá trị đặt cọc, khách hàng cần trả thêm phần tiền chênh lệch.<br/><br/>

      <strong>7. Khi hủy cọc tiền được hoàn lại cho tôi như thế nào?</strong><br/>
      Hoàn tiền tại quầy: Cửa hàng Chi tiền tại quầy cho khách hàng<br/>
      Khách hàng chuyển khoản hoặc cà thẻ, thời gian hoàn tiền: Khách hàng 
      điền thông tin chuyển khoản vào đường link nhận từ nhà thuốc Long Châu 
      ở điện thoại. Long Châu sẽ hoàn lại tiền cho khách hàng từ 2-3 ngày 
      kể từ ngày yêu cầu (không kể thứ 7, CN, ngày lễ)<br/>
      Để được hỗ trợ thêm, vui lòng liên hệ với phòng Chăm Sóc Khách Hàng 
      <a href="tel:18006928" class="text-blue-600">1800 6928</a> nhánh số 3
  `},
  { id: "5", name: "Chính sách nội dung", description: "", content: `
    <strong>1. Thông báo miễn trừ trách nhiệm</strong><br/>
    <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
      <li>Tất cả các sản phẩm bán tại nhà thuốc Long Châu đều có mô tả 
      chi tiết. Nhà thuốc sẽ cung cấp thông tin về sản phẩm như ảnh, 
      giấy phép kinh doanh, thành phần, tác dụng và chỉ định sử dụng. 
      Mặc dù chúng tôi lựa chọn và cung cấp thông tin từ các trang 
      web/ứng dụng đáng tin cậy và chính thống, có độ chính xác cao, 
      nhưng bạn nên coi đó chỉ là tài liệu tham khảo.</li>
      <li>Nhà thuốc Long Châu muốn cung cấp thông tin đầy đủ về thành 
      phần của các loại thuốc. Vì vậy, chúng tôi tổng hợp các thông tin 
      từ Dược thư quốc gia hay hướng dẫn sử dụng được Cục quản lý Dược 
      phê duyệt. Chúng tôi sẽ liên tục cập nhật thông tin mới nhất, 
      vì nó có thể thay đổi theo thời gian. Do đó, trước khi sử dụng, 
      bạn nên đọc kỹ bảng thành phần được cung cấp bởi nhà sản xuất.</li>
      <li>Mục tiêu chúng tôi là cung cấp cho bạn thông tin hiện tại và 
      phù hợp nhất. Tuy nhiên, vì thuốc có thể tương tác, tác dụng phụ 
      khác nhau ở mỗi người, chúng tôi không thể đảm bảo rằng thông tin 
      này bao gồm tất cả các tương tác và tác dụng phụ có thể. 
      Thông tin này không thay thế cho lời khuyên y tế. 
      Luôn luôn nói chuyện với nhà cung cấp dịch vụ y tế và chăm sóc 
      sức khỏe của bạn để được tư vấn kỹ về các tương tác có thể xảy 
      ra với tất cả các loại thuốc hay các sản phẩm không phải là thuốc 
      (thực phẩm chức năng, thực phẩm dinh dưỡng,...) mà bạn đang dùng.</li>
      <li>Nhà thuốc Long Châu có thể sửa đổi hoặc bổ sung thông tin mà 
      không báo trước. Công dụng và hiệu quả điều trị của một sản phẩm 
      có thể thay đổi. Thậm chí, sản phẩm có thể có hiệu quả với người 
      này nhưng không hiệu quả với người khác. Chúng tôi không chịu trách 
      nhiệm đối với bất kỳ thông tin chưa chính xác nào hoặc việc sử dụng 
      thuốc mà không có ý kiến của bác sĩ, chỉ dựa trên thông tin do nhà 
      thuốc cung cấp.</li>
      <li>Tất cả nội dung gồm văn bản, hình ảnh, video và các tài nguyên 
      khác trên website/ứng dụng không được coi là một sự thay thế cho 
      lời khuyên y tế, cũng như chẩn đoán hoặc điều trị từ các bác sĩ. 
      Các thông tin trên website/ứng dụng chỉ nên coi như tài liệu tham 
      khảo, không dùng các thông tin này để “chẩn đoán” hoặc “điều trị” 
      cho các vấn đề sức khỏe cũng như các tình trạng y tế khác.</li>
    </ul><br/>
    <strong>2. Góp ý nội dung</strong><br/>
    Chúng tôi luôn cố gắng chọn lọc và cung cấp thông tin từ các nguồn 
    đáng tin cậy, nhưng không tránh khỏi khả năng có thông tin chưa 
    thật sự chính xác. Nếu bạn phát hiện bất kỳ thông tin không chính 
    xác nào hoặc bạn có bất kỳ góp ý nào về thông tin mà chúng tôi cung 
    cấp, rất mong bạn liên hệ với chúng tôi để chúng tôi có thể sửa đổi 
    và cập nhật thông tin đó.
  `},
  { id: "6", name: "Chính sách đối trả thuốc", description: "", content: `
    <strong>1. Quy định đổi trả</strong>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2 text-left">Nhóm sản phẩm</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Chính sách đổi trả</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Điều kiện áp dụng</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Sản phẩm loại trừ<br/>(không áp dụng đổi trả)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">
              1. Thuốc<br/>
              2. Thực phẩm chức năng<br/>
              3. Hóa/dược mỹ phẩm<br/>
              4. Trang thiết bị y tế ngoài máy (dụng cụ y tế, kit test,...) và các sản phẩm khác
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <strong>Lỗi nhà sản xuất:</strong><br/>
              - Miễn phí đổi hoặc trả hàng<br/>
              - Thời gian đổi trả không quá 30 ngày kể từ ngày mua<br/>
              - Sản phẩm có lỗi nhà sản xuất (biến đổi màu, màu không đồng nhất, sản phẩm dạng viên có bột vụn, sản phẩm dạng kem bị vữa hay vón cục, sản phẩm lỏng dạng hỗn dịch bị phân lớp,...)<br/><br/>
              <strong>Không có lỗi nhà sản xuất và chưa sử dụng:</strong><br/>
              - Miễn phí đổi hoặc trả hàng<br/>
              - Thu 30% giá trị sản phẩm trên hóa đơn nếu mất vỏ hộp (đối với sản phẩm có vỏ hộp)<br/>
              - Thời gian đổi trả không quá 30 ngày kể từ ngày mua<br/>
              - Sản phẩm còn nguyên, bao gồm:<br/>
              &nbsp;&nbsp;&nbsp;+ Chưa xé tem niêm phong hoặc chưa xé vỏ bọc ngoài hộp<br/>
              &nbsp;&nbsp;&nbsp;+ Chưa xé lớp giấy/thiếc bên trong hộp, chưa mở Garanti nắp hộp (đối với sản phẩm không có tem niêm phong hoặc không có vỏ bọc ngoài hộp)
            </td>
            <td class="border border-gray-300 px-4 py-2">
              (Nếu không áp dụng đổi trả)
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <strong>Nhóm loại trừ gồm:</strong><br/>
              - Thuốc đặc trị Covid có thành phần Molnupiravir<br/>
              - Thuốc điều trị ung thư có giá từ 5 triệu đồng<br/>
              - Hàng tiêm chích, hàng lạnh<br/>
              - Hàng đặt lẻ theo yêu cầu của khách hàng, hàng dự án<br/>
              - Hàng cắt liều<br/>
              - Sản phẩm đóng gói không có Garanti/tem niêm phong<br/>
              - Sản phẩm dạng nước (bình xịt,…), dạng kem/gel (tuýp bôi,...)<br/>
              - Sản phẩm không thể tái sử dụng: Bút/que thử thai, vớ, nẹp, kim các loại...<br/>
              - Sản phẩm được khuyến mại<br/>
              - Những sản phẩm không áp dụng đổi trả đã được thông báo trên website/ứng dụng hoặc tại cửa hàng
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">
              5. Trang thiết bị y tế máy
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <strong>Lỗi nhà sản xuất:</strong><br/>
              - Miễn phí đổi hoặc trả hàng<br/>
              - Thời gian đổi trả không quá 1 năm kể từ ngày mua<br/>
              - Sản phẩm phải đầy đủ thành phần chính<br/>
              - Sản phẩm có lỗi nhà sản xuất<br/><br/>
              <strong>Không có lỗi nhà sản xuất (theo nhu cầu khách hàng):</strong><br/>
              - Thu 30% giá trị sản phẩm trên hoá đơn nếu sản phẩm đã qua sử dụng hoặc mất vỏ hộp<br/>
              - Miễn phí đổi hoặc trả hàng nếu sản phẩm chưa sử dụng<br/>
              - Thời gian đổi trả không quá 30 ngày kể từ ngày mua<br/>
              - Sản phẩm phải đầy đủ thành phần chính
            </td>
            <td class="border border-gray-300 px-4 py-2">
              (Nếu không áp dụng đổi trả)
            </td>
            <td class="border border-gray-300 px-4 py-2">
              (Không có dữ liệu)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <strong>Lưu ý:</strong><br/>
    <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
      <li>Các trường hợp đổi/trả dành cho khách hàng có thông tin số điện thoại trên bill để phục vụ tra cứu.</li>
      <li>Quý khách hàng vui lòng hoàn trả các sản phẩm tặng kèm (nếu có) khi phát sinh đổi/trả hàng hóa, 
      hoặc Long Châu thu lại số tiền tương đương mức giá của sản phẩm tặng kèm đã được công bố.</li>
      <li>Ngoại trừ thuốc đặc trị ung thư, Long Châu áp dụng đổi/trả một phần và toàn bộ sản phẩm 
      (Ví dụ: Khách hàng mua 1 hộp 3 vỉ thuốc, Long Châu chấp nhận đổi trả 1 vỉ hoặc cả hộp thuốc...), 
      số tiền hoàn lại được tính dựa theo số lượng thực tế trả hàng và các loại phí theo chính sách (nếu có).</li>
      <li><strong>Đối với thuốc đặc trị ung thư:</strong></li>
      - Bán nguyên hộp: chỉ áp dụng đổi trả nguyên hộp <br />
      - Bán lẻ: áp dụng đổi trả lẻ
    </ul> <br />

    <strong>2. Phương thức đổi trả hàng và cách thức nhận lại tiền</strong> <br />
    Khách hàng mang sản phẩm đã mua (bao gồm vỏ hộp, giấy hướng dẫn sử dụng kèm theo) tới cửa hàng Nhà thuốc 
    Long Châu gần nhất để được thực hiện đổi trả và hoàn tiền. <br />
    Để nhận tiền hoàn, khách hàng có 2 lựa chọn:
    <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
      <li>Hoàn tiền tại quầy: Cửa hàng chi tiền mặt tại quầy cho khách hàng.</li>
      <li>Hoàn tiền qua chuyển khoản: Sau khi tiếp nhận yêu cầu hoàn tiền qua chuyển khoản của khách, Nhà thuốc Long Châu 
      sẽ gửi tới khách hàng một đường link điền thông tin nhận số tiền hoàn vào số điện thoại mua hàng trên đơn hàng. 
      Sau khi khách hàng gửi thông tin thành công, Nhà thuốc Long Châu sẽ hoàn lại tiền trong vòng từ 2-3 ngày 
      (không kể thứ 7, CN, hoặc ngày lễ, Tết).</li>
    </ul>
  ` },
  { id: "7", name: "Chính sách hoàn hủy đổi trả Vắc xin", description: "", content: `
    <strong>1. Chính sách phí và thời gian hoàn - hủy - hoãn tiêm</strong>
    <table class="min-w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-200"">
        <th class="border border-gray-300 px-4 py-2 text-left">Trường hợp</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Thời gian đối trả</th>
        <th class="border border-gray-300 px-4 py-2 text-left"">Chính sách đối trả</th>
      </tr>
    </thead>
    
    <tbody>
      <tr>
        <td class="border border-gray-300 px-4 py-2"><strong>Đối loại vắc xin khác</strong></td>
        <td class="border border-gray-300 px-4 py-2">Toàn bộ thời gian</td>
        <td class="border border-gray-300 px-4 py-2">
          <strong>Khi khách hàng đổi loại vắc xin khác:</strong><br />
          <strong>- Miễn phí đổi</strong><br />
          - Quý khách hàng được hoàn lại hoặc bù thêm số tiền chênh lệch giữa 2 loại vắc xin theo bảng giá niêm yết ở thời điểm đổi vắc xin.
        </td>
      </tr>

      <tr>
        <!-- Cột 1 với rowspan để chiếm hai hàng -->
        <td class="border border-gray-300 px-4 py-2" rowspan="2">
          <strong>Hoàn, hủy gói, mũi lẻ vắc xin</strong>
        </td>
        <!-- Ô đầu tiên của cột 2 -->
        <td class="border border-gray-300 px-4 py-2">
          Trong 3 ngày đầu giao dịch
        </td>
        <!-- Ô đầu tiên của cột 3 -->
        <td class="border border-gray-300 px-4 py-2">
          <strong>- Miễn phí hoàn, hủy</strong><br/>
          - Quý khách hàng được Long Châu hoàn lại số tiền bằng giá trị các mũi tiêm hoàn hủy (đã thanh toán) 
          tại thời điểm mua và toàn bộ phí lưu trữ vắc xin sau khi trừ đi giá trị khuyến mãi của (các) sản phẩm hoàn, hủy.
        </td>
      </tr>
      <tr>
        <!-- Ô thứ hai của cột 2 -->
        <td class="border border-gray-300 px-4 py-2">
          Sau 3 ngày đầu giao dịch
        </td>
        <!-- Ô thứ hai của cột 3 -->
        <td class="border border-gray-300 px-4 py-2">
          Quý khách hàng được Long Châu hoàn lại số tiền bằng giá trị các mũi tiêm hoàn, hủy <strong>(đã thanh toán)</strong> 
          tại thời điểm mua (không bao gồm phí lưu trữ vắc xin) sau khi trừ đi giá trị khuyến mãi của (các) sản phẩm hoàn, hủy.
        </td>
      </tr>

      <tr>
        <!-- Cột 1 với rowspan kéo dài toàn bảng -->
        <td class="border border-gray-300 px-4 py-2" rowspan="3">
          <strong>Hoàn tiêm mũi lẻ</strong>
        </td>
        <!-- Cột 2 -->
        <td class="border border-gray-300 px-4 py-2">
          <strong>Khi khách hàng đổi loại vắc xin khác:</strong><br/>
          <strong>- Miễn phí đổi</strong><br/>
          - Hoàn lại hoặc bù tiền chênh lệch giữa hai loại vắc xin theo bảng giá niêm yết.
        </td>
        <!-- Cột 3 -->
        <td class="border border-gray-300 px-4 py-2">
          <strong>30 ngày kể từ ngày hoàn tất giao dịch:</strong><br/>
          Khi Quý khách hàng đến tiêm, Long Châu sẽ tính thêm 10% phí lưu trữ vắc xin theo giá niêm yết tại thời điểm mua hàng.
        </td>
      </tr>
      <tr>
        <!-- Cột 2 và 3 hợp nhất -->
        <td class="border border-gray-300 px-4 py-2 text-center" colspan="2">
          <strong>Sau 30 ngày kể từ ngày hoàn tất giao dịch:</strong><br/>
          Mũi tiêm không còn giá trị sử dụng và không được hoàn lại.
        </td>
      </tr>
      <tr>
        <!-- Cột 2 -->
        <td class="border border-gray-300 px-4 py-2">
          <strong>Lưu ý:</strong><br/>
          - Quý khách hàng nên đến tiêm trong khoảng thời gian quy định để đảm bảo hiệu quả vắc xin.
        </td>
        <!-- Cột 3 -->
        <td class="border border-gray-300 px-4 py-2">
          <strong>Cam kết:</strong><br/>
          - Long Châu bảo quản vắc xin đúng tiêu chuẩn để đảm bảo chất lượng và hiệu quả khi sử dụng.
        </td>
      </tr>
    </tbody>
  </table>
  
  <strong>Lưu ý:</strong><br />
  <i>- Chính sách đổi trả gói, mũi tiêm chỉ áp dụng đối với các mũi tiêm khách hàng chưa sử dụng</i><br />
  <i>- Quý khách vui lòng hoàn trả các sản phẩm tặng kèm (nếu có) khi phát sinh đổi/trả gói/mũi tiêm hoặc 
  Long Châu sẽ thu lại số tiền tương đương mức giá của sản phẩm tặng kèm đã được công bố.</i><br />
  <i><span style="color: red;">- Đối với trường hợp Quý khách hàng mua gói tiêm thanh toán theo từng phần (có thu cọc trước): 
  Long Châu sẽ hoàn lại cọc chỉ khi Khách hàng thực hiện tiêm và thanh toán tất cả các mũi tiêm đã xuất hóa đơn mua ban đầu.</span></i><br />
  - Khi hoàn hủy mũi tiêm mua theo Chương trình “Gia đình là Số 1”: <br />
  + Hạng gia đình có thể thay đổi nếu không đủ điều kiện để giữ hạng. <br />
  + Ngoài phí lưu trữ, phí thu hồi quà tặng/phiếu mua hàng (nếu có) khi hoàn hủy 1 hay nhiều vắc xin trên hợp đồng mua hàng: <br />
  <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
    <li>Long Châu sẽ thu <strong>PHÍ HOÀN HỦY</strong> bằng số tiền giảm giá theo chương trình khuyến mại 
    “Gia đình là Số 1” của hợp đồng đó <i>(thu 1 lần duy nhất vào lần hoàn hủy đầu tiên của hợp đồng)</i>.</li>
    <li>Không áp dụng hoàn hủy trong trường hợp tổng phí phát sinh do hoàn hủy lớn hơn giá trị cần hoàn trả cho Khách hàng.</li>
  </ul>

  <strong>2. Phương thức đổi trả và cách thức nhận lại tiền</strong><br />
  Quý khách hàng có thể ra trực tiếp Trung tâm Tiêm chủng Long Châu gần nhất hoặc liên hệ qua 
  Tổng đài 18006928 (Nhánh 2) để thực hiện đổi trả và hoàn tiền. <br />
  Để nhận tiền hoàn, Quý khách hàng có 2 lựa chọn:
  <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
    <li>Hoàn tiền tại Quầy: Quý Khách hàng ra Trung tâm Tiêm chủng Long Châu gần nhất thực hiện đổi trả, 
    TTTC Long Châu sẽ chi tiền mặt tại quầy cho Khách hàng</li>
    <li>Hoàn tiền qua chuyển khoản: Sau khi tiếp nhận yêu cầu, TTTC Long Châu sẽ gửi tới khách hàng một đường link điền thông tin 
    nhận số tiền hoàn vào số điện thoại mua hàng trên đơn hàng. Sau khi Khách hàng gửi thông tin thành công, 
    TTTC Long Châu sẽ hoàn lại tiền trong vòng 2-3 ngày (không kể T7, CN hoặc ngày lễ, tết).</li>
  </ul>

  <strong>3. Hiệu lực của hợp đồng gói vắc xin</strong><br />
  <strong>3.1.Thời hạn sử dụng dịch vụ khi mua gói vắc-xin tại Tiêm Chủng Long Châu</strong>
  <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
    <li>Thời hạn sử dụng dịch vụ đối với gói vắc-xin được tính từ <strong>ngày ký kết hợp đồng</strong> đến 
    <strong>03 tháng sau ngày hoàn tất mũi tiêm cuối cùng trong phác đồ tiêm vắc-xin</strong>.</li>
    <li>Sau thời gian này, nếu khách hàng chưa hoàn thành phác đồ tiêm chủng, 
    <strong>gói dịch vụ sẽ tự động hết hiệu lực và không còn giá trị sử dụng</strong>.</li>
  </ul>
  <strong>3.2. Chính sách xử lý trong trường hợp bất khả kháng</strong>
  <ul class="list-disc marker:text-blue-600 ml-6 space-y-1">
    <li>Trong trường hợp xảy ra sự kiện bất khả kháng (dịch bệnh, thiên tai, thay đổi chính sách y tế hoặc lý do chính đáng khác) 
    khiến khách hàng không thể hoàn thành phác đồ tiêm chủng trong thời gian quy định, 
    <strong>khách hàng có thể được xem xét gia hạn thời gian sử dụng dịch vụ</strong> theo quyết định của Long Châu.</li>
    <li>Việc gia hạn sẽ được <strong>xem xét theo từng trường hợp cụ thể</strong> và cần có xác nhận chính thức 
    từ Long Châu về việc tiếp tục cung cấp dịch vụ.</li>
    <li><strong>Chi phí lưu trữ vắc-xin:</strong> Nếu được gia hạn, khách hàng sẽ chịu <strong>phí lưu trữ vắc-xin</strong> theo chính sách của 
    Long Châu tại từng thời điểm. <strong>Mức phí cụ thể sẽ được thông báo tại thời điểm đăng ký gia hạn</strong>.</li>
  </ul>
  ` },

  { id: "8", name: "Chính sách giao hàng", description: "", content: `
    <strong>I. Về đơn thuốc</strong><br /><br />
    <strong>1. Nhà thuốc Long Châu có giao hàng thuốc không?</strong><br />
    <strong>Thuốc kê đơn:</strong> Nhà thuốc Long Châu chỉ bán thuốc kê đơn tại nhà thuốc khi có đơn thuốc hợp lệ, 
    theo đúng chỉ định của người kê đơn, Thuốc kê đơn không bán trực tuyến. <br />
    <strong>Thuốc không kê đơn:</strong> Quý khách có thể đặt hàng thuốc không kê đơn trực tuyến qua trang web <a href="https://nhathuoclongchau.com.vn" class="text-blue-600">https://nhathuoclongchau.com.vn</a>,
    hoặc thông qua ứng dụng <strong>"Long Châu – Chuyên gia thuốc"</strong>, 
    Quý khách hàng liên hệ tổng đài <a href="tel:18006928" class="text-blue-600">1800 6928</a> để được hỗ trợ miễn phí. <br />
    Chi tiết ứng dụng Long Châu – Chuyên gia thuốc: <br />

    <img src="/images/app.jpg" alt="App" class="mb-4 w-100"/> <br />

    <strong>2. Khi nào tôi có thể nhận được đơn hàng?</strong><br />
    Tại thời điểm đặt hàng. Quý Khách có thể kiểm tra trạng thái đơn hàng thông qua ứng dụng Long Châu – 
    Chuyên gia thuốc hoặc liên hệ tổng đài miễn cước <a href="tel:18006928" class="text-blue-600">1800 6928</a> 
    để biết được thời gian nhận được đơn hàng dự kiến. <br />

    <strong>II. Giao hàng</strong><br />
    <strong>1. Phí giao hàng</strong>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-3 text-left" rowspan="2">Kênh mua hàng áp dụng</th>
            <th class="border border-gray-300 p-3 text-left" rowspan="2">Giá trị đơn hàng</th>
            <th class="border border-gray-300 p-3 text-center" colspan="2">Phí giao hàng</th>
          </tr>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-3">Nội tỉnh/Thành phố</th>
            <th class="border border-gray-300 p-3">Liên tỉnh/Thành phố</th>
          </tr>
        </thead>
        
        <tbody>
          <!-- Hàng 1 -->
          <tr>
            <td class="border border-gray-300 p-3" rowspan="2">Tổng đài/ Website/ Facebook</td>
            <td class="border border-gray-300 p-3">Đơn hàng từ 300.000 VND trở lên</td>
            <td class="border border-gray-300 p-3 text-center">Miễn phí</td>
            <td class="border border-gray-300 p-3 text-center">40.000 VND</td>
          </tr>

          <!-- Hàng 2 -->
          <tr>
            <td class="border border-gray-300 p-3">Đơn hàng dưới 300.000 VND</td>
            <td class="border border-gray-300 p-3 text-center">25.000 VND</td>
            <td class="border border-gray-300 p-3 text-center">40.000 VND</td>
          </tr>

          <!-- Hàng 3 -->
          <tr>
            <td class="border border-gray-300 p-3">App (ứng dụng) / Zalo</td>
            <td class="border border-gray-300 p-3">Tất cả đơn hàng</td>
            <td class="border border-gray-300 p-3 text-center">Miễn phí</td>
            <td class="border border-gray-300 p-3 text-center">Miễn phí</td>
          </tr>
        </tbody>
      </table>
    </div>

    <strong>2. Thời gian giao hàng</strong>
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 border border-gray-300">Khu vực</th>
            <th class="p-3 border border-gray-300">Khoảng cách</th>
            <th class="p-3 border border-gray-300">Thời gian giao hàng dự kiến</th>
          </tr>
        </thead>
        
        <tbody>
          <!-- HN/HCM/ĐN -->
          <tr class="bg-white">
            <td class="p-3 border border-gray-300 align-top" rowspan="2">
              HN/HCM/ĐN
            </td>
            <td class="p-3 border border-gray-300">&lt;10 km</td>
            <td class="p-3 border border-gray-300">Từ 8h - 20h tất cả các ngày trong tuần</td>
          </tr>
          <tr class="bg-white">
            <td class="p-3 border border-gray-300">&gt;10km</td>
            <td class="p-3 border border-gray-300">Từ 8h - 20h tất cả các ngày trong tuần</td>
          </tr>

          <!-- Nội tỉnh -->
          <tr class="bg-white">
            <td class="p-3 border border-gray-300 align-top" rowspan="2">
              Nội tỉnh/thành phố<br/>(trừ HN/HCM/ĐN)
            </td>
            <td class="p-3 border border-gray-300">&lt;10 km</td>
            <td class="p-3 border border-gray-300">Từ 8h - 20h tất cả các ngày trong tuần</td>
          </tr>
          <tr class="bg-white">
            <td class="p-3 border border-gray-300">&gt;10km</td>
            <td class="p-3 border border-gray-300">Từ 1 - 2 ngày làm việc</td>
          </tr>

          <!-- Liên tỉnh -->
          <tr class="bg-white">
            <td class="p-3 border border-gray-300 align-top" rowspan="3">
              Liên tỉnh/thành phố
            </td>
            <td class="p-3 border border-gray-300">Dưới 200km</td>
            <td class="p-3 border border-gray-300">Từ 2 - 3 ngày làm việc</td>
          </tr>
          <tr class="bg-white">
            <td class="p-3 border border-gray-300">Từ 200 Km trở lên</td>
            <td class="p-3 border border-gray-300">Từ 3 - 5 ngày làm việc</td>
          </tr>
          <tr class="bg-white">
            <td class="p-3 border border-gray-300">Tuyến Huyện/Xã</td>
            <td class="p-3 border border-gray-300">Từ 4 - 6 ngày làm việc</td>
          </tr>
        </tbody>
      </table>
    </div>

    <strong><i>Lưu ý:</i></strong> Thời gian giao hàng dự kiến áp dụng cho các sản phẩm có sẵn. 
    Nếu sản phẩm tạm hết, thời gian giao hàng có thể kéo dài hơn dự kiến từ 5-7 ngày làm việc. <br />

    <strong>Giao hàng quốc tế</strong><br />
    Nhà thuốc Long Châu hiện tại chỉ giao hàng trong lãnh thổ Việt Nam và chưa hỗ trợ giao hàng quốc tế. <br />

    <strong>Hình thức thanh toán, có 3 cách:</strong><br />
    <strong>Thanh toán tại chỗ (Ship COD):</strong> Long Châu sẽ gọi lại cho khách hàng để xin địa chỉ giao hàng 
    tận nơi và nhận thanh toán tại chỗ. <br />
    <strong>Thanh toán qua thẻ ngân hàng:</strong> Chấp nhận thanh toán nhiều thương hiệu 
    và loại thẻ bao gồm thẻ ATM, thẻ Visa, MasterCard,... <br />
    <strong>Chuyển khoản trước:</strong> Khách hàng có thể chọn chuyển khoản trước vào tài khoản của Nhà thuốc Long Châu <br />
    Số tài khoản: <strong>113002672043</strong> <br />
    Chủ tài khoản: <strong>Công ty Cổ Phần Dược Phẩm FPT Long Châu</strong> <br />
    Ngân Hàng: <strong>Ngân hàng TMCP Công Thương Việt Nam - Chi nhánh 1, PGD Tân Định</strong><br />

    <strong>III. Thông tin giao hàng</strong><br />
    <strong>1. Nhà thuốc Long Châu có giao hàng vào cuối tuần và ngày lễ không?</strong> <br />
    Nhà thuốc Long châu giao hàng vào tất cả các ngày trong tuần. <br />
    <strong>2. Tôi đang rất cần sản phẩm, nhà thuốc Long Châu có thể giao gấp cho tôi được không?</strong><br />
    Nhà thuốc Long châu sẽ cố gắng giao hàng trong thời gian sớm nhất cho quý khách hàng. <br />
    <strong>3. Làm sao để tôi biết được chính xác khi nào tôi nhận được hàng?</strong><br />
    Theo qui định, Long Châu tiếp nhận thông tin và xử lý đơn hàng, 
    trong vòng 15 ngày kể từ ngày đặt cọc đầu tiên Long Châu sẽ liên hệ khách hàng nhận đơn hàng đã đặt cọc. <br />
    <strong>4. Tôi có thể hẹn thời gian giao hàng được không?</strong><br />
    Quý Khách hàng có thể hẹn giờ giao hàng từ 8h - 20h tất cả các ngày trong tuần <br />
    <strong>5. Kiểm tra hàng trước khi thanh toán</strong><br />
    Trước khi thanh toán cho đơn hàng, quý khách có thể yêu cầu nhân viên giao nhận mở kiện hàng để kiểm tra tình trạng ngoại quan 
    của sản phẩm (không bao gồm việc dùng thử sản phẩm). <br />
    Trong trường hợp quý khách không hài lòng với bất kì sản phẩm trong đơn hàng, 
    ngay tại thời điểm được giao hàng, quý khách vui lòng từ chối không nhận toàn bộ kiện hàng hoặc 
    thanh toán toàn bộ giá trị đơn hàng và hoàn trả lại cho bưu tá giao hàng. <br />
    Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ bộ phận chăm sóc khách hàng 1800 6928 nhánh số 3 của Nhà thuốc 
    Long Châu để được hỗ trợ nhanh chóng. <br />
    <strong>6. Nếu giao hàng không thành công, Nhà thuốc Long Châu có thông báo cho tôi biết không?</strong> <br />
    Trong trường hợp đơn hàng chưa được giao thành công đến quý khách lần thứ nhất, 
    nhà thuốc Long Châu sẽ liên hệ với quý khách để sắp xếp lại lịch giao hàng. <br />
    Trường hợp Nhà thuốc Long Châu không thể kết nối được với quý khách hoặc đơn vị vận chuyển không thể giao hàng 
    thành công đến quý khách đơn hàng sẽ được hủy bởi hệ thống.
  ` },
  { id: "9", name: "Chính sách bảo mật", description: "", content: "Nội dung bảo mật..." },
  { id: "10", name: "Chính sách thanh toán", description: "", content: "Nội dung thanh toán..." },
  { id: "11", name: "Chính sách thu thập và xử lý dữ liệu cá nhân", description: "", content: "Nội dung thu thập dữ liệu..." },
  { id: "12", name: "Thông tin trung tâm bảo hành máy thiết bị y tế từng hãng", description: "", content: "Nội dung bảo hành..." },
];

function ExtraInfo() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-10 border-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
        <div className="flex flex-col items-center">
          <span className="text-4xl">💊</span>
          <h3 className="mt-2 font-bold text-sm">THUỐC CHÍNH HÃNG</h3>
          <p className="text-xs text-gray-600">Đa dạng &amp; chuyên sâu</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">🔄</span>
          <h3 className="mt-2 font-bold text-sm">ĐỔI TRẢ TRONG 30 NGÀY</h3>
          <p className="text-xs text-gray-600">Từ ngày mua hàng</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">🛡️</span>
          <h3 className="mt-2 font-bold text-sm">CAM KẾT 100%</h3>
          <p className="text-xs text-gray-600">Chất lượng sản phẩm</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">🚚</span>
          <h3 className="mt-2 font-bold text-sm">MIỄN PHÍ VẬN CHUYỂN</h3>
          <p className="text-xs text-gray-600">Theo chính sách giao hàng</p>
        </div>
      </div>
    </div>
  );
}

const renderContent = (content: string, categoryId: string) => {
  if (categoryId === "1") {
    return renderFormattedContent(content);
  } else if (categoryId === "2" || categoryId === "3" || categoryId === "4" || categoryId === "5" || categoryId === "6" || categoryId === "7" || categoryId === "8") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  } else {
    return content.split("\n").map((line, idx) => <p key={idx}>{line}</p>);
  }
};

function renderFormattedContent(content: string): React.ReactNode[] {
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  let elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let insideFirstSection = false;
  let firstParagraphCaptured = false;
  let firstParagraphLines: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={"ul-" + elements.length} className="list-disc ml-6 space-y-1">
          {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, idx) => {
    if (/^- /.test(line)) {
      listItems.push(line.substring(2));
    } else {
      flushList();
      if (/^[IVX]+\./.test(line)) {
        elements.push(
          <h2 key={idx} className="text-xl font-bold mt-6 mb-2">
            {line}
          </h2>
        );
        if (line.startsWith("I. Về chúng tôi")) {
          insideFirstSection = true;
        } else {
          insideFirstSection = false;
        }
      } else if (/^\d+\./.test(line)) {
        elements.push(
          <p key={idx} className="font-semibold">
            {line}
          </p>
        );
      } else {
        if (insideFirstSection && !firstParagraphCaptured) {
          firstParagraphLines.push(line);
          if (line.endsWith("...")) {
            elements.push(
              <div
                key={"gray-box"}
                className="bg-gray-100 p-6 rounded-md shadow-md text-gray-800 my-4 flex items-start space-x-4"
              >
                <div className="text-5xl text-gray-300 select-none leading-none pt-1">
                  “
                </div>
                <div className="space-y-2">
                  {firstParagraphLines.map((p, subIdx) => (
                    <p key={subIdx} className="text-base leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            );
            firstParagraphCaptured = true;
            insideFirstSection = false;
          }
        } else {
          elements.push(<p key={idx}>{line}</p>);
        }
      }
    }
  });

  flushList();
  return elements;
}

export default function CategoryPage() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id") || "1";
  const selectedCategory = categories.find((cat) => cat.id === queryId) || categories[0];

  const handleSelectCategory = (cat: Category) => {
    push(`/introduction?id=${cat.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow flex overflow-hidden min-h-[500px]">
        <aside className="w-64 bg-gray-50">
          <div className="border-b p-4 font-semibold">Bài viết trong danh mục</div>
          <ul className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className={`cursor-pointer px-4 py-3 text-sm hover:bg-gray-100 transition ${
                  selectedCategory.id === cat.id ? "bg-white font-semibold text-blue-600" : ""
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-black mb-6">
            {selectedCategory.name}
          </h1>
          <div className="space-y-4 text-gray-800 leading-relaxed">
            {renderContent(selectedCategory.content, selectedCategory.id)}
          </div>
        </section>
      </div>
      <ExtraInfo />
    </div>
  );
}
