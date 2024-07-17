import { RequestHandler } from "express";
import prometheusClient from "prom-client";

const prometheusRegister = new prometheusClient.Registry();
prometheusRegister.setDefaultLabels({
  app: "middleware",
});
prometheusClient.collectDefaultMetrics({ register: prometheusRegister });

/**
 * Express API handler that should be registered on the /metrics route
 * so that Prometheus can periodically call the middleware's /metrics endpoint
 * and scrape the metrics
 * @example `app.get('/metrics', prometheusMetricsHandler)`
 */
const prometheusMetricsHandler: RequestHandler = async (_, res) => {
  res.contentType(prometheusRegister.contentType);
  res.end(await prometheusRegister.metrics());
};

export {
  prometheusClient,
  prometheusRegister,
  prometheusMetricsHandler
}
