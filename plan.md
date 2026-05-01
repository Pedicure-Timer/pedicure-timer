# Kế Hoạch Chuẩn Cho Demo MVP Pedicure Timer Và Digital Queue

## Kết Luận Điều Hành

Bản demo nên được build như một single-page web app chạy hoàn toàn client-side, dùng React với một reducer trung tâm để tất cả sự kiện nghiệp vụ đi qua cùng một đường ống trạng thái: bật ghế, hết giờ, thêm vào queue, manicure bấm Ready, assign khách mới, reset chair, reset all, và hydrate sau refresh. Cách này phù hợp với bản MVP vì `useReducer` gom logic cập nhật state ra khỏi event handler, còn Vite cho vòng lặp dev nhanh và build ra static assets gọn để đưa lên một link share test nội bộ.

Điểm quan trọng nhất của bản demo này không phải là vẽ dashboard thật đẹp, mà là chốt đúng bốn quyết định kiến trúc:

- Timer phải dựa trên mốc thời gian tuyệt đối chứ không đếm lùi bằng số.
- State phải được persist chủ động chứ không chờ lúc tab đóng.
- Logic timer phải idempotent để không double-add queue khi chạy dev mode.
- Âm thanh phải có bước “bật âm thanh” do người dùng chủ động vì trình duyệt hiện đại chặn autoplay audio/Web Audio ngoài ngữ cảnh user gesture.

Nếu khóa đúng bốn điểm này từ đầu, demo sẽ đủ tin cậy để test logic chống gian lận và UX vận hành với chủ salon trước khi đụng đến phần cứng thật.

## Phạm Vi Chuẩn Của Demo

Phạm vi hợp lý cho demo là mô phỏng flow vận hành, không mô phỏng hạ tầng production. Điều đó có nghĩa là:

- Bốn pedicure chairs.
- Bốn manicure techs.
- Chair timer 40/70 giây ở demo mode.
- Queue FIFO theo `readyAt`.
- Dashboard trạng thái màu + countdown + alert.
- Nút mock “Simulate Chair On”.
- Nút “Assign Next Customer” để mô phỏng receptionist lấy người đầu queue.

Phần còn lại như tích hợp thiết bị thật, backend multi-user, auth, báo cáo, multi-salon, hay detection logic upgrade tự động nên để ngoài phạm vi của vòng demo này vì bản chất đây là bài test nghiệp vụ và UX chứ chưa phải hệ thống vận hành đa thiết bị.

Một giả định vận hành rất nên chốt bằng văn bản ngay từ đầu là: bản demo chỉ có một nguồn sự thật trên một trình duyệt hoặc chính thiết bị đang mở demo. `localStorage` tồn tại theo origin của trình duyệt và lưu qua các lần refresh, còn `storage` event chỉ giúp các tab khác cùng origin trên cùng môi trường duyệt web biết có thay đổi; nó không biến bản demo thành hệ thống realtime đa thiết bị.

Cũng vì chọn lưu local state ở trình duyệt, hướng dẫn test cho chủ salon nên ghi rõ: không test ở chế độ incognito/private, vì trong private mode thì `localStorage` được đối xử gần như `sessionStorage` và dữ liệu sẽ bị xóa khi đóng tab hoặc đóng trình duyệt.

## Kiến Trúc Kỹ Thuật Khuyến Nghị

Stack khuyến nghị vẫn bám đúng yêu cầu gốc nhưng tinh chỉnh để demo bền hơn: React + Tailwind + Vite, state tập trung bằng `useReducer`, side effects chỉ để đồng bộ với timer/audio/storage, và deploy static bằng một link share nội bộ. React mô tả `useReducer` là công cụ phù hợp khi muốn đưa logic update state ra khỏi handler vào một hàm reducer duy nhất; `useEffect` là nơi để đồng bộ với external systems như timer hay browser events; còn Vite được tài liệu chính thức mô tả là build tool hướng đến trải nghiệm dev nhanh, lean, có dev server và build optimized static assets cho production.

Về timer engine, nên không lưu `remainingSeconds` như một biến đếm xuống để trừ đi mỗi giây. Thay vào đó, ngay khi chair bắt đầu, app lưu `startedAt` và `endsAt` dưới dạng epoch milliseconds; UI chỉ là kết quả của phép tính `remainingMs = max(0, endsAt - Date.now())`.

Lý do phải làm như vậy là vì timeout/interval ở background tabs có thể bị throttle, và `requestAnimationFrame()` còn có thể dừng hẳn khi tab bị ẩn.

Cách persist đúng cho demo là ghi state sau mỗi action quan trọng và ghi bổ sung khi trang chuyển sang hidden qua `visibilitychange`. MDN nêu rõ `beforeunload` không đáng tin cậy, nhất là trên mobile, còn `visibilitychange` là sự kiện cuối cùng có thể quan sát tin cậy trước khi session thực tế kết thúc hoặc app bị đưa nền. Vì vậy, reducer nên cập nhật state trong memory trước, sau đó một effect nhỏ serialize state tối giản vào `localStorage`.

Về âm thanh, nên xem “Bật âm thanh” là một bước setup bắt buộc của demo chứ không phải phụ kiện. Trình duyệt sẽ chặn việc tự phát âm thanh nếu không có user gesture; với Web Audio, nguyên tắc thực tế là tạo hoặc resume context từ bên trong một user gesture. Bởi vậy, banner đầu trang hoặc modal đầu phiên nên có nút “Bật âm thanh cảnh báo”, và chỉ sau cú click đó mới tạo hoặc `resume()` `AudioContext`.

Một điểm rất đáng làm đúng từ đầu là tách nguồn sự kiện với logic nghiệp vụ. Trong demo hôm nay, nguồn sự kiện là nút “Simulate Chair On”; sau này, ở production, nguồn sự kiện có thể là smart plug của Shelly gửi signal qua URL actions/webhooks hoặc scripting. Vì thế, nếu ngay từ demo bạn chuẩn hóa action domain kiểu `CHAIR_STARTED({ chairId, durationMs, source })`, thì sau này phần rewrite chủ yếu chỉ là thay button click bằng hardware event, còn reducer và state machine gần như giữ nguyên.

## Mô Hình Dữ Liệu Và Máy Trạng Thái

Data model gốc của brief là đúng hướng, nhưng để demo bền hơn khi test edge case, nên nâng nó thành một model hơi chuẩn hóa hơn thay vì giữ nguyên bản tối thiểu.

### Chair

- `id`
- `techId`
- `status: 'idle' | 'running' | 'finished'`
- `serviceType`
- `startedAt`
- `endsAt`
- `completedAt`
- `lastCompletionToken`

### Tech

- `id`
- `name`
- `role: 'pedi' | 'mani'`
- `status: 'idle' | 'queued' | 'assigned' | 'busy'`
- `readyAt`
- `queueEntryId`
- `chairId?`

### QueueEntry

QueueEntry nên tách riêng thay vì dùng thẳng mảng tech IDs:

- `id`
- `techId`
- `readyAt`
- `seq`
- `source: 'timer_complete' | 'manual_ready'`

### AppSettings

- `demoMode`
- `durations`
- `soundEnabled`
- `schemaVersion`

### AppMeta

- `lastPersistedAt`
- `nowOffset?`
- `eventLog`

Điểm then chốt là chỉ persist state nền tảng, không persist derived state. Nghĩa là không lưu `remainingSeconds`, `servingCount`, hay `queueLength` trong storage; các giá trị đó phải được tính từ timestamps và collections hiện có.

Với timer, thứ cần lưu là `endsAt`, không phải “còn 23 giây”. Với queue, thứ cần lưu là `readyAt + seq`, không phải “đứng thứ 2”. Cách này vừa chống sai số sau refresh, vừa làm reducer dễ kiểm soát hơn.

Một tinh chỉnh quan trọng nữa là thêm `seq` làm tie-breaker cho queue. Trên lý thuyết, `readyAt` đã là FIFO, nhưng trong demo rất dễ có trường hợp hai thao tác xảy ra sát nhau đến mức cùng millisecond hoặc bị hydrate lại theo cùng timestamp. `seq` tăng dần theo mỗi lần enqueue sẽ giúp thứ tự ổn định và giải thích được.

Reducer cũng phải được viết theo hướng idempotent. Khi bật Strict Mode trong development, effect sẽ chạy thêm một vòng setup/cleanup để phát hiện bug; với timer logic, điều đó có thể vô tình gây double side effect nếu reducer không chặn transition bất hợp lệ. Vì thế, action `CHAIR_EXPIRED` phải kiểm tra chair còn đang running hay không trước khi chuyển sang finished; enqueue cũng phải từ chối nếu tech đã có `queueEntryId` hoặc đã ở trạng thái queued.

## Luồng Nghiệp Vụ Và Quyết Định Sản Phẩm

Flow chuẩn nên được diễn giải như sau. Khi chair bắt đầu, tech pedi trên chair đó bấm “Simulate Chair On”, chọn 40 hoặc 70, reducer ghi `startedAt/endsAt`, chair chuyển sang running, tech chuyển busy, và UI chỉ hiển thị countdown suy ra từ `endsAt - Date.now()`. Trong lúc chạy không có nút stop sớm. Đây là điểm chống gian lận quan trọng nhất của demo: hệ thống có thể cho reset sau khi hoàn tất, nhưng không cho cắt non một session đang chạy.

Khi countdown chạm 0, app nên tự động chuyển chair sang finished, phát alert, và enqueue tech pedi ngay với `readyAt = now`. Không nên chèn thêm bước “tech xác nhận đã xong” trong bản demo chuẩn, vì như vậy sẽ làm yếu đi mục tiêu anti-cheat và làm queue quay lại phụ thuộc thao tác thủ công.

Với manicure tech, nút “I’m Ready for Next Customer” chỉ nên enqueue nếu tech chưa ở queue và chưa bận. Queue luôn sort theo `readyAt`, rồi `seq` để giữ FIFO ổn định. Nên thêm một nút rõ ràng ở panel queue là “Assign Next Customer” thay vì âm thầm pop queue tự động.

Reset chair nên là flow độc lập với queue. Nghĩa là khi chair đã finished, tech có thể đã vào queue rồi; nút reset sau khi cleaning chỉ đưa chair về idle, không hủy queue entry nào đã được tạo trước đó. Điều này bám khá sát cách salon vận hành: availability của tech được tính khi service kết thúc, còn readiness của ghế là một bước thao tác vật lý tiếp theo.

Ba quyết định sản phẩm nên chốt luôn trong bản kế hoạch này là:

1. Khi timer hết, tech có vào queue ngay không? Nên vào ngay tự động.
2. Nếu khách upgrade giữa session thì sao? Bản demo chuẩn không nên tự động detect upgrade. Nếu chủ salon thật sự muốn xem flow này, chỉ thêm một action một chiều “Extend to 70” dành cho supervisor/demo, có confirm rõ ràng, không làm detection tự động.
3. Queue có cần theo skill/level không? MVP nên FIFO thuần. Tuy nhiên data model có thể chừa sẵn `skillTags` hoặc `serviceCapabilities` để sau này mở rộng mà không phải đập model.

## Thiết Kế Giao Diện Và Trải Nghiệm Demo

Bố cục hiện tại nên giữ tinh thần rất rõ: top bar cho metric tức thời, cột trái cho bốn chair cards, cột phải cho next available queue. Mỗi chair card cần hiển thị đủ bốn thứ: tên tech, trạng thái, countdown lớn nếu đang chạy, và hành động đúng ngữ cảnh.

- Với idle, card cho phép mock start.
- Với running, card chỉ hiển thị countdown và khóa stop.
- Với finished, card cho reset và nhấn mạnh rằng chair chưa ready cho khách tiếp.

Queue panel cần hiển thị người đầu hàng đợi nổi bật, dấu mốc thời gian ready, và các action “I’m Ready” cho mani techs cùng “Assign Next Customer” cho mô phỏng receptionist.

Về accessibility và độ rõ ràng vận hành, không nên dựa vào màu sắc đơn thuần để diễn đạt trạng thái. WCAG nêu rất rõ rằng color không được là phương tiện trực quan duy nhất để conveying information, và text thường cần contrast tối thiểu 4.5:1 để đủ dễ đọc. Vì vậy, ngoài màu xám/xanh/vàng, mỗi card nên có badge chữ như “Idle”, “Running”, “Finished”, cộng thêm icon hoặc viền để người dùng vẫn hiểu được dù ánh sáng salon kém hoặc màn hình nhìn chéo.

Với phần cập nhật động, queue header hoặc dòng “Người tiếp theo” nên dùng vùng `role="status"` với `aria-live="polite"`; còn khi timer hết, system banner hoặc toast nên dùng `role="alert"` vì đây là thông tin thời điểm, cần chú ý ngay.

Vì chủ salon có thể test trên tablet, target size không nên chỉ đủ bấm được. Chuẩn WCAG 2.2 đặt mức tối thiểu 24×24 CSS pixels cho pointer targets, còn MDN khuyến nghị 44×44 CSS pixels cho interactive elements để dễ bấm hơn trên touchscreens. Đồng thời, responsive layout nên dùng breakpoints rõ ràng để trên màn hình vừa và lớn thì hai cột đứng cạnh nhau, còn trên màn hình hẹp hơn thì queue xuống dưới.

Để buổi demo với chủ salon diễn ra mượt, nên thêm một cụm demo affordances nằm ngoài main flow nhưng cực kỳ có ích:

- Demo mode toggle 40s/70s.
- Enable sound.
- Reset all.
- Load sample state.
- Event log nhỏ ở cạnh dưới hoặc drawer.

Event log không cần đẹp, chỉ cần đủ để giải thích: “Chair 2 started 70s”, “Chair 2 finished”, “Lan added to queue”, “Mai marked ready”, “Assigned next customer to Lan”. Khi demo logic với người không đọc code, event log là công cụ thuyết phục mạnh nhất sau countdown.

## Lộ Trình Build, Test Và Bàn Giao

Lộ trình hợp lý cho một demo nhỏ nhưng làm đúng chuẩn là bảy ngày làm việc ngắn, với mỗi ngày có output nhìn thấy được:

1. Ngày đầu: khởi tạo project React/Vite/Tailwind, dựng layout khung, reducer skeleton, fixtures cho 4 chairs và 4 mani techs, cơ chế persist tối thiểu vào `localStorage`.
2. Ngày tiếp theo: dựng chair card hoàn chỉnh, mock start 40/70, countdown hiển thị lớn, state transitions idle -> running -> finished.
3. Ngày sau đó: hoàn thiện timer engine theo `endsAt - Date.now()`, hydration sau refresh, reconcile khi tab quay lại từ background, persist thêm qua `visibilitychange`.
4. Ngày kế: làm queue FIFO, action “I’m Ready”, Assign Next Customer, tie-breaker `seq`, chặn duplicate queue entries, và rule idempotent trong reducer.
5. Ngày tiếp: thêm alert âm thanh, banner “Bật âm thanh”, nhãn trạng thái, badge, responsive touch targets, contrast, live region cho status/alert.
6. Ngày áp chót: test edge cases, làm Reset all, Load sample state, event log, và nếu còn thời gian thì support sync giữa nhiều tab cùng origin bằng `storage` event như một tiện ích same-device only.
7. Ngày cuối: deploy bản static, tạo link share ổn định, dùng preview deployments cho các vòng chỉnh sửa tiếp theo, và viết một trang hướng dẫn nội bộ cho chủ salon test đúng flow.

Checklist test nên được chốt trước khi đưa cho chủ salon gồm ít nhất các ca sau:

- Refresh khi timer còn 17 giây.
- Để tab ẩn rồi quay lại.
- Hai tech ready sát nhau.
- Mani bấm Ready hai lần liên tiếp.
- Timer hết ngay khi vừa refresh.
- Chair finished nhưng chưa reset.
- Assign queue khi queue rỗng.
- Demo chạy ở private mode.
- Reset all giữa lúc có chair đang chạy.

Với danh sách này, chủ salon sẽ không chỉ xem thấy app chạy, mà sẽ test đúng những điểm từng gây đau ở vận hành thực tế.

## Bản Bàn Giao

Bản bàn giao của demo nên gồm bốn thứ:

- Repository hoặc source zip.
- Link chạy thử.
- Một file hướng dẫn sử dụng cực ngắn.
- Một nút xóa cache/state trong app.

Phần hướng dẫn cần ghi rõ rằng bản demo hoạt động tốt nhất khi mở trong trình duyệt thường, trên một thiết bị làm nguồn sự thật; nếu mở ở chế độ riêng tư hoặc đổi giữa nhiều thiết bị khác nhau, state sẽ không có tính chất đồng bộ production.