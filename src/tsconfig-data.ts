import TSConfigData from './tsconfig-data.json'

// Type Guard for dynamic access of TSConfigData
function isTSConfigKey<T = typeof TSConfigData> (obj: T, key: keyof any): key is keyof T {
  return key in obj
}

type TSConfigValue = {
  cliFlag?: string | string[],
  type?: string,
  defaultValue?: string,
  description?: string,
  experimental?: boolean,
  extendedDescription?: string,
  refLinks?: { title: string, link: string }[]
}
type TSConfigKeys = keyof typeof TSConfigData
type PartialTSConfigData = {
  [P in TSConfigKeys]?: TSConfigValue
}

export {
  TSConfigData,
  TSConfigKeys,
  TSConfigValue,
  PartialTSConfigData,
  isTSConfigKey
}