import { HeaderOnly } from '~/components/Layout';
import Home from '~/components/pages/Home';
import Following from '~/components/pages/Following';
import Profile from '~/components/pages/Profile';
import Upload from '~/components/pages/Upload';
import Search from '~/components/pages/Search';

// dùng cho router không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile }, //? :nickname là path có thể thay đổi
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];
// dùng cho router cần đăng nhập vẫn xem được

const privateRoutes = [];

export { publicRoutes, privateRoutes };
