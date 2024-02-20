import jwt, { SignOptions } from "jsonwebtoken";
import { DateTime } from "luxon";
import { ObjectId } from "mongoose";
import { performance, PerformanceObserver } from "perf_hooks";
import { Container } from "typedi";
import { Logger } from "winston";
import config from "../config";
let observer = null;
type TimeTypes = "start" | "end";

export default class CommonService {
  initiatePerformanceLogger() {
    if (!observer) {
      const logger: Logger = Container.get("logger");
      observer = new PerformanceObserver((list, obs) => {
        const lists = list
          .getEntries()
          .forEach((entry) =>
            logger.info(
              `${entry.name} took ${entry.duration.toFixed(2)}ms / ${(entry.duration / 1000).toFixed(2)}s to complete`
            )
          );
        return lists;
      });
      observer.observe({ buffered: true, entryTypes: ["measure"] });
    }
  }

  startPerformanceLogging() {
    performance.mark("start");
  }

  endPerformanceLogging(apiName: string) {
    performance.mark("stop");
    performance.measure(apiName, "start", "stop");
  }

  timeout(ms) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  fromISO = (time: string) => DateTime.fromISO(time);

  dateWithTimeZone = (time: Date, timeZone: string, TimeTypes) => {
    const date = DateTime.fromISO(time.toString(), { zone: timeZone });
    return TimeTypes == "start"
      ? date.startOf("day").toJSDate()
      : date.endOf("day").toJSDate();
  };

  getTimeOfDay(type: TimeTypes) {
    const _dateTime = DateTime.utc();
    switch (type) {
      case "start":
        return _dateTime.startOf("day").toJSDate();
      case "end":
        return _dateTime.endOf("day").toJSDate();
    }
  }

  getDateDiff = (startDate: string, endDate: string) => {
    const date1 = DateTime.fromISO(startDate);
    const date2 = DateTime.fromISO(endDate);

    const diff = date2.diff(date1, "days");

    return diff.toObject();
  };

  getRandomIndex = (length: number) => Math.floor(Math.random() * length);

  getAPIProjectionPipeline = () => ({
    $project: {
      platforms: 1,
      operators: 1,
      brands: 1,
      name: 1,
      description: 1,
      role: 1,
      status: 1,
      endPoint: 1,
      createdAt: 1,
    },
  });

  getAfterPaginationProjectPipelines(
    paginationParams: { skip: number; limit: number },
    currentPageNo: number
  ) {
    return [
      { $unwind: "$total" },
      {
        $project: {
          data: 1,
          totalItems: "$total.createdAt",
          limit: {
            $literal: paginationParams.limit,
          },
          page: {
            $literal: paginationParams.skip / paginationParams.limit + 1,
          },
          totalPages: {
            $ceil: {
              $divide: ["$total.createdAt", paginationParams.limit],
            },
          },
        },
      },

      {
        $addFields: {
          morePages: {
            $cond: [
              {
                $or: [
                  { $eq: ["$totalPages", 0] },
                  { $eq: ["$totalPages", currentPageNo] },
                ],
              },
              false,
              true,
            ],
          },
        },
      },
    ];
  }
}
