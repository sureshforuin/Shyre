import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { customAntdTheme } from './styles/theme';
import { MainLayout } from './layouts/MainLayout';
import { DynamicPage } from './pages/DynamicPage';
import { NavigationContext, useNavigationController } from './hooks/useNavigation';
import rawSiteConfig from './config/site.json';
import { SiteConfig } from './types/site';

const siteConfig = rawSiteConfig as SiteConfig;

export const AppContent: React.FC = () => {
  const navController = useNavigationController();

  return (
    <NavigationContext.Provider value={navController}>
      <Routes>
        <Route element={<MainLayout siteMeta={siteConfig.site} />}>
          {/* Dynamic route generation driven strictly by JSON configuration */}
          {siteConfig.site.navigation.map((navItem) => {
            const pageData = siteConfig.pages[navItem.id];
            return (
              <Route
                key={navItem.id}
                path={navItem.path}
                element={
                  <DynamicPage pageConfig={pageData} pageKey={navItem.id} />
                }
              />
            );
          })}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </NavigationContext.Provider>
  );
};

export const App: React.FC = () => {
  return (
    <ConfigProvider theme={customAntdTheme}>
      <AppContent />
    </ConfigProvider>
  );
};

export default App;
