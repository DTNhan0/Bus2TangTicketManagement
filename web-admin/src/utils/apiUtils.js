/**
 * Trích xuất status & message từ:
 *  • response thành công (axios response)
 *  • error (axios error)
 *  • fallback khi không có dữ liệu
 */
export function extractStatusMessage(obj) {
  // response OK
  if (obj?.data?.status) {
    const { status, message } = obj.data;
    return { status, message };
  }
  // error response
  if (obj?.response?.data?.status) {
    const { status, message } = obj.response.data;
    return { status, message };
  }
  return { status: 'FAILED', message: 'Lỗi không xác định' };
}
