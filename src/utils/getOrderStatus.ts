export const getStatusText = (status: string) => {
  switch (status) {
    case 'unpaid':
      return 'Chờ khách hàng thanh toán'
    case 'pending':
      return 'Xác nhận đơn'
    case 'confirmed':
      return 'Đã xác nhận'
    case 'processing':
      return 'Xử lý đơn'
    case 'shipped':
      return 'Đã gửi hàng'
    case 'delivered':
      return 'Đang giao hàng'
    case 'received':
      return 'Khách hàng đã nhận'
    case 'cancelled':
      return 'Khách hàng đã hủy'
    default:
      return ''
  }
}
