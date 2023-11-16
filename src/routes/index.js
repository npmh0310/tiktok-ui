import { HeaderOnly } from '~/components/Layout';
import Home from '~/components/pages/Home';
import Following from '~/components/pages/Following';
import Profile from '~/components/pages/Profile';
import Upload from '~/components/pages/Upload';
import Search from '~/components/pages/Search';
import routesConfig from '~/config/routes';

// dùng cho router không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile }, //? :nickname là path có thể thay đổi
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];
// dùng cho router cần đăng nhập vẫn xem được

const privateRoutes = [];

export { publicRoutes, privateRoutes };
