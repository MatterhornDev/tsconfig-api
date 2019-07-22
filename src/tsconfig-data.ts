import TSConfigData from './tsconfig-data.json'

// Type Guard for dynamic access of TSConfigData
function isTSConfigKey<T = typeof TSConfigData> (obj: T, key: keyof any): key is keyof T {
  return key in obj
}

export {
  TSConfigData,
  isTSConfigKey
}