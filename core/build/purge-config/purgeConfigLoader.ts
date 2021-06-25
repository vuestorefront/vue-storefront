import purgeConfig from './purgeConfig';

/**
 * clear config properties that shouldn't be visible on frontend
 */
export default function loader (source) {
  let config = JSON.parse(source);
  config = purgeConfig(config);

  return JSON.stringify(config);
}
