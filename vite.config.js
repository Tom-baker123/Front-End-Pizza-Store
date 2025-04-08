import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Thêm cấu hình server để tùy chỉnh HMR
  server: {
    hmr: {
      overlay: true, // Giữ overlay để hiển thị lỗi, bạn có thể đặt thành false nếu không muốn thấy overlay
    },
  },
  // Thêm base nếu bạn deploy lên subpath (tùy chọn)
  base: '/', // Thay đổi nếu cần, ví dụ: '/my-app/'
  // Thêm alias để đơn giản hóa đường dẫn import
  resolve: {
    alias: {
      '@api': '/src/api', // Alias để import dễ dàng, ví dụ: import { addToCart } from '@api/GlobalAPI'
      '@components': '/src/components',
      '@pages': '/src/pages',
    },
  },
});