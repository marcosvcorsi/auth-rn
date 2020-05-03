import React from 'react';
import AuthRoutes from './auth.routes';

import {useAuth} from '../contexts/auth';

import AppRoutes from './app.routes';
import {View, ActivityIndicator} from 'react-native';

const Routes: React.FC = () => {
  const {signed, loading} = useAuth();
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
