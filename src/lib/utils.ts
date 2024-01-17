import Constants, { ExecutionEnvironment } from 'expo-constants';

export const isExpo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
