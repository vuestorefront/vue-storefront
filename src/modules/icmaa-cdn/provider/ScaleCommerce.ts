import config from 'config'
import { ImageHookProperties, ImageHookReturn } from '../types/HookTypes'

const afterProductThumbnailPathGenerate = ({ path, sizeX, sizeY }: ImageHookProperties): ImageHookReturn => {
  let { baseUrl, quality } = config.icmaa_cdn['scalecommerce']

  baseUrl = baseUrl.replace(/\/*$/, '')
  path = path.replace(/^\/*/, '')

  if (sizeX && sizeY && sizeX > 0 && sizeY > 0) {
    path = `${baseUrl}/${sizeX}x${sizeY}x${quality}/media/${path}`
  } else {
    path = `${baseUrl}/media/${path}`
  }

  return { path }
}

export default afterProductThumbnailPathGenerate
