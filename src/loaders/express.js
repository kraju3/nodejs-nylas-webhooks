import express from "express";
import routes from "./../api/routes/index.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(helmet());

  app.use("/api", routes);

  app.get("/", (_req, res) => {
    res.status(200);
  });

  // app.use((_req, _res, next) => {
  //   const error = new Error("Endpoint could not find!");
  //   error.status = 404;
  //   re
  // });

  // app.use((error, req, res, _next) => {
  //   res.status(error.status || 500);
  //   let resultCode = "00015";
  //   let level = "External Error";
  //   if (error.status === 500) {
  //     resultCode = "00013";
  //     level = "Server Error";
  //   } else if (error.status === 404) {
  //     resultCode = "00014";
  //     level = "Client Error";
  //   }
  //   logger(resultCode, req?.user?._id ?? "", error.message, level, req);
  //   return res.send({
  //     resultMessage: {
  //       en: error.message,
  //       tr: error.message,
  //     },
  //     resultCode: resultCode,
  //   });
  // });
};
