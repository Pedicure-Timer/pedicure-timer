# Bàn Giao Nhanh Cho Chủ Salon

Tài liệu này là bản ngắn nhất để bàn giao demo cho người vận hành.

## Cách dùng

1. Mở app ở trình duyệt bình thường, trên một thiết bị duy nhất.
2. Bật âm thanh bằng nút `Enable Sound` ở đầu trang.
3. Dùng `Load Sample State` để nạp sẵn dữ liệu demo nếu muốn giới thiệu nhanh.
4. Dùng `Reset All` khi cần xóa toàn bộ trạng thái và bắt đầu lại.

## Những điểm cần nhớ

- Demo lưu trạng thái trong `localStorage`, nên giữ nguyên khi refresh trang.
- Không nên test ở chế độ riêng tư/incognito vì dữ liệu có thể mất khi đóng tab.
- Nếu mở nhiều tab cùng máy, các tab sẽ đồng bộ theo `storage` event.
- Demo không đồng bộ giữa các thiết bị khác nhau; đây là demo đơn máy.

## Kịch bản demo ngắn

1. Bấm `Load Sample State`.
2. Chỉ vào khu ghế đang chạy, khu queue và activity log.
3. Chờ timer hết hoặc dùng queue/ready để minh họa luồng vận hành.
4. Kết thúc bằng `Reset All` nếu muốn quay về trạng thái ban đầu.

## Cần hỗ trợ khi nào

- Timer không chạy đúng sau refresh.
- Không nghe được âm thanh cảnh báo.
- Trạng thái giữa các tab không khớp.
- Cần đổi sang flow demo khác cho buổi trình bày.