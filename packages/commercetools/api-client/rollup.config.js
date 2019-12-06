import pkg from './package.json'
import { generateBaseConfig } from '../rollup.base.config'
import graphql from 'rollup-plugin-graphql'

const baseConfig = generateBaseConfig(pkg)
baseConfig.plugins.push(
  graphql()
)

export default baseConfig
